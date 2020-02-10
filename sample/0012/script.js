
// ウェブブラウザが HTML のパースを完了してから処理を行う
window.addEventListener('DOMContentLoaded', () => {
    // body 全体
    const body = document.body;

    // 最初に登場する div
    const div = document.querySelector('div');

    // すべての p
    const paragraphAll = document.querySelectorAll('p');

    // div の最初の子ノード
    const text = div.firstChild;

    // div の最初の子エレメント
    const span = div.firstElementChild;

    // id や class 属性を持つ要素
    const paragraphWithId = document.getElementById('p-with-id');
    const paragraphWithClass = document.getElementsByClassName('p-with-class');

    // Element の新規生成
    const createDiv = document.createElement('div');

    // Element を子要素として追加、または子要素の削除
    div.appendChild(createDiv);
    div.removeChild(span);
}, false);

