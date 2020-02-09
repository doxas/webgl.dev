
// 繰り返し（for 文）
const year = 10;
for(let age = 0; age < year; ++age){
    console.log(`そして ${age} 年が経過した……`);
}

// ----------------------------------------------------------------------------

// for-in
const fruits = {
    apple: '🍎 りんご',
    orange: '🍊 オレンジ',
    peach: '🍑 もも',
};
for(let f in fruits){
    console.log(f);
}

// ----------------------------------------------------------------------------

// for-of
const foods = [
    '🍜',
    '🍛',
    '🍔',
];
for(let f of foods){
    console.log(f);
}

// ----------------------------------------------------------------------------

// 繰り返し（while 文）
let ticket = 10;
while(ticket > 0){
    const lotto = ticket % 4;
    if(lotto === 0){
        console.log('当たり！');
    }else{
        console.log('ハズレ！');
    }
    --ticket;
}
console.log('チケットがなくなりました！');

// ----------------------------------------------------------------------------

try{
    // 存在しないメソッドを呼び出そうとすると……
    Array.noneDifinition();
}catch(error){
    console.log('😱', error);
}

