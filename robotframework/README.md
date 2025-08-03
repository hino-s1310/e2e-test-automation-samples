# Robot Framework Selenium サンプル

このディレクトリには、Robot FrameworkとSeleniumLibraryを使用したE2Eテストのサンプルコードが含まれています。

## セットアップ

### 方法1: ローカル環境での実行

1. 依存関係のインストール:
```bash
pip install -r requirements.txt
```

2. ChromeDriverのインストール（自動で管理されます）

### 方法2: Dockerでの実行

```bash
# Dockerイメージのビルド
docker build -t robotframework-e2e .

# テストの実行
docker run --rm robotframework-e2e

# 特定のテストファイルを実行
docker run --rm robotframework-e2e robot tests/basic_web_test.robot

# タグ付きでテストを実行
docker run --rm robotframework-e2e robot --include smoke tests/
```

### 方法3: docker-composeでの実行

プロジェクトルートから実行:
```bash
# Robot Frameworkテストのみ実行
docker-compose run --rm robotframework

# すべてのテストフレームワークを実行
docker-compose up
```

## サンプルテスト

### 基本的なWebテスト
- `tests/basic_web_test.robot`: Google検索の基本的なテスト
- `tests/form_test.robot`: フォーム入力のテスト

### ページオブジェクトパターン
- `pages/`: ページオブジェクトクラス
- `tests/page_object_test.robot`: ページオブジェクトを使用したテスト

## 実行方法

### ローカル実行
```bash
# すべてのテストを実行
robot tests/

# 特定のテストファイルを実行
robot tests/basic_web_test.robot

# 詳細なログ付きで実行
robot --loglevel DEBUG tests/

# Pythonスクリプトから実行
python run_tests.py --tags smoke
```

### Docker実行
```bash
# 基本的なテスト実行
docker run --rm robotframework-e2e

# 特定のテストファイル
docker run --rm robotframework-e2e robot tests/form_test.robot

# タグ付き実行
docker run --rm robotframework-e2e robot --include smoke tests/

# 結果をホストにマウント
docker run --rm -v $(pwd)/results:/e2e/results robotframework-e2e
```

## 出力

テスト実行後、以下のファイルが生成されます：
- `log.html`: 詳細なテストログ
- `report.html`: テスト結果レポート
- `output.xml`: XML形式のテスト結果 