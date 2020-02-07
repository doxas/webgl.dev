
export class EasingUtility {
    /**
     * 引数の値を 0.0 ~ 1.0 の範囲にクランプする
     * @param {number} v - 値
     * @return {number} 0.0 ~ 1.0 にクランプした値
     */
    static saturate(v){
        return Math.min(Math.max(v, 0.0), 1.0);
    }
    /**
     * 線形補間
     * @param {number} v - 値
     * @return {number}
     */
    static linear(t){
        return EasingUtility.saturate(t);
    }
    /**
     * イーズイン（始まりが緩やか）
     * @param {number} v - 値
     * @return {number}
     */
    static easeInQuad(t){
        return EasingUtility.saturate(t * t);
    }
    /**
     * イーズアウト（終わりが緩やか）
     * @param {number} v - 値
     * @return {number}
     */
    static easeOutQuad(t){
        return EasingUtility.saturate(t * (2.0 - t));
    }
    /**
     * イーズインアウト（始まりと終わりが緩やか）
     * @param {number} v - 値
     * @return {number}
     */
    static easeInOutQuad(t){
        if(t < 0.5){
            return EasingUtility.saturate(2.0 * t * t);
        }else{
            return EasingUtility.saturate(-1.0 + (4.0 - 2.0 * t) * t);
        }
    }
}

