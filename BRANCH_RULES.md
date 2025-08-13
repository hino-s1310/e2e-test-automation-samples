# ブランチルール - E2Eテスト自動化プロジェクト

本プロジェクトでは、**Playwright**を中心としたE2Eテスト自動化の特性を考慮した効率的な開発と品質管理のため、以下のブランチ戦略を採用します。

> **注意**: 本プロジェクトはPlaywrightフォーカスに再構築されており、CypressやRobot Frameworkのサンプルコードは優先度を下げています。

## 自動テストプロジェクトの特性

### テストプロジェクト特有の考慮事項
- **テストの安定性**: テストが安定して動作することが重要
- **環境依存**: 異なるブラウザ、OS、デバイスでの動作確認
- **データ管理**: テストデータの管理とクリーンアップ
- **CI/CD統合**: 継続的テスト実行との連携
- **レポート管理**: テスト結果の可視化と分析

## ブランチ戦略

### メインブランチ

#### `main` (または `master`)
- **目的**: 本番環境にデプロイ可能な安定版テストコード
- **保護ルール**: 
  - 直接プッシュ禁止
  - プルリクエスト必須
  - レビュー必須（最低1名）
  - **全テストフレームワークのテスト通過必須**
  - **テスト安定性チェック必須**
- **更新タイミング**: developブランチからのマージ時

#### `develop`
- **目的**: 開発中のテスト機能を統合するブランチ
- **保護ルール**:
  - 直接プッシュ禁止
  - プルリクエスト必須
  - レビュー推奨
  - **少なくとも1つのテストフレームワークのテスト通過必須**
- **更新タイミング**: 機能ブランチからのマージ時

### 作業ブランチ

#### 機能ブランチ (`feature/`)
- **命名規則**: `feature/テストフレームワーク-詳細`
- **例**: 
  - `feature/playwright-delete-login-test`
  - `feature/playwright-api-integration-test`
  - `feature/playwright-performance-test`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - テストの安定性確認必須
  - 複数ブラウザでの動作確認推奨

#### 修正ブランチ (`fix/`)
- **命名規則**: `fix/テストフレームワーク-修正内容-詳細`
- **例**:
  - `fix/playwright-chrome-version-compatibility`
  - `fix/test-data-cleanup-race-condition`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - フレイキーテストの修正時は再現性確認必須

#### テスト安定化ブランチ (`stabilize/`)
- **命名規則**: `stabilize/テストフレームワーク-安定化内容`
- **例**:
  - `stabilize/playwright-network-timeout-issues`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - フレイキーテストの安定化
  - テスト実行時間の最適化
  - エラーハンドリングの改善

#### リファクタリングブランチ (`refactor/`)
- **命名規則**: `refactor/テストフレームワーク-リファクタリング内容-詳細`
- **例**:
  - `refactor/playwright-page-object-pattern-improvement`
  - `refactor/playwright-focus-portfolio-restructure`
  - `refactor/test-framework-architecture-redesign`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - テストコードの品質向上
  - アーキテクチャの改善
  - メンテナンス性の向上
  - 既存テストの動作保証

## 自動テスト特有のブランチ作成・マージフロー

### 1. テスト機能開発フロー

```bash
# 1. developブランチから機能ブランチを作成
git checkout develop
git pull origin develop
git checkout -b feature/playwright-login-e2e-test

# 2. テスト開発・コミット
git add .
git commit -m "feat(playwright): ログイン機能のE2Eテストを追加

- ユーザーログインフローをテスト
- エラーケースのテストを追加
- テストデータの管理を改善
- 複数ブラウザでの動作確認"

# 3. テスト安定性確認
# 複数回テストを実行して安定性を確認

# 4. プッシュ
git push origin feature/cypress-login-e2e-test

# 5. プルリクエスト作成
# GitHub/GitLabでプルリクエストを作成

# 6. レビュー・マージ
# レビュー承認後、developブランチにマージ
```

### 2. テスト安定化フロー

```bash
# 1. developから安定化ブランチを作成
git checkout develop
git pull origin develop
git checkout -b stabilize/playwright-flaky-login-tests

# 2. フレイキーテストの調査と修正
# テストの安定性を向上させる修正を実施

# 3. 複数回のテスト実行で安定性確認
for i in {1..5}; do
  npm run test:playwright
done

# 4. コミット・プッシュ
git add .
git commit -m "stabilize(playwright): ログインテストの安定性を向上

- 要素待機戦略を改善
- テストデータのクリーンアップを強化
- ネットワークタイムアウトを調整"

git push origin stabilize/cypress-flaky-login-tests

# 5. プルリクエスト作成・レビュー・マージ
```

### 3. リファクタリングフロー

