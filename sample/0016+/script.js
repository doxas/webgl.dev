
window.addEventListener('DOMContentLoaded', () => {
    // HTML 上の div への参照
    const wrapper = document.querySelector('#wrapper');

    // ArrayBuffer のインスタンスを 4byte の長さで生成する
    const buffer = new ArrayBuffer(4);
    // ArrayBuffer を操作するためのビューを生成する
    const view = new DataView(buffer);

    // Uint8Array を生成して値を DOM に出力
    const ui8 = unsignedInt8(buffer, view);
    const p1 = document.createElement('p');
    p1.textContent = `ui8: [ ${ui8.join(',')} ]`;
    wrapper.appendChild(p1);

    // Float32Array を生成して値を DOM に出力
    const f32 = float32(buffer, view);
    const p2 = document.createElement('p');
    p2.textContent = `f32: [ ${f32.join(',')} ]`;
    wrapper.appendChild(p2);
}, false);

// 符号なしの 8bit 整数をバッファに格納する処理の例
function unsignedInt8(buffer, view){
    view.setUint8(0, 32);  // 0byte 目の位置に値 32 を設定
    view.setUint8(1, 64);  // 1byte 目の位置に値 64 を設定
    view.setUint8(2, 128); // 2byte 目の位置に値 128 を設定
    view.setUint8(3, 255); // 3byte 目の位置に値 255 を設定
    return new Uint8Array(buffer);
}

// 32bit 浮動小数点をバッファに格納する処理の例
function float32(buffer, view){
    // 0 ~ 3byte 目の位置に値 0.12345 をリトルエンディアンで設定
    view.setFloat32(0, 0.12345, true);
    return new Float32Array(buffer);
}

