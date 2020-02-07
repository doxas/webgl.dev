
export class CanvasUtility {
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

        // もしオプションが指定されている場合
        if(option != null){
            // option.canvas が存在し、正しいオブジェクト型である場合
            if(
                option.hasOwnProperty('canvas') === true &&
                option.canvas instanceof HTMLCanvasElement === true
            ){
                this.canvas = option.canvas;
            }
        }
        // option.canvas の指定がなかった場合
        if(this.canvas == null){
            // 自動的に生成する
            this.canvas = document.createElement('canvas');
        }

        // オプションの内容に応じた処理
        if(option != null){
            // option.appendTo が存在し、HTML のエレメントである場合
            if(
                option.hasOwnProperty('appendTo') === true &&
                option.appendTo instanceof HTMLElement === true
            ){
                // canvas をアペンドする
                option.appendTo.appendChild(this.canvas);
            }
            // option.width が存在する場合
            if(option.hasOwnProperty('width') === true){
                this.canvas.width = option.width;
            }
            // option.height が存在する場合
            if(option.hasOwnProperty('height') === true){
                this.canvas.height = option.height;
            }
        }

        // Canvas2D コンテキストを生成する
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Canvas をクリアする
     */
    clear(){
        this.ctx.clearRect(
            0,                 // クリアする矩形の X 座標
            0,                 // クリアする矩形の Y 座標
            this.canvas.width, // クリアする矩形の幅
            this.canvas.height // クリアする矩形の高さ
        );
    }
}

