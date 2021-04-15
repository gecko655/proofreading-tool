proofreading-tool
===

GUIで動作する文書校正ツール

# ビルド方法

## 開発環境構築
```bash
# 依存関係の取得
npm install
# webpackのビルド
npm run webpack # or `npm run webpack-prod` or `npm run webpack-watch`
```

## デバッグ実行
```bash
npm start
```

## テスト
```bash
npm run lint # or `npm run lint-fix` (prettierの機能でlint修正が自動適用される)
```

## アプリのビルド
```bash
npm run dist # or `npm run dist-win`
```
ビルドされたファイルは `dist/` フォルダ下に吐かれるはず。

# ライセンスについて
[LICENSE](LICENSE)  
このツールではGPLv3 licenseである[xpdf(pdftotext)](https://www.xpdfreader.com/)を利用している。

# special thanks
https://github.com/mixigroup
