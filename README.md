# e2e-test-automation-samples
主要E2Eテストフレームワークでのサンプルコード集

---

## 環境構築方法

### 1. 前提条件
- Dockerがインストールされていること
- GitHubアカウントを持っていること

### 2. プロジェクトのクローン
```bash
git clone <このリポジトリのURL>
cd e2e-test-automation-samples
```

### 3. Dockerを使ったローカル実行

#### Cypress
```bash
cd cypress
# Dockerイメージのビルド
docker build -t cypress-e2e .
# テストの実行
docker run --rm cypress-e2e
```

#### Playwright
```bash
cd playwright
# Dockerイメージのビルド
docker build -t playwright-e2e .
# テストの実行
docker run --rm playwright-e2e
```

### 4. GitHub Actionsによる自動テスト

- `.github/workflows/` ディレクトリにCypress/Playwright用のワークフローファイルを配置してください。
- プッシュやプルリクエスト時に自動でテストが実行されます。

#### 例: GitHub Actions ワークフロー（Cypress）
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx cypress run
```

#### 例: GitHub Actions ワークフロー（Playwright）
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  playwright-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run Playwright tests
        run: npx playwright test
```

---

詳細なセットアップやカスタマイズ方法は各ディレクトリのREADMEや公式ドキュメントを参照してください。

---

## コミットメッセージ作成ルール

本プロジェクトでは、コミットメッセージの品質向上と履歴の明確化のため、以下のルールに従ってください。

### 基本フォーマット（Conventional Commits 準拠）

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: 変更の種類（必須）
    - feat: 新機能追加
    - fix: バグ修正
    - docs: ドキュメントのみの変更
    - style: フォーマットやスペース等の修正（コードの意味に影響しない）
    - refactor: リファクタリング（機能追加・バグ修正を含まない）
    - test: テスト追加・修正
    - chore: ビルドや補助ツール、ライブラリの変更
- **scope**: 変更範囲（任意、例: cypress, playwright, README など）
- **subject**: 変更内容の要約（50文字以内、文頭は小文字、句読点不要）
- **body**: 変更理由や背景（必要に応じて、空行で区切る）
- **footer**: 関連issueや注意事項（必要に応じて）

#### 例
```
feat(cypress): サンプルテストケースを追加

docs(README): コミットメッセージルールを追記
fix(playwright): テスト失敗時のエラー処理を修正
```

詳細は [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) を参照してください。
