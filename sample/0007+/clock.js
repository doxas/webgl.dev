
// export 文で外部にクラスを公開する
export class Clock {
    constructor(){
        this.isTimerRunning = false;
    }
    timer(interval){
        // メソッドからは Promise のインスタンスを生成して返す
        return new Promise((resolve, reject) => {
            // 正しく処理が完了した場合は resolve を、
            // そうでない場合は reject を呼び出す
            if(this.isTimerRunning === true){
                const msg = 'Clock.timer failed: it was running';
                reject(msg);
            }else{
                this.isTimerRunning = true;
                setTimeout(() => {
                    this.isTimerRunning = false;
                    resolve(interval);
                }, interval);
            }
        });
    }
}

