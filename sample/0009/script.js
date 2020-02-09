
let counter = 0;

// 条件分岐（if 文）
if(counter < 10){
    console.log('カウンターの値は 10 よりも小さい');
}

// 条件分岐（if ~ else）
if(counter < 10){
    console.log('カウンターの値は 10 よりも小さい');
}else{
    console.log('カウンターの値は 10 以上');
}

// 条件分岐（if ~ else if）
if(counter < 10){
    console.log('カウンターの値は 10 よりも小さい');
}else if(counter < 20){
    console.log('カウンターの値は 10 以上、ただし 20 よりも小さい');
}else{
    console.log('カウンターの値は 20 以上');
}

// ----------------------------------------------------------------------------

// 条件分岐（switch 文）
switch(counter){
    case 10:
        console.log('カウンターの値は 10');
        break;
    case 20:
        console.log('カウンターの値は 20');
        break;
    default:
        console.log('カウンターの値は 10 でも 20 でもない');
}

