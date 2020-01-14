
export class CanvasUtility {
    /**
     * 規定の塗りつぶしカラー（CSS スタイル）
     * @return {string}
     */
    static get DEFAULT_FILL(){
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
     * 矩形を描画する
     * @param {number} x - 矩形の X 座標
     * @param {number} y - 矩形の Y 座標
     * @param {number} width - 矩形の幅
     * @param {number} height - 矩形の高さ
     * @param {string} [color=CanvasUtility.DEFAULT_FILL] - CSS スタイルの色
     */
    fillRect(x, y, width, height, color = CanvasUtility.DEFAULT_FILL){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
}

