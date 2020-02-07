
// 同階層にある CanvasUtility.js をインポートする
import {CanvasUtility} from './CanvasUtility.js';

// DOM のロードが完了した際の処理を登録
window.addEventListener('DOMContentLoaded', () => {
    // ラッパー DOM の参照を取得
    const wrapper = document.querySelector('#wrapper');

    // CanvasUtility クラスのインスタンスを生成する
    const canvasUtil = new CanvasUtility({
        appendTo: wrapper, // アペンドする DOM
        width: 512,        // 幅
        height: 512,       // 高さ
    });

    // クリアするメソッドを呼ぶ
    canvasUtil.clear();
}, false);

