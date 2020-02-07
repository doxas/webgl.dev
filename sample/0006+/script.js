
// import 文で外部ファイルを読み込む
import {Clock} from './clock.js';

window.addEventListener('DOMContentLoaded', () => {
    const clock = new Clock();
    const intervalTime = 1000;

    // Clock.timer は Promise を返してくる
    clock.timer(intervalTime)
    .then((response) => {
        // then メソッドで resolve した場合の結果を受け取る
        const msg = `${response}ミリ秒が経過！`;
        console.log(msg);
        document.querySelector('#out').textContent = msg;
    })
    .catch((err) => {
        // catch で reject した場合の結果を受け取る
        console.warn(err);
    });
}, false);

