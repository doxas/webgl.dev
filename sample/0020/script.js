
import {CanvasUtility} from './CanvasUtility.js';

window.addEventListener('DOMContentLoaded', () => {
    // Canvas の幅と高さは定数化しておく
    const WIDTH = 512;
    const HEIGHT = 512;
    // グリッドの細かさは定数化しておく
    const GRID_COUNT = 10;

    // ラッパー DOM の参照を取得
    const wrapper = document.querySelector('#wrapper');

    // CanvasUtility クラスのインスタンスを生成する
    const canvasUtil = new CanvasUtility({
        appendTo: wrapper,
        width: WIDTH,
        height: HEIGHT,
    });

    // Shift キー押下で角度を固定できるようにするための処理
    let latestAngle = 0;

    // Canvas 上でマウスカーソルが動いた際に描画を行う
    canvasUtil.canvas.addEventListener('mousemove', mouseMove, false);

    // 見た目のわかりやすさのためにラインの太さを２倍にしておく
    canvasUtil.lineWidth = 2;

    // 初期状態としてグリッドを描画しておく
    drawGrid();

    function mouseMove(evt){
        // クリアするメソッドを呼ぶ
        canvasUtil.clear();
        // マウスカーソルの Canvas 上での位置を計算するために……
        // Canvas のスクリーン上での位置の情報を取得
        const bound = canvasUtil.canvas.getBoundingClientRect();
        // 座標は MouseEvent.clientX から Canvas の横位置を引いて求める
        const x = evt.clientX - bound.x;
        const y = evt.clientY - bound.y;

        // グリッドの再描画を行う
        drawGrid();
        // ベクトルを表すラインを描画する
        drawLine(x, y);
    }

    /**
     * グリッドを描画する
     */
    function drawGrid(){
        // Canvas の中心を求めるため、幅と高さの半分の値を求める
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        // 薄いグリッドをループ処理で一気に描画する
        const gridWidth = (WIDTH / 2) / GRID_COUNT;
        const gridHeight = (HEIGHT / 2) / GRID_COUNT;
        for(let i = 0; i < GRID_COUNT; ++i){
            const intervalX = gridWidth * (i + 1);
            const intervalY = gridHeight * (i + 1);
            canvasUtil.strokeLine(centerX + intervalX, 0, centerX + intervalX, HEIGHT, 'silver');
            canvasUtil.strokeLine(centerX - intervalX, 0, centerX - intervalX, HEIGHT, 'silver');
            canvasUtil.strokeLine(0, centerY + intervalY, WIDTH, centerY + intervalY, 'silver');
            canvasUtil.strokeLine(0, centerY - intervalY, WIDTH, centerY - intervalY, 'silver');
        }
        // 十字ラインをグレーで描画する
        canvasUtil.strokeLine(0, centerY, WIDTH, centerY, 'gray');
        canvasUtil.strokeLine(centerX, 0, centerX, HEIGHT, 'gray');
    }

    /**
     * ベクトルを表す原点から伸びるラインを描画する
     * @param {number} x - ベクトルの終点の X 座標
     * @param {number} y - ベクトルの終点の Y 座標
     */
    function drawLine(x, y){
        // Canvas の中心を求めるため、幅と高さの半分の値を求める
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        // XY 方向の移動量を描画する
        canvasUtil.alpha = 0.5;
        canvasUtil.lineWidth = 6;
        canvasUtil.strokeLine(centerX, centerY, x, centerY, 'deeppink');
        canvasUtil.strokeLine(x, centerY, x, y, '#ccc');
        canvasUtil.strokeLine(centerX, centerY, centerX, y, 'deepskyblue');
        canvasUtil.strokeLine(centerX, y, x, y, '#ccc');

        // 原点から指定された終点まで赤いラインでベクトルを描画する
        canvasUtil.alpha = 1.0;
        canvasUtil.lineWidth = 2;
        canvasUtil.strokeLine(centerX, centerY, x, y, 'red');

        // Canvas 上にログを出力しておく
        const unit = 1.0 / GRID_COUNT * 2;        // グリッドの幅
        const logX = (x - centerX) / centerX * 2; // グリッド幅に応じた X の値
        const logY = (y - centerY) / centerY * 2; // グリッド幅に応じた Y の値
        // ベクトルの長さを計算する
        const length = Math.sqrt(logX * logX + logY * logY);
        canvasUtil.fillText(`グリッドの幅: ${unit}`, 10, 20);
        canvasUtil.fillText(`X: ${logX}`, 10, 40, 'deeppink');
        canvasUtil.fillText(`Y: ${-logY}`, 10, 60, 'deepskyblue');
        canvasUtil.fillText(`ベクトルの長さ: ${length}`, 10, 80, 'red');
    }

}, false);

