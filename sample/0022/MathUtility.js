
export class MathUtility {
    static get Vec2(){
        return Vec2;
    }
}

class Vec2 {
    // static method
    static calcLength(x, y){
        return Math.sqrt(x * x + y * y);
    }
    /**
     * @constructor
     * @param {number} x - X 座標
     * @param {number} y - Y 座標
     */
    constructor(x, y){
        this.x = 0.0;
        this.y = 0.0;
        this.set(x, y);
    }
    /**
     * 値を設定する
     * @param {number} x - X 座標
     * @param {number} y - Y 座標
     * @return {Vec2} 値設定後の自身のインスタンス
     */
    set(x, y){
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * 自身の符号を反転する
     * @return {Vec2} 符号反転後の自身のインスタンス
     */
    negate(){
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * 自身を単位化する
     * @return {Vec2} 単位化後の自身のインスタンス
     */
    normalize(){
        const l = this.length;
        if(l === 0.0){
            this.x = 0.0;
            this.y = 0.0;
        }else{
            this.x /= l;
            this.y /= l;
        }
        return this;
    }
    /**
     * 自身の値を複製した新しい Vec2 インスタンスを返す
     * @return {Vec2} 自身と同じ値を持つ Vec2 インスタンス
     */
    clone(){
        return new Vec2(this.x, this.y);
    }
    /**
     * 与えられた Vec2 インスタンスと自身との距離を返す
     * @param {Vec2} v - 距離を測る対象となる Vec2 インスタンス
     * @return {number} 引数に与えられた Vec2 インスタンスとの距離
     */
    distance(v){
        if(v instanceof Vec2){
            throw new Error('Vec2.distance: invalid argument');
        }
        const x = this.x - v.x;
        const y = this.y - v.y;
        return Vec2.calcLength(x, y);
    }
    /**
     * 与えられた Vec2 インスタンスと自身の要素とを加算する
     * @param {Vec2} v - 加算の対象となる Vec2 インスタンス
     * @return {Vec2} 加算後の自身のインスタンス
     */
    add(v){
        if(v instanceof Vec2){
            throw new Error('Vec2.add: invalid argument');
        }
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを加算する
     * @param {number} s - 加算の対象となるスカラーの値
     * @return {Vec2} 加算後の自身のインスタンス
     */
    addScalar(s){
        this.x += s;
        this.y += s;
        return this;
    }
    /**
     * 与えられた Vec2 インスタンスと自身の要素とを減算する
     * @param {Vec2} v - 減算の対象となる Vec2 インスタンス
     * @return {Vec2} 減算後の自身のインスタンス
     */
    sub(v){
        if(v instanceof Vec2){
            throw new Error('Vec2.sub: invalid argument');
        }
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを減算する
     * @param {number} s - 減算の対象となるスカラーの値
     * @return {Vec2} 減算後の自身のインスタンス
     */
    subScalar(s){
        this.x -= s;
        this.y -= s;
        return this;
    }
    /**
     * 与えられた Vec2 インスタンスと自身の要素とを乗算する
     * @param {Vec2} v - 乗算の対象となる Vec2 インスタンス
     * @return {Vec2} 乗算後の自身のインスタンス
     */
    multiply(v){
        if(v instanceof Vec2){
            throw new Error('Vec2.multiply: invalid argument');
        }
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを乗算する
     * @param {number} s - 乗算の対象となるスカラーの値
     * @return {Vec2} 乗算後の自身のインスタンス
     */
    multiplyScalar(s){
        this.x *= s;
        this.y *= s;
        return this;
    }
    /**
     * 与えられた Vec2 インスタンスと自身の要素とを除算する
     * @param {Vec2} v - 除算の対象となる Vec2 インスタンス
     * @return {Vec2} 除算後の自身のインスタンス
     */
    divide(v){
        if(v instanceof Vec2){
            throw new Error('Vec2.divide: invalid argument');
        }
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを除算する
     * @param {number} s - 除算の対象となるスカラーの値
     * @return {Vec2} 除算後の自身のインスタンス
     */
    divideScalar(s){
        this.x /= s;
        this.y /= s;
        return this;
    }
    /**
     * 与えられた Vec2 インスタンスと自身との内積の結果を返す
     * @param {Vec2} v - 内積の対象となる Vec2 インスタンス
     * @return {number} 内積の結果
     */
    dot(v){
        return this.x * v.x + this.y * v.y;
    }
    /**
     * 与えられた Vec2 インスタンスと自身との外積の結果を返す
     * @param {Vec2} v - 外積の対象となる Vec2 インスタンス
     * @return {number} 外積の結果
     */
    cross(v){
        return this.x * v.y - this.y * v.x;
    }

    // getter -----------------------------------------------------------------
    /**
     * 自身のインスタンスの長さ
     * @type {number}
     */
    get length(){
        return Vec2.calcLength(this.x, this.y);
    }
    /**
     * 自身のインスタンスを配列化したもの
     * @type {Array.<number>}
     */
    get array(){
        return [this.x, this.y];
    }

    // setter -----------------------------------------------------------------
    /**
     * 自身のインスタンスに配列から値を設定する
     * @type {Array.<number>}
     */
    set array(values){
        if(
            Array.isArray(values) !== true &&
            values instanceof Object.getPrototypeOf(Int8Array) !== true
        ){
            throw new Error('Vec2.array[set]: invalid type');
        }
        if(values.length < 2){
            throw new Error('Vec2.array[set]: invalid length');
        }
        this.x = values[0];
        this.y = values[1];
    }
}

