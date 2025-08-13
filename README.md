# e2e-test-automation-samples
playwrightを使ったサンプルコード集

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

#### Playwright（メインフレームワーク）
```bash
cd playwright
# Dockerイメージのビルド
docker build -t playwright-e2e .
# テストの実行
docker run --rm playwright-e2e
```

### 4. docker-composeを使った実行

```bash
# Playwrightテストの実行
docker-compose run --rm playwright
```

### 5. GitHub Actionsによる自動テスト

- `.github/workflows/` ディレクトリにPlaywright用のワークフローファイルを配置してください。
- プッシュやプルリクエスト時に自動でテストが実行されます。

---

## 📋 今後のロードマップ

プロジェクトの今後の開発計画については、[ROADMAP.md](./ROADMAP.md)をご確認ください。

---

## 開発ルール

### ブランチ戦略
本プロジェクトでは、効率的な開発と品質管理のため、Git Flowベースのブランチ戦略を採用しています。

詳細は [BRANCH_RULES.md](./BRANCH_RULES.md) を参照してください。

### コミットメッセージルール
本プロジェクトでは、コミットメッセージの品質向上と履歴の明確化のため、以下のルールに従ってください。

#### 基本フォーマット（Conventional Commits 準拠）

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
- **scope**: 変更範囲（任意、例: playwright, README など）
- **subject**: 変更内容の要約（50文字以内、文頭は小文字、句読点不要）
- **body**: 変更理由や背景（必要に応じて、空行で区切る）
- **footer**: 関連issueや注意事項（必要に応じて）

#### 例
```
feat(playwright): サンプルテストケースを追加
feat(playwright): ページオブジェクトパターンのサンプルを追加
docs(README): コミットメッセージルールを追記
fix(playwright): テスト失敗時のエラー処理を修正
```

詳細は [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) を参照してください。
