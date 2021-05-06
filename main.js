const { app, ipcMain, BrowserWindow, shell } = require('electron');
const { TextLintEngine } = require('textlint');
const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const textract = require('textract');
const { execFilePath, resourceFilePath } = require('./lib/binaries');

const configDirPath = resourceFilePath('textlint_config');
const engine = new TextLintEngine({
  formatterName: 'json',
  configFile: [path.join(configDirPath, 'textlintrc.yml')],
});

async function parseFile(filePath) {
  if (filePath.endsWith('.pdf')) {
    // 外部コマンド `pdftotext` を実行してpdfをparseする
    return util
      .promisify(exec)(
        `${execFilePath('pdftotext')} -raw -enc UTF-8 "${filePath}" -`,
      )
      .then((parserOutput) => parserOutput.stdout);
  }
  // textractライブラリでファイルをparseする
  return util
    .promisify(textract.fromFileWithPath)(filePath, {
      preserveLineBreaks: true,
    })
    .then((text) => text);
}

function textPreprocess(text) {
  return (
    text
      // 半角カナをNFD -> NFC変換する
      .normalize()
      // \u2028(Unicodeの'LINE SEPARATOR')があるとtextlintの行数がズレる。消す
      .replaceAll('\u2028', '')
      // BEL
      .replaceAll('\u0007', '')
      // Form Feed
      .replaceAll('\u000c', '')
      // Ideographic Space
      .replaceAll('\u3000', '')
  );
}

async function textlintExec(text) {
  return engine
    .executeOnText(text)
    .then((results) => engine.formatResults(results))
    .then(JSON.parse);
}

function formatTextlintOutput(text, textlintOutput, filePath) {
  // textlintOutputの例↓
  // [{"messages":[{"type":"lint","ruleId":"ja-no-successive-word","message":"\"を\" が連続して2回使われています。","index":5,"line":1,"column":6,"severity":2}],"filePath":"<text>"}]
  const violations = textlintOutput
    .flatMap((out) => out.messages)
    .map((d) => ({
      Message: `${d.message} (${d.ruleId})`,
      ViolatedIndices: [{ Start: d.column - 1, Length: 1 }], // textlintはLengthを返してくれないので、1とする
      ViolatedSection: text.split('\n')[d.line - 1],
    }));

  return {
    ok: violations.length === 0,
    fileName: path.basename(filePath),
    results: [
      {
        RuleName: 'TextLint',
        Description: '日本語校正',
        Violations: violations,
      },
    ],
  };
}

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.handle('proofread', async (_event, filePath) => {
  return parseFile(filePath)
    .then((text) => textPreprocess(text))
    .then((text) =>
      textlintExec(text).then((textlintOutput) =>
        formatTextlintOutput(text, textlintOutput, filePath),
      ),
    )
    .catch((e) => {
      return { errorMsg: e };
    });
});

ipcMain.on('openTextlintConfig', () => {
  shell.openPath(configDirPath);
});
