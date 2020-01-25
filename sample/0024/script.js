
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

    // Shift キー押下で角度を固定できるようにするための処理
    let latestAngle = 0;

    // TEMP
    let m = new MathUtility.Mat3(
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
    );
    console.log('origin', m);
    let mr = MathUtility.Mat3.fromScaling(new MathUtility.Vec3(2.0, 2.0, 2.0));
    mr.rotate(1.0);
    let mi = mr.clone();
    mi.inverse();
    let r = m.multiplyByMat3(mr);
    console.log('rotated', r);
    let s = r.multiplyByMat3(mi);
    console.log('inversed', s);

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

        // グリッドの幅に合わせた単位に変換する
        const unit = 1.0 / GRID_COUNT * 2;         // グリッドの幅
        const gridX = (x - centerX) / centerX * 2; // グリッド幅に応じた X の値
        const gridY = (y - centerY) / centerY * 2; // グリッド幅に応じた Y の値

        // Vec2 オブジェクトのインスタンスを生成する
        const vector = new MathUtility.Vec2(gridX, gridY);
        // Vec2 オブジェクトのプロパティからベクトルの長さを得る
        const length = vector.length;
        // Vec2 オブジェクトのメソッドを利用して単位化する
        vector.normalize();

        // X 軸に水平なベクトルとの内積・外積を求める
        const dotProduct = vector.dot(new MathUtility.Vec2(1.0, 0.0));
        const crossProduct = vector.cross(new MathUtility.Vec2(1.0, 0.0));
        // 内積と外積の結果からラジアンを求める
        let radian = 0.0;
        if(crossProduct === 0){
            radian = Math.acos(dotProduct);
        }else if(crossProduct > 0){
            radian = Math.acos(dotProduct);
        }else{
            radian = Math.PI * 2.0 - Math.acos(dotProduct);
        }

        // 求めたラジアンを使って回転行列を生成する
        const rotationMatrix = MathUtility.Mat2.fromRotation(radian);
        // 回転行列にスケールも加えてみる
        rotationMatrix.scale(new MathUtility.Vec2(length, length));

        // 実際に回転していることをわかりやすくする意味で……
        // X 軸に水平なベクトルを作り、それを回転させてみる
        const xVector = new MathUtility.Vec2(1.0, 0.0);
        // 回転行列を使って +X に向いたベクトルを回転する
        // ※このメソッドは引数をそのまま変更するので注意
        rotationMatrix.applyVec2(xVector);

        // わかりやすさのために線を太くする
        canvasUtil.lineWidth = 10;

        // 回転したベクトルを使ってラインを描画する
        const cx = centerX + xVector.x * centerX / 2; // グリッドに合わせた量に変換
        const cy = centerY - xVector.y * centerY / 2; // グリッドに合わせた量に変換
        canvasUtil.strokeLine(centerX, centerY, cx, cy, 'deepskyblue');

        // 同様に、行列の有効性をわかりやすくするために点も描いてみる
        const pointTopLeft     = new MathUtility.Vec2(-1.0,  1.0);
        const pointTopRight    = new MathUtility.Vec2( 1.0,  1.0);
        const pointBottomLeft  = new MathUtility.Vec2(-1.0, -1.0);
        const pointBottomRight = new MathUtility.Vec2( 1.0, -1.0);
        rotationMatrix.applyVec2(pointTopLeft);
        rotationMatrix.applyVec2(pointTopRight);
        rotationMatrix.applyVec2(pointBottomLeft);
        rotationMatrix.applyVec2(pointBottomRight);

        // 回転した座標を使って点（小さなサークル）を描画する
        const colors = [
            'deeppink',
            'darkorange',
            'green',
            'navy',
        ];
        const points = [
            pointTopLeft,
            pointTopRight,
            pointBottomLeft,
            pointBottomRight,
        ];
        points.forEach((point, index) => {
            const px = centerX + point.x * centerX / 2; // グリッドに合わせた量に変換
            const py = centerY - point.y * centerY / 2; // グリッドに合わせた量に変換
            canvasUtil.fillCircle(px, py, 10, colors[index]);
        });

        // 線の太さを元に戻す
        canvasUtil.lineWidth = 2;

        // ログの出力
        canvasUtil.fillText(`グリッドの幅: ${unit}`, 10, 20);
        canvasUtil.fillText(`scale: ${length}`, 10, 40);
        canvasUtil.fillText(`radian: ${radian}`, 10, 60);
    }

}, false);

