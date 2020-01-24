
import {CanvasUtility} from './CanvasUtility.js';
import {MathUtility} from './MathUtility.js';

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

    const temp0 = new MathUtility.Mat2(0, 1, 2, 3);
    const temp1 = new MathUtility.Mat2(4, 5, 6, 7);
    const temp2 = new MathUtility.Vec2(8, 9);
    console.log(temp0.multiplyByVec2(temp2));
    console.log(temp0.multiplyByMat2(temp1));
    console.log(temp0.multiplyToMat2(temp1));
    temp0.rotate(Math.PI);
    console.log(temp0.multiplyToMat2(temp1));

    // Shift キー押下で角度を固定できるようにするための処理
    let latestAngle = 0;

    // Canvas 上でマウスカーソルが動いた際（もしくはタッチ操作時）に描画を行う
    canvasUtil.canvas.addEventListener('pointermove', pointerMove, false);

    // 見た目のわかりやすさのためにラインの太さを２倍にしておく
    canvasUtil.lineWidth = 2;

    // 初期状態としてグリッドを描画しておく
    drawGrid();

    function pointerMove(evt){
        // クリアするメソッドを呼ぶ
        canvasUtil.clear();
        // マウスカーソルの Canvas 上での位置を計算するために……
        // Canvas のスクリーン上での位置の情報を取得
        const bound = canvasUtil.canvas.getBoundingClientRect();
        // 座標は PointerEvent.clientX から Canvas の横位置を引いて求める
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

        // わかりやすさのために線を太くする
        canvasUtil.lineWidth = 6;

        // X 軸に水平なベクトルをピンクのラインで描画する
        canvasUtil.strokeLine(centerX, centerY, centerX + centerX / 2, centerY, 'deeppink');

        // グリッドの幅に合わせた単位に変換する
        const unit = 1.0 / GRID_COUNT * 2;         // グリッドの幅
        const gridX = (x - centerX) / centerX * 2; // グリッド幅に応じた X の値
        const gridY = (y - centerY) / centerY * 2; // グリッド幅に応じた Y の値

        // Vec2 オブジェクトのインスタンスを生成する
        const vector = new MathUtility.Vec2(gridX, gridY);
        // Vec2 オブジェクトのメソッドを利用して単位化する
        vector.normalize();
        // ベクトルを青のラインで描画する
        const cx = centerX + vector.x * centerX / 2; // グリッドに合わせた量に変換
        const cy = centerY + vector.y * centerY / 2; // グリッドに合わせた量に変換
        canvasUtil.strokeLine(centerX, centerY, cx, cy, 'deepskyblue');

        // ピンクのラインをベクトルとして見た場合、以下のように X 軸に水平
        // ※ X が 1.0 で Y が 0.0 なので、長さはちょうど 1.0 で単位ベクトル
        const pinkVector = new MathUtility.Vec2(1.0, 0.0);

        // ピンクと青のベクトルの内積を求める
        const dotProduct = vector.dot(pinkVector);
        // 内積の結果をオレンジの棒グラフで描画
        const dHorizontal = centerX + dotProduct * (WIDTH / 4);
        const dVertical = HEIGHT - 100;
        canvasUtil.strokeLine(centerX, dVertical, dHorizontal, dVertical, 'darkorange');

        // ピンクと青のベクトルの外積を求める
        const crossProduct = vector.cross(pinkVector);
        // 外積の結果を緑の棒グラフで描画
        const cHorizontal = 100;
        const cVertical = centerY - crossProduct * (HEIGHT / 4);
        canvasUtil.strokeLine(cHorizontal, centerY, cHorizontal, cVertical, 'green');

        // 線の太さを元に戻す
        canvasUtil.lineWidth = 2;

        // 内積と外積の結果からラジアンを求める
        let radian = 0.0;
        if(crossProduct === 0){
            // 外積が 0 である場合……
            // ピンクのベクトルに対して青のベクトルは完全に水平となる
            radian = Math.acos(dotProduct);
        }else if(crossProduct > 0){
            // 外積が 0 より大きい場合……
            // ピンクのベクトルに対して青のベクトルは左側にある
            radian = Math.acos(dotProduct);
        }else{
            // 外積が 0 より小さい場合……
            // ピンクのベクトルに対して青のベクトルは右側にある
            radian = Math.PI * 2.0 - Math.acos(dotProduct);
        }

        // ログの出力
        canvasUtil.fillText(`グリッドの幅: ${unit}`, 10, 20);
        canvasUtil.fillText(`２つの単位ベクトル同士の内積と外積、角度は……`, 10, 40);
        canvasUtil.fillText(`dot: ${dotProduct}`, 10, 70, 'darkorange');
        canvasUtil.fillText(`cross: ${crossProduct}`, 10, 100, 'green');
        canvasUtil.fillText(`radian: ${radian}`, 10, 125, 'red');
    }

}, false);

