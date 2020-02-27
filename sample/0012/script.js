
try{
    // 存在しないメソッドを呼び出そうとすると……
    Array.noneDifinition();
}catch(error){
    console.log('😱', error);
}

// ----------------------------------------------------------------------------

try{
    // 存在しないメソッドを呼び出そうとすると……
    Array.noneDifinition();
}catch(error){
    console.log('😭', error);
}finally{
    // エラーが起きても起きなくても実行する処理
    console.log('finally ブロックが実行されました');
}

// ----------------------------------------------------------------------------

// Error オブジェクトのインスタンスを作成して例外をスローする
try{
    throw new Error('something error!');
}catch(error){
    console.log('😇', error);
}

