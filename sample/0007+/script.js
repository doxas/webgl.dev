
import {Clock} from './clock.js';

window.addEventListener('DOMContentLoaded', () => {
    const clock = new Clock();
    const intervalTime = 1000;
    const out = document.querySelector('#out');

    clock.timer(intervalTime)
    .then((response) => {
        const msg = `${response}ミリ秒が経過！`;
        console.log(msg);
        out.textContent = msg;
    })
    .catch((err) => {
        console.warn(err);
    });

    // キー押下に対するリスナーを設定する例
    window.addEventListener('keydown', (evt) => {
        // ここでの引数は KeyboardEvent オブジェクト
        out.textContent = evt.key;
    }, false);
    // マウス移動（またはタッチ操作）に対するリスナーを設定する例
    out.addEventListener('pointermove', (evt) => {
        // ここでの引数は PointerEvent オブジェクト
        out.textContent = `x: ${evt.clientX}, y: ${evt.clientY}`;
    }, false);
}, false);

