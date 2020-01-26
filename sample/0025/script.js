
import {CanvasUtility} from './CanvasUtility.js';
import {MathUtility} from './MathUtility.js';
import {EasingUtility} from './EasingUtility.js';

window.addEventListener('DOMContentLoaded', () => {
    // Canvas の幅と高さは定数化しておく
    const WIDTH = 512;
    const HEIGHT = 512;

    // ラッパー DOM の参照を取得
    const wrapper = document.querySelector('#wrapper');

    // ドロップダウンリストへの参照を取得
    const select = document.querySelector('#list');

    // CanvasUtility クラスのインスタンスを生成する
    const canvasUtil = new CanvasUtility({
        appendTo: wrapper,
        width: WIDTH,
        height: HEIGHT,
    });

    // 各種変数の宣言
    let mode = select.value;    // 現在のモード
    let now = 0.0;              // 経過時間
    let beginTime = Date.now(); // 経過時間計測用に現在時のタイムスタンプを入れておく
    let positive = true;        // 時間が増えるのか、減るのかを意味するフラグ

    // Canvas 上でクリック操作があった際に、フラグを反転させる
    canvasUtil.canvas.addEventListener('click', () => {
        // 時間の経過をリセット
        beginTime = Date.now();
        // １秒未満でフラグが反転した場合のことを考慮
        const diff = 1.0 - Math.min(now, 1.0);
        beginTime -= diff * 1000;
        // フラグを反転させる
        positive = !positive;
    }, false);

    // ドロップダウンリストの変更時
    select.addEventListener('change', () => {
        mode = select.value;
    }, false);

    // 描画を開始する
    render();

    function render(){
        // 恒常ループ（レンダリングループ）を仕込んでおく
        requestAnimationFrame(render);

        // 時間の計算
        now = (Date.now() - beginTime) / 1000;
        let time = 0.0;
        if(positive === true){
            time = Math.min(now, 1.0);
        }else{
            time = 1.0 - Math.min(now, 1.0);
        }

        // クリアするメソッドを呼ぶ
        canvasUtil.clear();
        // サークルを描画する
        drawCircle(time);
    }

    /**
     * サークルの描画
     * @param {number} time - 0.0 ～ 1.0 の範囲で表した係数
     */
    function drawCircle(time){
        // モードに応じて適切にイージング関数を呼ぶ
        const t = EasingUtility[mode](time);
        // イージング関数の戻り値に応じた位置に赤いサークルを描画する
        canvasUtil.fillCircle(WIDTH / 2, HEIGHT - HEIGHT * t, 10, 'red');
        // 比較のために右端にリニア（線形）な移動もグレーで描画しておく
        canvasUtil.fillCircle(WIDTH - 20, HEIGHT - HEIGHT * time, 10, 'gray');

        // ログの出力
        canvasUtil.fillText(`mode: ${mode}`, 10, 20);
        canvasUtil.fillText(`ease: ${t.toFixed(3)}`, 10, 40, 'red');
        canvasUtil.fillText(`time: ${time.toFixed(3)}`, 10, 60, 'gray');
    }

}, false);

