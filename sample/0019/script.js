
import {CanvasUtility} from './CanvasUtility.js';

window.addEventListener('DOMContentLoaded', () => {
    // Canvas の幅と高さは定数化しておく
    const WIDTH = 512;
    const HEIGHT = 512;

    // ラッパー DOM の参照を取得
    const wrapper = document.querySelector('#wrapper');

    // CanvasUtility クラスのインスタンスを生成する
    const canvasUtil = new CanvasUtility({
        appendTo: wrapper,
        width: WIDTH,
        height: HEIGHT,
    });

    // Canvas 上でマウスカーソルが動いた際に描画を行う
    canvasUtil.canvas.addEventListener('mousemove', mouseMove, false);

    // 見た目のわかりやすさのためにラインの太さを２倍にしておく
    canvasUtil.lineWidth = 2;

    // 初期状態としてサークルを描画しておく
    drawCircle(100);

    function mouseMove(evt){
        // クリアするメソッドを呼ぶ
        canvasUtil.clear();
        // マウスカーソルの Canvas 上での位置を計算するために……
        // Canvas のスクリーン上での位置の情報を取得
        const bound = canvasUtil.canvas.getBoundingClientRect();
        // X 座標は MouseEvent.clientX から Canvas の横位置を引いて求める
        const x = evt.clientX - bound.x;
        // Y 座標は上下を反転した値にしておく
        const y = HEIGHT - (evt.clientY - bound.y);

        // X 座標から描画する円の半径が決まるようにする
        const radius = x * 0.5;
        // Y 座標から円弧の角度が決まるようにする
        const angle = (y / HEIGHT) * Math.PI * 2;

        // 黒いラインで描かれる円を描画
        drawCircle(radius);
        // オレンジのラインで描かれる円弧を描画
        drawArc(angle, radius);
        // サインとコサインを示す三角形を描画
        drawTriangle(angle, radius);
    }

    /**
     * 黒いラインで円を描く
     * @param {number} radius - 円の半径
     */
    function drawCircle(radius){
        // Canvas の中心を求めるため、幅と高さの半分の値を求める
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        // ０度を意味する水平線と円を描画する
        canvasUtil.strokeLine(centerX, centerY, centerX + radius, centerY);
        canvasUtil.strokeCircle(centerX, centerY, radius);
    }

    /**
     * 角度を表現するためオレンジのラインで円弧を描く
     * @param {number} angle - ラジアンでの角度
     * @param {number} radius - 円弧の半径
     */
    function drawArc(angle, radius){
        // Canvas の中心を求めるため、幅と高さの半分の値を求める
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        // 見た目のわかりやすさのために、アルファや線の太さを一時的に変更
        const alpha = canvasUtil.alpha;
        const lineWidth = canvasUtil.lineWidth;
        canvasUtil.alpha = 0.8;
        canvasUtil.ctx.lineWidth = 4;
        // オレンジ色で円弧を描画する
        canvasUtil.strokeArc(centerX, centerY, angle, radius, 'orange');
        // アルファや線の太さを元に戻す
        canvasUtil.alpha = alpha;
        canvasUtil.ctx.lineWidth = lineWidth;
    }

    /**
     * サインとコサインを表現するための三角形を描く
     * @param {number} angle - ラジアンでの角度
     * @param {number} radius - 三角形が内接する円の半径
     */
    function drawTriangle(angle, radius){
        // Canvas の中心を求めるため、幅と高さの半分の値を求める
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        // 指定された角度（ラジアン）からサインとコサインを求める
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        // 指定された半径をサインとコサインに乗算する（スケールする）
        const x = cos * radius;
        const y = sin * radius;
        // 三角形の各辺を描画する
        canvasUtil.strokeLine(centerX,     centerY, centerX + x, centerY,     'deeppink');
        canvasUtil.strokeLine(centerX + x, centerY, centerX + x, centerY + y, 'deepskyblue');
        canvasUtil.strokeLine(centerX,     centerY, centerX + x, centerY + y);

        // Canvas 上にログを出力しておく
        const radian = Math.PI * 2 - angle;
        canvasUtil.fillText(`angle(radian): ${radian}`, 0, 20, 'orange')
        canvasUtil.fillText(`cos: ${cos}`, 0, 40, 'deeppink')
        canvasUtil.fillText(`sin: ${-sin}`, 0, 60, 'deepskyblue')
    }

}, false);

