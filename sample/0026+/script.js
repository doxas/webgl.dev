
import {CanvasUtility} from './CanvasUtility.js';
import {MathUtility} from './MathUtility.js';
import {EasingUtility} from './EasingUtility.js';
import {RandomUtility} from './RandomUtility.js';

window.addEventListener('DOMContentLoaded', () => {
    // Canvas の幅と高さは定数化しておく
    const WIDTH = 512;
    const HEIGHT = 512;
    // 繰り返す回数
    const COUNT = 10000;

    // ラッパー DOM の参照を取得
    const wrapper = document.querySelector('#wrapper');

    // CanvasUtility クラスのインスタンスを生成する
    const canvasUtil = new CanvasUtility({
        appendTo: wrapper,
        width: WIDTH,
        height: HEIGHT,
    });

    // ボタンへの参照を取得
    const defaultButton = document.querySelector('#default');
    const timestampButton = document.querySelector('#timestamp');
    // ボタンにクリック時のイベントを設定する
    defaultButton.addEventListener('click', defaultSeedRandom, false);
    timestampButton.addEventListener('click', timestampSeedRandom, false);

    // デフォルトのシード値で Xorshift を実行する
    function defaultSeedRandom(){
        // Xorshift で乱数を生成する
        const xor = new RandomUtility.Xorshift();
        drawPoint(xor, 'default seed');
    }

    // タイムスタンプをシード値に設定し Xorshift を実行する
    function timestampSeedRandom(){
        // Xorshift で乱数を生成する
        const xor = new RandomUtility.Xorshift(Date.now());
        drawPoint(xor, 'timestamp seed');
    }

    /**
     * 引数に Xorshift クラスのインスタンスを受け取り点を描画する
     * @param {RandomUtility.Xorshift} xor - Xorshift クラスのインスタンス
     * @param {string} mode - ログとして表示するためのモードを意味する文字列
     */
    function drawPoint(xor, mode){
        // クリアするメソッドを呼ぶ
        canvasUtil.clear();
        // 速度を計測するため開始時のタイムスタンプを取得しておく
        const time = Date.now();
        // COUNT 回数分繰り返し、１ループあたり２回生成した乱数をプロットする
        for(let i = 0; i < COUNT; ++i){
            const x = xor.random(true);
            const y = xor.random(true);
            canvasUtil.fillCircle(x * WIDTH, y * HEIGHT, 1, 'silver');
        }
        // ログの出力
        canvasUtil.fillText(`mode: ${mode}`, 10, 20, 'red');
        canvasUtil.fillText(`points: ${COUNT}`, 10, 40, 'red');
        canvasUtil.fillText(`time: ${(Date.now() - time) / 1000}`, 10, 60, 'red');
    }
}, false);

