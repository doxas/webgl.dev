
// class 構文
class Clock {
    // コンストラクタ
    constructor(){
        // タイマーが実行中かどうかのフラグ
        this.isTimerRunning = false;
    }
    // タイマーを設定する
    timer(interval, callback){
        // タイマーのフラグの状態を確認
        if(this.isTimerRunning === true){
            // フラグが既に立っている場合はなにもしない
            console.warn('Clock.timer failed: it was running');
            return;
        }
        // タイマーが実行中であることを示すフラグ
        this.isTimerRunning = true;
        // setTimeout でタイマーを設定する
        setTimeout(() => {
            this.isTimerRunning = false;
            callback();
        }, interval);
    }
}

// ウェブページのコンテンツがロード完了した時点で自動的に関数を実行
window.addEventListener('DOMContentLoaded', () => {
    // クロッククラスのインスタンスを生成
    const clock = new Clock();
    // 作成したインスタンスを使ってタイマーをセット
    const intervalTime = 2000;
    clock.timer(intervalTime, () => {
        const msg = `${intervalTime}ミリ秒が経過！`;
        console.log(msg);
        document.querySelector('#out').textContent = msg;
    });
}, false);

