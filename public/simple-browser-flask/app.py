import os
from flask import Flask, render_template, request

# Flaskアプリケーションの初期化
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    """
    メインページ（ブラウザインターフェース）を処理します。
    POSTリクエストがあれば、入力されたURLをテンプレートに渡します。
    """
    url_to_display = None
    if request.method == 'POST':
        # フォームからURLを取得
        url = request.form.get('urlInput')
        if url:
            # プロトコル（http/https）がない場合、httpsを補完
            if not url.startswith('http://') and not url.startswith('https://'):
                url_to_display = 'https://' + url
            else:
                url_to_display = url
    
    # URLをテンプレートに渡してレンダリング
    return render_template('index.html', url_to_display=url_to_display)

# Renderデプロイ用にポートを設定
# Renderは環境変数PORTで指定されたポートでアプリを起動します。
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
