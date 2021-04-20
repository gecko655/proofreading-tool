proofreading-tool
===

[![CircleCI](https://circleci.com/gh/gecko655/proofreading-tool.svg?style=shield)](https://circleci.com/gh/geckot655/proofreading-tool)


GUIで動作する文書校正ツール
GUI tool for textlinting.

# Install
https://github.com/gecko655/proofreading-tool/releases

# How to build

## Prepare
```bash
# Fetch dependencies
npm install
# Build webpack
npm run webpack # or `npm run webpack-prod` or `npm run webpack-watch`
```

## Debug
```bash
npm start
```

## Test
```bash
npm run lint # or `npm run lint:fix` (prettier fixes the code format)
```

## Build for production
```bash
npm run webpack-prod
npm run dist:mac # or `npm run dist:win`
```
The build artifacts should be located under the `dist/` folder.

## Release
```bash
export GITHUB_TOKEN=xxxxxxxxx
git tag vX.Y.Z
npm run webpack-prod
npm run publish:all
```

# LICENSE
This software is released under [GPLv3 LICENSE](LICENSE).

This software uses [xpdf(pdftotext)](https://www.xpdfreader.com/), which is released under GPLv3 license.

# special thanks
https://github.com/mixigroup
