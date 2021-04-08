// https://ganeshrvel.medium.com/bundle-a-precompiled-binary-or-native-file-into-an-electron-app-beacc44322a9

const path = require('path');
const { rootPath } = require('electron-root-path');
const { isPackaged } = require('electron-is-packaged');
const { platform } = require('os');

const getPlatform = () => {
  switch (platform()) {
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'android':
      return 'linux';
    case 'darwin':
    case 'sunos':
      return 'mac';
    case 'win32':
      return 'win';
    default:
      throw Error('invalid platform');
  }
};

const resourcesPath = (() => {
  if (!isPackaged) {
    return rootPath;
  }
  if (getPlatform() === 'mac') {
    return path.join(rootPath, './Contents', './Resources');
  }
  return path.join(rootPath, './Resources'); // https://www.electron.build/configuration/contents#extraresources
})();

exports.resourceFilePath = (contentFilePath) =>
  path.resolve(path.join(resourcesPath, contentFilePath));

const binariesPath = isPackaged
  ? path.join(resourcesPath, './bin')
  : path.join(resourcesPath, './build', getPlatform(), './bin');

exports.execFilePath = (execFile) => {
  const execFileName = getPlatform() === 'win' ? `${execFile}.exe` : execFile;
  return path.resolve(path.join(binariesPath, execFileName));
};
