
// JavaScript での関数の定義
function loaded(){
    // const キーワードでの変数宣言と、セレクタによる要素の参照
    const out = document.querySelector('#out');
    // 参照先の要素にテキストを設定
    out.textContent = '😈😈😈';
}

// ウェブページのコンテンツがロード完了した時点で自動的に関数を実行
window.addEventListener('DOMContentLoaded', loaded, false);

