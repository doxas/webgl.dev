
export class EasingUtility {
    static saturate(v){
        return Math.min(Math.max(v, 0.0), 1.0);
    }
    static linear(t){
        return EasingUtility.saturate(t);
    }
    static easeInQuad(t){
        return EasingUtility.saturate(t * t);
    }
    static easeOutQuad(t){
        return EasingUtility.saturate(t * (2.0 - t));
    }
    static easeInOutQuad(t){
        if(t < 0.5){
            return EasingUtility.saturate(2.0 * t * t);
        }else{
            return EasingUtility.saturate(-1.0 + (4.0 - 2.0 * t) * t);
        }
    }
}

