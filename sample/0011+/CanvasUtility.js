
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
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * 画像をロードする
     * @param {string} path - 画像ファイルのパス
     * @return {Promise.<HTMLImageElement>} ロードしたイメージよって解決する Promise
     */
    loadImage(path){
        return new Promise((resolve) => {
            // HTMLImageElement のインスタンスを生成する
            const img = new Image();
            // まず最初にロード完了時の処理を登録しておく
            img.addEventListener('load', () => {
                // 読み込みが完了した時点で resolve する
                resolve(img);
            });
            // 登録後、読み込む画像のパスをソースに指定する
            img.src = path;
        });
    }

    /**
     * 画像を描画する
     * @param {CanvasImageSource} image - 描画するイメージ（画像など）
     * @param {number} sx - 描画するイメージから矩形を切り取る際の、左上角の X 座標
     * @param {number} sy - 描画するイメージから矩形を切り取る際の、左上角の Y 座標
     * @param {number} sWidth - 描画するイメージから矩形を切り取る際の幅
     * @param {number} sHeight - 描画するイメージから矩形を切り取る際の高さ
     * @param {number} dx - 描画先矩形の左上角の X 座標
     * @param {number} dy - 描画先矩形の左上角の Y 座標
     * @param {number} dWidth - 描画先矩形の幅
     * @param {number} dHeight - 描画先矩形の高さ
     */
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

