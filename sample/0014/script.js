
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
    });

    // テキストを塗りつぶしモードで描画する
    canvasUtil.fillText('１つめの文字（塗りつぶし）', 200, 200, 'deeppink');

    // テキストを枠線モードで描画する
    canvasUtil.strokeText('２つめの文字（枠線）', 200, 400, 'deeppink');

    // アルファ（透明度）とコンポジットオペレーション（合成モード）を指定する
    canvasUtil.alpha = 0.5;
    canvasUtil.compositeOperation = 'lighter';
    // 書式の設定を行った状態で矩形を描画してみる
    canvasUtil.fillRect(100, 100, 200, 200, '#00ff00');

    // 書式の設定はデフォルト値に戻す癖をつけておくとよい
    canvasUtil.alpha = 1.0;
    canvasUtil.compositeOperation = 'source-over';
}, false);

