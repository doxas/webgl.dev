
export class MathUtility {
    static get Vec2(){
        return Vec2;
    }
    static get Mat2(){
        return Mat2;
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

class Mat2 {
    /**
     * 2x2 の正方行列（コンストラクタの引数を省略した場合、ゼロ行列になる）
     * | m11, m12 |
     * | m21, m22 |
     * @constructor
     * @param {number} [m11=0] - 0 行 0 列の値
     * @param {number} [m12=0] - 0 行 1 列の値
     * @param {number} [m21=0] - 1 行 0 列の値
     * @param {number} [m22=0] - 1 行 1 列の値
     */
    constructor(m11 = 0.0, m12 = 0.0, m21 = 0.0, m22 = 0.0){
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
    }
    /**
     * 値を設定する
     * @param {number} m11 - 0 行 0 列の値
     * @param {number} m12 - 0 行 1 列の値
     * @param {number} m21 - 1 行 0 列の値
     * @param {number} m22 - 1 行 1 列の値
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    set(m11 = 0.0, m12 = 0.0, m21 = 0.0, m22 = 0.0){
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
        return this;
    }
    /**
     * 自身をゼロ行列にする
     * | 0.0, 0.0 |
     * | 0.0, 0.0 |
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    zero(){
        this.m11 = 0.0;
        this.m12 = 0.0;
        this.m21 = 0.0;
        this.m22 = 0.0;
        return this;
    }
    /**
     * 自身を単位行列にする
     * | 1.0, 0.0 |
     * | 0.0, 1.0 |
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    identity(){
        this.m11 = 1.0;
        this.m12 = 0.0;
        this.m21 = 0.0;
        this.m22 = 1.0;
        return this;
    }
    /**
     * 自身を転置行列にする
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    transpose(){
        const t = this.m12;
        this.m12 = this.m21;
        this.m21 = t;
        return this;
    }
    /**
     * 自身を逆行列に変換する
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    inverse(){
        const t0 = this.m11;
        const t1 = this.m12;
        const t2 = this.m21;
        const t3 = this.m22;
        const d = t0 * t3 - t2 * t1;
        if(d === 0.0){
            throw new Error('Mat2.inverse: this matrix is zero matrix');
        }
        this.m11 =  t3 / d;
        this.m12 = -t1 / d;
        this.m21 = -t2 / d;
        this.m22 =  t0 / d;
        return this;
    }
    /**
     * 自身の値を複製した新しい Mat2 インスタンスを返す
     * @return {Mat2} 自身と同じ値を持つ Mat2 インスタンス
     */
    clone(){
        return new Mat2(this.m11, this.m12, this.m21, this.m22);
    }
    /**
     * 与えられた Mat2 インスタンスを自身に乗算する
     *     this           arg
     * | m11, m12 |   | a11, a12 |
     * |          | x |          |
     * | m21, m22 |   | a21, a22 |
     * @param {Mat2} m - 乗算する Mat2 インスタンス
     * @return {Mat2} 乗算後の自身のインスタンス
     */
    multiplyByMat2(m){
        const t11 = this.m11 * m.m11 + this.m12 * m.m21;
        const t12 = this.m11 * m.m12 + this.m12 * m.m22;
        const t21 = this.m21 * m.m11 + this.m22 * m.m21;
        const t22 = this.m21 * m.m12 + this.m22 * m.m22;
        this.m11 = t11;
        this.m12 = t12;
        this.m21 = t21;
        this.m22 = t22;
        return this;
    }
}
