const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// EJSやPugなどのテンプレートエンジンを使用しないシンプルな構成のため、
// publicディレクトリを静的ファイルとして提供します。
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // フォームデータのパース用

// ルート ("/") へのGETリクエストに対するハンドラ
app.get('/', (req, res) => {
    // publicフォルダ内のindex.htmlを送信
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// フォームからのPOSTリクエストを処理するエンドポイント
app.post('/view', (req, res) => {
    let url = req.body.urlInput;
    
    // ここでURLの検証とプロトコルの補完を行い、
    // iframeを埋め込んだHTMLをレンダリングして返す
    if (url && !url.startsWith('http')) {
        url = 'https://' + url;
    }

    // iframeを埋め込んだシンプルなレスポンスHTML
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <title>表示結果</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="header-container">
                <h1>表示結果</h1>
                <p>埋め込みを拒否するサイトは表示できません。</p>
            </div>
            <iframe src="${url}" style="width: 100%; height: 80vh; border: 1px solid #ccc;"></iframe>
            <a href="/">戻る</a>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
