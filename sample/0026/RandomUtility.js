
/**
 * ランダムな値（擬似乱数）を生成するユーティリティクラス
 * @class
 */
export class RandomUtility {
    static get Xorshift(){
        return Xorshift;
    }
}

class Xorshift {
    constructor(seed = 88675123){
        this.v = new Uint32Array(5);
        this.v[0] = 123456789;
        this.v[1] = 362436069;
        this.v[2] = 521288629;
        this.v[3] = seed;
        this.v[4] = 0;
    }
    random(isFloat){
        this.v[4] = this.v[0] ^ (this.v[0] << 11);
        this.v[0] = this.v[1];
        this.v[1] = this.v[2];
        this.v[2] = this.v[3];
        this.v[3] = (this.v[3] ^ (this.v[3] >>> 19)) ^ (this.v[4] ^ (this.v[4] >>> 8));
        return isFloat === true ? this.v[3] / 0x100000000 : this.v[3];
    }
}

