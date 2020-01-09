
import {WebGLFrame} from './webgl.js';

window.addEventListener('DOMContentLoaded', () => {
    // WebGLFrame クラスを new キーワードでインスタンス化
    let webgl = new WebGLFrame();
    // WebGLFrame.init メソッドには、HTML に書かれた canvas の id 属性名を指定
    webgl.init('webgl-canvas');
    webgl.load()        // ← ここでまずロードの処理が開始される
    .then(() => {
        webgl.setup();  // ← ロードが完了するとここに処理が移る（セットアップ）
        webgl.render(); // ← セットアップが終わったらレンダリングを開始
    });
}, false);

