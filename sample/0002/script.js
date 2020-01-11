
// JavaScript での関数の定義
function loaded(){
    // var による変数宣言
    var variable = 'var 宣言';

    // let による変数宣言（ES2015）
    let letVariable = 'let 宣言';

    // const による変数宣言（ES2015）
    const constant = 'const 宣言';

    // 無名関数を変数に代入する例
    let func = function(){
        console.log('これは無名関数からの出力です');
    };
    // 変数に代入した関数を実行する例
    func();

    // 即時関数の定義と実行
    (function(){
        console.log('これは即時関数からの出力です');
    })();

    // テンプレートリテラル（ES2015）
    let string = 'インライン展開';
    let template = `template literal 内では変数を${string}できます`;
}

// ウェブページのコンテンツがロード完了した時点で自動的に関数を実行
window.addEventListener('DOMContentLoaded', loaded, false);

