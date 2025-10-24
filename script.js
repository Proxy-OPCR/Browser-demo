document.getElementById('openButton').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput');
    const message = document.getElementById('message');
    let url = urlInput.value.trim();

    // 入力値が空の場合はエラーメッセージを表示
    if (url === "") {
        message.textContent = "URLを入力してください。";
        return;
    }

    // URLの基本的な検証とプロトコルの補完
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // http:// または https:// がない場合、https:// を補完
        url = 'https://' + url;
    }

    try {
        // URLを開く
        // _blankで新しいタブで開く
        window.open(url, '_blank');
        message.textContent = `新しいタブで ${url} を開きました。`;
        message.classList.remove('error');
        message.style.color = 'green';
    } catch (e) {
        message.textContent = "無効なURL形式か、開けませんでした。";
        message.classList.add('error');
        message.style.color = 'red';
    }
});
