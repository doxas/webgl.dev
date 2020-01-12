
// export 文で外部にクラスを公開する
export class Clock {
    constructor(){
        this.isTimerRunning = false;
    }
    timer(interval, callback){
        if(this.isTimerRunning === true){
            console.warn('Clock.timer failed: it was running');
            return;
        }
        this.isTimerRunning = true;
        setTimeout(() => {
            this.isTimerRunning = false;
            callback();
        }, interval);
    }
}

