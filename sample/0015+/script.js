
import {CanvasUtility} from './CanvasUtility.js';

// コンポジットオペレーションの一覧
const OPERATION = [
    'source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'lighter',
    'copy',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
];

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

    // 線分を描画する
    canvasUtil.strokeLine(200, 200, 400, 400, 'blue');

    // 画像を読み込んでから描画する
    canvasUtil.loadImage('./webgl.png')
    .then((img) => {
        // 回転させる量を、度数からラジアンに変換する（時計回り方向）
        const radians = CanvasUtility.degreesToRadians(45);
        // 回転を加えた上で描画させる
        canvasUtil.drawImage(img, 0, 0, 128, 128, 50, 50, 128, 128, radians);

        // Canvas の現在の状態を DataURL に変換する
        console.log(canvasUtil.canvas.toDataURL('image/jpeg'));
    });

    // テキストを塗りつぶしモードで描画する
    canvasUtil.fillText('１つめの文字（塗りつぶし）', 200, 200, 'deeppink');

    // テキストを枠線モードで描画する
    canvasUtil.strokeText('２つめの文字（枠線）', 200, 400, 'deeppink');

    // アルファ（透明度）とコンポジットオペレーション（合成モード）を指定する
    canvasUtil.alpha = 0.5;
    canvasUtil.compositeOperation = 'lighter';
    canvasUtil.fillRect(100, 100, 200, 200, '#00ff00');

    // 書式の設定はデフォルト値に戻す
    canvasUtil.alpha = 1.0;
    canvasUtil.compositeOperation = 'source-over';

    // CanvasUtility のインスタンスから Canvas とコンテキストを取得する
    const canvas = canvasUtil.canvas;
    const context = canvasUtil.ctx;
    // ImageData を Canvas から取得する
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // ImageData の画素情報をすべて走査し、グレイスケール化する
    const data = imageData.data;
    for(let i = 0, j = imageData.width; i < j; ++i){
        // 変数 i は width に対するカウントなので……
        // ImageData の高さとカウンタ変数を乗算
        const x = i * imageData.height;
        for(let k = 0, l = imageData.height; k < l; ++k){
            // 変数 x に、カウンタ変数 k を加算することで……
            // 対象のピクセルの位置が確定する（RGBA の要素で 1px 分なので 4 倍する）
            const index = (x + k) * 4;
            // RGB の各要素の色を取得して、平均を算出する
            const R = data[index];
            const G = data[index + 1];
            const B = data[index + 2];
            const average = (R + G + B) / (255 * 3);
            // 求めた平均値を同じインデックスの要素に書き戻す
            data[index]     = average;
            data[index + 1] = average;
            data[index + 2] = average;
        }
    }
    // 中身を書き換えた ImageData を Canvas に書き戻す
    context.putImageData(imageData, 0, 0);
}, false);

