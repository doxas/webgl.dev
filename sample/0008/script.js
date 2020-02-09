
// リテラルを利用した配列の生成
const arr = [];

// Array オブジェクトのインスタンスを生成
const Arr = new Array();

// Array オブジェクトの（インスタンスが）持つプロパティ
console.log(arr.length); // → 0

// Array オブジェクトの（インスタンスが）持つメソッド
arr.push('first', 'second');
console.log(arr); // → ['first', 'second']

// Array オブジェクト自体が持つ static（静的）なメソッド
console.log(Array.isArray(arr)); // → true

