
export class CanvasUtility {
    /**
     * 規定の塗りつぶし（fill）カラー
     * @return {string}
     */
    static get DEFAULT_FILL_COLOR(){
        return 'black';
    }

    /**
     * 規定の枠線（stroke）カラー
     * @return {string}
     */
    static get DEFAULT_STROKE_COLOR(){
        return 'black';
    }

    /**
     * @constructor
     * @param {object} [option] - オプション
     * @param {HTMLCanvasElement} option.canvas - 外部から任意の Canvas を指定する
     * @param {HTMLElement} option.appendTo - Canvas を挿入する場合指定する
     * @param {number} option.width - Canvas の幅
     * @param {number} option.height - Canvas の高さ
     */
    constructor(option){
        /** @type {HTMLCanvasElement} */
        this.canvas = null;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;

        if(option != null){
            if(
                option.hasOwnProperty('canvas') === true &&
                option.canvas instanceof HTMLCanvasElement === true
            ){
                this.canvas = option.canvas;
            }
        }
        if(this.canvas == null){
            this.canvas = document.createElement('canvas');
        }

        if(option != null){
            if(
                option.hasOwnProperty('appendTo') === true &&
                option.appendTo instanceof HTMLElement === true
            ){
                option.appendTo.appendChild(this.canvas);
            }
            if(option.hasOwnProperty('width') === true){
                this.canvas.width = option.width;
            }
            if(option.hasOwnProperty('height') === true){
                this.canvas.height = option.height;
            }
        }

        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Canvas をクリアする
     */
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 矩形を塗りつぶし（fill）モードで描画する
     * @param {number} x - 矩形の X 座標
     * @param {number} y - 矩形の Y 座標
     * @param {number} width - 矩形の幅
     * @param {number} height - 矩形の高さ
     * @param {string} [color=CanvasUtility.DEFAULT_FILL_COLOR] - CSS スタイルの色
     */
    fillRect(x, y, width, height, color = CanvasUtility.DEFAULT_FILL_COLOR){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    /**
     * 矩形を枠線（stroke）モードで描画する
     * @param {number} x - 矩形の X 座標
     * @param {number} y - 矩形の Y 座標
     * @param {number} width - 矩形の幅
     * @param {number} height - 矩形の高さ
     * @param {string} [color=CanvasUtility.DEFAULT_STROKE_COLOR] - CSS スタイルの色
     */
    strokeRect(x, y, width, height, color = CanvasUtility.DEFAULT_STROKE_COLOR){
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, width, height);
    }

    /**
     * パスを利用して線分を描画する
     * @param {number} sx - 線分の始点の X 座標
     * @param {number} sy - 線分の始点の Y 座標
     * @param {number} ex - 線分の終点の X 座標
     * @param {number} ey - 線分の終点の Y 座標
     * @param {string} [color=CanvasUtility.DEFAULT_STROKE_COLOR] - CSS スタイルの色
     */
    strokeLine(sx, sy, ex, ey, color = CanvasUtility.DEFAULT_STROKE_COLOR){
        this.ctx.strokeStyle = color;
        // パスの設定を開始することを明示する
        this.ctx.beginPath();
        // パスの始点を移動させる
        this.ctx.moveTo(sx, sy);
        // ラインの終点までパスを引く
        this.ctx.lineTo(ex, ey);
        // パスの設定を終了することを明示する
        this.ctx.closePath();
        // 引いたパスに対して枠線モードで描画する
        this.ctx.stroke();
    }
}

