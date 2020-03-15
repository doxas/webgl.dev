
// 関数を定義する
function FUNC(){
    console.log('関数 FUNC が呼び出されました');
}

// 関数を呼び出す
FUNC();

// ----------------------------------------------------------------------------

// 引数のある関数の定義
function FUNC_WITH_ARGUMENT(arg){
    console.log(arg);
}

// 引数を指定して関数を呼び出す
FUNC_WITH_ARGUMENT('これは引数です');

// ----------------------------------------------------------------------------

// 戻り値のある関数の定義
function FUNC_WITH_RETURN(){
    return 'これは戻り値です';
}

// 関数の戻り値を取得してコンソールへそのまま出力
console.log(FUNC_WITH_RETURN());

