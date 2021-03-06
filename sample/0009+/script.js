
import {CanvasUtility} from './CanvasUtility.js';

window.addEventListener('DOMContentLoaded', () => {
    // ラッパー DOM の参照を取得
    const wrapper = document.querySelector('#wrapper');

    // CanvasUtility クラスのインスタンスを生成する
    const canvasUtil = new CanvasUtility({
        appendTo: wrapper,
        width: 512,
        height: 512,
    });

    // クリアするメソッドを呼ぶ
    canvasUtil.clear();

    // 矩形を塗りつぶしモードで描画する
    canvasUtil.fillRect(25, 50, 100, 200, 'red');

    // 矩形を枠線モードで描画する
    canvasUtil.strokeRect(50, 25, 200, 100, 'green');
}, false);

