FROM python:3.11-slim

# 作業ディレクトリを設定
WORKDIR /e2e

# システムパッケージの更新とChromeのインストール
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Chromeのインストール
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Python依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Robot Frameworkのインストール確認
RUN robot --version

# テストファイルをコピー
COPY . .

# デフォルトコマンド
CMD ["robot", "tests/"] 