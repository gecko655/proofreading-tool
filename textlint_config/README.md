# 設定ファイルについて

このフォルダに入っているymlファイルで、文書校正(textlint)の設定をすることができます。

## 各ファイルについて
### prh.yml
使ってはいけない単語、検出したい誤表記を設定するファイル
詳細は https://github.com/prh/prh/blob/master/misc/prh.yml を参照

### textlintrc.yml
textlint全体の設定をするファイル。textlint起動時最初に読み込まれる。
詳細は https://github.com/textlint/textlint/blob/master/docs/configuring.md を参照


### textlint-rule-preset-icsmedia
https://github.com/ics-creative/textlint-rule-preset-icsmedia のtextlintルールをコピーしてきたもの。
基本的に触らなくて良い。


### 追加
prh.xlsm を追加。
Excelファイルを使って prh.ymlの簡単な編集ができるようになっています。
現時点では、単語表記の禁則にのみ対応しています。
（expected、pattern/patterns のみ）

#### prh.yml の読み込み
Excelファイルを開き、**yaml読み込み** ボタンを押してください。
「はい」をクリックすると、同じフォルダ内にある 「prh.yml」 の内容を読み取り、Excelファイルを上書きします。

#### Excelファイルの編集
A列に推奨される表記を、B列に禁止される表記を記入していきます。
正規表現を使用して表記の検出をしたい場合はC列に「〇」などの文字を入れてください。

#### prh.yml の上書き
Excelファイルにある  **yaml書き込み** ボタンを押してください。
「はい」をクリックすると、同じフォルダ内にある 「prh.yml」を上書きして保存します。
もし同じフォルダ内に「prh.yml」が無かった場合は、Excelの内容で新規作成されます。