```bash
# 1. developからリファクタリングブランチを作成
git checkout develop
git pull origin develop
git checkout -b refactor/playwright-focus-portfolio-restructure

# 2. リファクタリング実施
# テストコードの品質向上とアーキテクチャ改善

# 3. 既存テストの動作確認
npm run test:playwright
# 複数回実行して安定性確認
for i in {1..3}; do
  npm run test:playwright
done

# 4. コミット・プッシュ
git add .
git commit -m "refactor(playwright): ポートフォリオをPlaywrightフォーカスに再構築

- Playwrightのテスト実行と自動化システムに焦点
- 実用的なE2Eテスト自動化の深掘りを優先
- ポートフォリオの専門性を向上"

git push origin refactor/playwright-focus-portfolio-restructure

# 5. プルリクエスト作成・レビュー・マージ
```

### 4. リリースフロー（develop → main）

```bash
# 1. developブランチの最新化
git checkout develop
git pull origin develop

# 2. Playwrightテストでの回帰テスト実行
npm run test:playwright
# または
docker-compose run --rm playwright

# 3. テストレポートの確認
# テスト結果とカバレッジを確認

# 4. developからmainへのプルリクエスト作成
# GitHub/GitLabでプルリクエストを作成

# 5. レビュー・マージ
# レビュー承認後、mainブランチにマージ
# タグを作成: git tag v1.0.0
```

## 自動テスト特有のコミットメッセージルール

### 基本フォーマット
```
<type>(<test-framework>): <subject>

<body>

<footer>
```

### Type の種類（テスト特化）
- `feat`: 新機能追加
- `fix`: バグ修正
- `stabilize`: テスト安定化
- `refactor`: リファクタリング（テストコード品質向上・アーキテクチャ改善）
- `test`: テスト追加・修正
- `docs`: ドキュメントのみの変更
- `chore`: ビルド・ツール変更
- `ci`: CI/CD関連

### Scope の例（テストフレームワーク特化）
- `playwright`: Playwright関連
- `test-utils`: テストユーティリティ
- `test-data`: テストデータ
- `ci`: CI/CD関連

### 例
```
feat(playwright): ログイン機能のE2Eテストを追加

- ユーザーログインフローをテスト
- エラーケースのテストを追加
- テストデータの管理を改善
- 複数ブラウザでの動作確認

Closes #123
```

```
stabilize(playwright): ネットワークタイムアウト問題を修正

- ネットワーク待機時間を延長
- リトライ機能を追加
- エラーハンドリングを改善
- テスト実行時間を最適化

Fixes #456
```

```
refactor(playwright): ポートフォリオをPlaywrightフォーカスに再構築

- Cypress/RobotFrameworkの詳細説明を縮小
- Playwrightのテスト実行と自動化システムに焦点
- 実用的なE2Eテスト自動化の深掘りを優先
- ポートフォリオの専門性を向上

Closes #789
```

## 自動テスト特有の保護ブランチ設定

### main ブランチ
- ✅ Require a pull request before merging
- ✅ Require approvals (1)
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - playwright-tests
- ✅ Require branches to be up to date before merging
- ✅ Include administrators
- ✅ **Require test stability checks**

### develop ブランチ
- ✅ Require a pull request before merging
- ✅ Require approvals (1)
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ **Require at least one test framework to pass**
- ✅ Include administrators

## 自動テスト特有のブランチ命名チェックリスト

### ✅ 良い例
- `feature/playwright-login-e2e-test`
- `feature/playwright-api-integration-test`
- `feature/playwright-performance-test`
- `fix/playwright-timeout-flaky-test`
- `stabilize/playwright-network-timeout-issues`
- `refactor/playwright-page-object-pattern-improvement`
- `refactor/playwright-focus-portfolio-restructure`

### ❌ 悪い例
- `feature/new-test`
- `fix/bug`
- `stabilize/fix`
- `refactor/update`

## 自動テスト特有のブランチ管理コマンド

### テストブランチの一覧表示
```bash
# 機能テストブランチ
git branch | grep "feature/"

# 修正ブランチ
git branch | grep "fix/"

# 安定化ブランチ
git branch | grep "stabilize/"

# リファクタリングブランチ
git branch | grep "refactor/"
```

### テストブランチのクリーンアップ
```bash
# マージ済みテストブランチの削除
git branch --merged | grep -E "(feature|fix|stabilize|refactor)/" | xargs -n 1 git branch -d

# リモートブランチの削除
git push origin --delete <branch-name>
```

### テストブランチの同期
```bash
# リモートブランチの最新情報を取得
git fetch --all --prune

# ローカルブランチを最新に更新
git pull origin <branch-name>
```
