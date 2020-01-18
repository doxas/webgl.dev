
const path = require('path');
const fs = require('fs');

// path モジュールの resolve を使ってパスを整形する
const scriptPath = path.resolve(__dirname, './index.html');

// fs モジュールの promises 以下には、Promise を返すメソッドが定義されている
// 以下の例では、ファイルを utf8 の文字コードで読み込みしている
fs.promises.readFile(scriptPath, {encoding: 'utf8'})
.then((file) => {
    // 読み込んだファイルの内容を出力
    console.log(file);
})
.catch((err) => {
    // エラーが発生した場合
    console.log(err);
});

