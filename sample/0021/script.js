
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

        // グリッドの幅に合わせた単位に変換する
        const unit = 1.0 / GRID_COUNT * 2;         // グリッドの幅
        const gridX = (x - centerX) / centerX * 2; // グリッド幅に応じた X の値
        const gridY = (y - centerY) / centerY * 2; // グリッド幅に応じた Y の値
        // ベクトルの長さを計算する
        const length = Math.sqrt(gridX * gridX + gridY * gridY);

        // わかりやすさのために線を太くする
        canvasUtil.lineWidth = 6;

        // X 軸に水平なベクトルをピンクのラインで描画する
        canvasUtil.strokeLine(centerX, centerY, centerX + centerX / 2, centerY, 'deeppink');
        // マウスカーソル位置へのベクトルを単位化してから青のラインで描画する
        const nx = gridX / length; // X を単位化
        const ny = gridY / length; // Y を単位化
        const cx = centerX + nx * centerX / 2; // グリッドに合わせた量に変換
        const cy = centerY + ny * centerY / 2; // グリッドに合わせた量に変換
        canvasUtil.strokeLine(centerX, centerY, cx, cy, 'deepskyblue');

        // 青のベクトルは以下のように X 軸に水平
        // ※ X が 1.0 で Y が 0.0 なので単位ベクトル
        const blueX = 1.0;
        const blueY = 0.0;

        // ピンクと青のベクトルの内積を求める
        const dotProduct = nx * blueX + ny * blueY;
        // 内積の結果をオレンジの棒グラフで描画
        const dHorizontal = centerX + dotProduct * (WIDTH / 4);
        const dVertical = HEIGHT - 100;
        canvasUtil.strokeLine(centerX, dVertical, dHorizontal, dVertical, 'darkorange');

        // ピンクと青のベクトルの外積を求める
        const crossProduct = nx * blueY - ny * blueX;
        // 外積の結果を緑の棒グラフで描画
        const cHorizontal = 100;
        const cVertical = centerY - crossProduct * (HEIGHT / 4);
        canvasUtil.strokeLine(cHorizontal, centerY, cHorizontal, cVertical, 'green');

        // 線の太さを元に戻す
        canvasUtil.lineWidth = 2;

        // ログの出力
        canvasUtil.fillText(`グリッドの幅: ${unit}`, 10, 20);
        canvasUtil.fillText(`２つの単位ベクトル同士の内積と外積は……`, 10, 40);
        canvasUtil.fillText(`dot: ${dotProduct}`, 10, 70, 'darkorange');
        canvasUtil.fillText(`cross: ${crossProduct}`, 10, 100, 'green');
    }

}, false);

