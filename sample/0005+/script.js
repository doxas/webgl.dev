
// import 文で外部ファイルを読み込む
import {Clock} from './clock.js';

window.addEventListener('DOMContentLoaded', () => {
    const clock = new Clock();
    const intervalTime = 1000;

    clock.timer(intervalTime, () => {
        const msg = `${intervalTime}ミリ秒が経過！`;
        console.log(msg);
        document.querySelector('#out').textContent = msg;
    });
}, false);

