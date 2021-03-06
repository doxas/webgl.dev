
/**
 * 算術クラスを束ねたユーティリティクラス
 * @class
 */
export class MathUtility {
    /**
     * @type {Vec2}
     */
    static get Vec2(){
        return Vec2;
    }
    /**
     * @type {Mat2}
     */
    static get Mat2(){
        return Mat2;
    }
}

/**
 * ２つの要素を持つベクトルを扱うクラス
 * @class
 */
class Vec2 {
    // static method ----------------------------------------------------------
    /**
     * 引数 x, y をベクトルとみなして長さ（大きさ）を返す
     * @param {number} x - ベクトルの X 要素
     * @param {number} y - ベクトルの Y 要素
     * @return {number} ベクトルの長さ（大きさ）
     */
    static calcLength(x, y){
        return Math.sqrt(x * x + y * y);
    }
    // constructor ------------------------------------------------------------
    /**
     * ２つの要素を持つベクトル（コンストラクタの引数を省略した場合、ゼロベクトルになる）
     * @constructor
     * @param {number} [x=0] - ベクトルの X 要素
     * @param {number} [y=0] - ベクトルの Y 要素
     */
    constructor(x = 0.0, y = 0.0){
        this.x = x;
        this.y = y;
    }
    // method -----------------------------------------------------------------
    /**
     * 値を設定する
     * （このメソッドはインスタンス自身を変更します）
     * @param {number} x - ベクトルの X 要素
     * @param {number} y - ベクトルの Y 要素
     * @return {Vec2} 値設定後の自身のインスタンス
     */
    set(x, y){
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * 自身の符号を反転する
     * （このメソッドはインスタンス自身を変更します）
     * @return {Vec2} 符号反転後の自身のインスタンス
     */
    negate(){
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * 自身を単位化する
     * （このメソッドはインスタンス自身を変更します）
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
     * 与えられた Vec2 インスタンスと自身の要素とを加算する
     * （このメソッドはインスタンス自身を変更します）
     * @param {Vec2} v - 加算の対象となる Vec2 インスタンス
     * @return {Vec2} 加算後の自身のインスタンス
     */
    add(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.add: invalid argument');
        }
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを加算する
     * （このメソッドはインスタンス自身を変更します）
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
     * （このメソッドはインスタンス自身を変更します）
     * @param {Vec2} v - 減算の対象となる Vec2 インスタンス
     * @return {Vec2} 減算後の自身のインスタンス
     */
    sub(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.sub: invalid argument');
        }
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを減算する
     * （このメソッドはインスタンス自身を変更します）
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
     * （このメソッドはインスタンス自身を変更します）
     * @param {Vec2} v - 乗算の対象となる Vec2 インスタンス
     * @return {Vec2} 乗算後の自身のインスタンス
     */
    multiply(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.multiply: invalid argument');
        }
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを乗算する
     * （このメソッドはインスタンス自身を変更します）
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
     * （このメソッドはインスタンス自身を変更します）
     * @param {Vec2} v - 除算の対象となる Vec2 インスタンス
     * @return {Vec2} 除算後の自身のインスタンス
     */
    divide(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.divide: invalid argument');
        }
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /**
     * 与えられたスカラーの値と自身の要素とを除算する
     * （このメソッドはインスタンス自身を変更します）
     * @param {number} s - 除算の対象となるスカラーの値
     * @return {Vec2} 除算後の自身のインスタンス
     */
    divideScalar(s){
        this.x /= s;
        this.y /= s;
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
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.distance: invalid argument');
        }
        const x = this.x - v.x;
        const y = this.y - v.y;
        return Vec2.calcLength(x, y);
    }
    /**
     * 与えられた Vec2 インスタンスと自身との内積の結果を返す
     * @param {Vec2} v - 内積の対象となる Vec2 インスタンス
     * @return {number} 内積の結果
     */
    dot(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.dot: invalid argument');
        }
        return this.x * v.x + this.y * v.y;
    }
    /**
     * 与えられた Vec2 インスタンスと自身との外積の結果を返す
     * @param {Vec2} v - 外積の対象となる Vec2 インスタンス
     * @return {number} 外積の結果
     */
    cross(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Vec2.cross: invalid argument');
        }
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

/**
 * 2x2 の正方行列を扱うクラス
 * @class
 */
class Mat2 {
    // static method ----------------------------------------------------------
    /**
     * スケール値を格納した Vec2 インスタンスからスケール行列を生成する
     * @param {Vec2} v - スケール値を格納した Vec2 インスタンス
     * @return {Mat2} スケール行列
     */
    static fromScaling(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Mat2.fromScaling: invalid argument');
        }
        return new Mat2(v.x, 0.0, 0.0, v.y);
    }
    /**
     * ラジアンから回転行列を生成する
     * @param {number} radian - 回転量を表すラジアン
     * @return {Mat2} 回転行列
     */
    static fromRotation(radian){
        const s = Math.sin(radian);
        const c = Math.cos(radian);
        return new Mat2(c, -s, s, c);
    }
    // constructor ------------------------------------------------------------
    /**
     * 2x2 の正方行列（コンストラクタの引数を省略した場合、ゼロ行列になる）
     * | m11, m12 |
     * | m21, m22 |
     * @constructor
     * @param {number} [m11=0] - 1 行 1 列の値
     * @param {number} [m12=0] - 1 行 2 列の値
     * @param {number} [m21=0] - 2 行 1 列の値
     * @param {number} [m22=0] - 2 行 2 列の値
     */
    constructor(m11 = 0.0, m12 = 0.0, m21 = 0.0, m22 = 0.0){
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
    }
    // method -----------------------------------------------------------------
    /**
     * 値を設定する
     * （このメソッドはインスタンス自身を変更します）
     * | m11, m12 |
     * | m21, m22 |
     * @param {number} m11 - 1 行 1 列の値
     * @param {number} m12 - 1 行 2 列の値
     * @param {number} m21 - 2 行 1 列の値
     * @param {number} m22 - 2 行 2 列の値
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    set(m11, m12, m21, m22){
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
        return this;
    }
    /**
     * 自身をゼロ行列にする
     * （このメソッドはインスタンス自身を変更します）
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
     * （このメソッドはインスタンス自身を変更します）
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
     * （このメソッドはインスタンス自身を変更します）
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
     * （このメソッドはインスタンス自身を変更します）
     * @return {Mat2} 値設定後の自身のインスタンス
     */
    inverse(){
        const t0 = this.m11;
        const t1 = this.m12;
        const t2 = this.m21;
        const t3 = this.m22;
        const d = t0 * t3 - t1 * t2;
        if(d === 0.0){
            throw new Error('Mat2.inverse: determinant is zero');
        }
        this.m11 =  t3 / d;
        this.m12 = -t1 / d;
        this.m21 = -t2 / d;
        this.m22 =  t0 / d;
        return this;
    }
    /**
     * 与えられた Vec2 インスタンスをスケール値として自身に反映する
     * （このメソッドはインスタンス自身を変更します）
     * @param {Vec2} v - スケール値を格納した Vec2 インスタンス
     * @return {Mat2} 計算結果を反映した新しい Mat2 インスタンス
     */
    scale(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Mat2.scale: invalid argument');
        }
        this.multiply(Mat2.fromScaling(v));
        return this;
    }
    /**
     * 与えられたラジアンを回転量として自身に反映する
     * （このメソッドはインスタンス自身を変更します）
     * @param {number} radian - 回転量を表すラジアン
     * @return {Mat2} 計算結果を反映した新しい Mat2 インスタンス
     */
    rotate(radian){
        this.multiply(Mat2.fromRotation(radian));
        return this;
    }
    /**
     * 与えられた Mat2 インスタンスを自身に乗算する
     * （このメソッドはインスタンス自身を変更します）
     * @param {Mat2} m - 自身に乗算する Mat2 のインスタンス
     * @return {Mat2} 乗算後の自身のインスタンス
     */
    multiply(m){
        if(m instanceof Mat2 !== true){
            throw new Error('Mat2.multiply: invalid argument');
        }
        const t = this.multiplyByMat2(m);
        this.set(t.m11, t.m12, t.m21, t.m22);
        return this;
    }
    /**
     * 与えられた Vec2 インスタンスを自身に乗算し、その結果を与えられた Vec2 インスタンスに反映する
     * （このメソッドは引数から受け取った Vec2 インスタンスを変更します）
     * @param {Vec2} v - 自身に乗算し、その結果を反映させる Vec2 インスタンス
     * @return {Vec2} 乗算結果を反映した、引数から与えられた Vec2 インスタンス
     */
    applyVec2(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Mat2.applyVec2: invalid argument');
        }
        const t = this.multiplyByVec2(v);
        v.set(t.x, t.y);
        return v;
    }
    /**
     * 自身の値を複製した新しい Mat2 インスタンスを返す
     * @return {Mat2} 自身と同じ値を持つ Mat2 インスタンス
     */
    clone(){
        return new Mat2(this.m11, this.m12, this.m21, this.m22);
    }
    /**
     * 与えられた Vec2 インスタンスを自身に乗算した結果を返す
     *     this        arg
     * | m11, m12 |   | x |
     * |          | x |   |
     * | m21, m22 |   | y |
     * @param {Vec2} v - 乗算する Vec2 インスタンス
     * @return {Vec2} 乗算結果を反映した新しい Vec2 インスタンス
     */
    multiplyByVec2(v){
        if(v instanceof Vec2 !== true){
            throw new Error('Mat2.multiplyByVec2: invalid argument');
        }
        const tx = this.m11 * v.x + this.m12 * v.y;
        const ty = this.m21 * v.x + this.m22 * v.y;
        return new Vec2(tx, ty);
    }
    /**
     * 与えられた Mat2 インスタンスを自身に乗算した結果を返す
     *     this           arg
     * | m11, m12 |   | a11, a12 |
     * |          | x |          |
     * | m21, m22 |   | a21, a22 |
     * @param {Mat2} m - 乗算する Mat2 インスタンス
     * @return {Mat2} 乗算結果を反映した新しい Mat2 インスタンス
     */
    multiplyByMat2(m){
        if(m instanceof Mat2 !== true){
            throw new Error('Mat2.multiplyByMat2: invalid argument');
        }
        const t11 = this.m11 * m.m11 + this.m12 * m.m21;
        const t12 = this.m11 * m.m12 + this.m12 * m.m22;
        const t21 = this.m21 * m.m11 + this.m22 * m.m21;
        const t22 = this.m21 * m.m12 + this.m22 * m.m22;
        return new Mat2(t11, t12, t21, t22);
    }
    /**
     * 与えられた Mat2 インスタンスに対して自身を乗算した結果を返す
     *     arg            this
     * | a11, a12 |   | m11, m12 |
     * |          | x |          |
     * | a21, a22 |   | m21, m22 |
     * @param {Mat2} m - 乗算の対象となる Mat2 インスタンス
     * @return {Mat2} 乗算結果を反映した新しい Mat2 インスタンス
     */
    multiplyToMat2(m){
        if(m instanceof Mat2 !== true){
            throw new Error('Mat2.multiplyToMat2: invalid argument');
        }
        const t11 = m.m11 * this.m11 + m.m12 * this.m21;
        const t12 = m.m11 * this.m12 + m.m12 * this.m22;
        const t21 = m.m21 * this.m11 + m.m22 * this.m21;
        const t22 = m.m21 * this.m12 + m.m22 * this.m22;
        return new Mat2(t11, t12, t21, t22);
    }

    // getter -----------------------------------------------------------------
    /**
     * 自身のインスタンスを配列化したもの
     * @type {Array.<number>}
     */
    get array(){
        return [this.m11, this.m12, this.m21, this.m22];
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
            throw new Error('Mat2.array[set]: invalid type');
        }
        if(values.length < 4){
            throw new Error('Mat2.array[set]: invalid length');
        }
        this.m11 = values[0];
        this.m12 = values[1];
        this.m21 = values[2];
        this.m22 = values[3];
    }
}

