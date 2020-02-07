
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

        // shift キーの押下時はオフセット量を設定する
        const offsetX = evt.shiftKey === true ? 1.0 : 0.0;
        const offsetY = evt.shiftKey === true ? 1.0 : 0.0;

        // グリッドの再描画を行う
        drawGrid();
        // 座標の位置にサークルを描画する
        drawCircle(x, y, offsetX, offsetY);
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
     * 座標を意味するサークルの描画
     * @param {number} x - ベクトルの終点の X 座標
     * @param {number} y - ベクトルの終点の Y 座標
     * @param {number} offsetX - X 方向にオフセットさせる量
     * @param {number} offsetY - Y 方向にオフセットさせる量
     */
    function drawCircle(x, y, offsetX, offsetY){
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

        // 平行移動量から行列を生成する
        const translateVector = new MathUtility.Vec2(offsetX, offsetY);
        const mat3 = MathUtility.Mat3.fromTranslation(translateVector);
        // 求めたラジアンを使って行列を回転させる
        mat3.rotate(radian);
        // スケールも加えてみる
        mat3.scale(new MathUtility.Vec3(length, length, 1.0));

        // 各種座標を Vec3 で定義
        const pointCenter      = new MathUtility.Vec3( 0.0,  0.0,  1.0);
        const pointTopLeft     = new MathUtility.Vec3(-1.0,  1.0,  1.0);
        const pointTopRight    = new MathUtility.Vec3( 1.0,  1.0,  1.0);
        const pointBottomLeft  = new MathUtility.Vec3(-1.0, -1.0,  1.0);
        const pointBottomRight = new MathUtility.Vec3( 1.0, -1.0,  1.0);
        mat3.applyVec3(pointCenter);
        mat3.applyVec3(pointTopLeft);
        mat3.applyVec3(pointTopRight);
        mat3.applyVec3(pointBottomLeft);
        mat3.applyVec3(pointBottomRight);

        // 回転した座標を使って点（小さなサークル）を描画する
        const colors = [
            'red',
            'deeppink',
            'darkorange',
            'green',
            'navy',
        ];
        const points = [
            pointCenter,
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

        // ログの出力
        canvasUtil.fillText(`グリッドの幅: ${unit}`, 10, 20);
        canvasUtil.fillText(`scale: ${length}`, 10, 40);
        canvasUtil.fillText(`radian: ${radian}`, 10, 60);
        canvasUtil.fillText(`offset: [${offsetX}, ${offsetY}]`, 10, 80, 'red');
    }

}, false);

