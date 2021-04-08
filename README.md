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
このツールで使用している[xpdf(pdftotext)](https://www.xpdfreader.com/)がGPLv2 or v3 licenseのため、このツールを外部に再配布する際はGPLv2 or v3 licenseで配布する必要がある。
社内共有のみの場合は気にする必要はない。
