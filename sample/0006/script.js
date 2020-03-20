
// 変数を宣言無しで記述
globalVariable = null;

// 変数を var 宣言で定義
var variable = null;

// 変数を let 宣言で定義
let letVariable = null;

// 変数を const 宣言で定義
const constVariable = null;

// ----------------------------------------------------------------------------

// 宣言無し変数はグローバルなスコープを持つ
console.log(globalVariable === window.globalVariable); // → true

// var や let で宣言した変数は再代入ができる
variable = '再代入';
letVariable = '再代入';

// const で宣言した変数には再代入はできない
// constVariable = '再代入'; // → エラーになる

// ----------------------------------------------------------------------------

let booleanVariable   = true;             // 真偽値
let numberVariable    = 0;                // 数値
let stringVariable    = '文字列';         // 文字列
let undefinedVariable = undefined;        // 未定義
let nullVariable      = null;             // 値が存在しない
let arrayVariable     = [];               // 配列
let objectVariable    = {};               // オブジェクト
let functionVariable  = function(){};     // 関数
let symbolVariable    = Symbol('symbol'); // シンボル

console.log(typeof booleanVariable);   // → boolean
console.log(typeof numberVariable);    // → number
console.log(typeof stringVariable);    // → string
console.log(typeof undefinedVariable); // → undefined
console.log(typeof nullVariable);      // → object
console.log(typeof arrayVariable);     // → object
console.log(typeof objectVariable);    // → object
console.log(typeof functionVariable);  // → function
console.log(typeof symbolVariable);    // → symbol

