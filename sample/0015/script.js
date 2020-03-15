
// class 構文
class Clock {
    // コンストラクタ
    constructor(){
        this.startTime = 0;
    }
    // クロックをスタートするメソッド
    start(){
        this.startTime = Date.now();
    }
    // 経過時間を取得するメソッド
    getTime(){
        return Date.now() - this.startTime;
    }
}

// クロッククラスのインスタンスを生成
const clock = new Clock();
// クロックをスタートする
clock.start();

// ウェブページのコンテンツがロード完了した時点で自動的に関数を実行
window.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#out').textContent = `${clock.getTime()}ms`;
}, false);

