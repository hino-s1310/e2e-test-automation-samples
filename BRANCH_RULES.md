# ブランチルール - E2Eテスト自動化プロジェクト

本プロジェクトでは、E2Eテスト自動化の特性を考慮した効率的な開発と品質管理のため、以下のブランチ戦略を採用します。

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
  - `feature/cypress-add-test`
  - `feature/playwright-delete-login-test`
  - `feature/robotframework-refactor-test`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - テストの安定性確認必須
  - 複数ブラウザでの動作確認推奨

#### 修正ブランチ (`fix/`)
- **命名規則**: `fix/テストフレームワーク-修正内容-詳細`
- **例**:
  - `fix/cypress-timeout-flaky-test`
  - `fix/playwright-chrome-version-compatibility`
  - `fix/robotframework-selenium-webdriver-issue`
  - `fix/test-data-cleanup-race-condition`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - フレイキーテストの修正時は再現性確認必須

#### テスト安定化ブランチ (`stabilize/`)
- **命名規則**: `stabilize/テストフレームワーク-安定化内容`
- **例**:
  - `stabilize/cypress-flaky-login-tests`
  - `stabilize/playwright-network-timeout-issues`
  - `stabilize/robotframework-element-wait-strategies`
- **作成元**: `develop`
- **マージ先**: `develop`
- **削除**: マージ後
- **特別要件**: 
  - フレイキーテストの安定化
  - テスト実行時間の最適化
  - エラーハンドリングの改善

## 自動テスト特有のブランチ作成・マージフロー

### 1. テスト機能開発フロー

```bash
# 1. developブランチから機能ブランチを作成
git checkout develop
git pull origin develop
git checkout -b feature/cypress-login-e2e-test

# 2. テスト開発・コミット
git add .
git commit -m "feat(cypress): ログイン機能のE2Eテストを追加

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
git checkout -b stabilize/cypress-flaky-login-tests

# 2. フレイキーテストの調査と修正
# テストの安定性を向上させる修正を実施

# 3. 複数回のテスト実行で安定性確認
for i in {1..5}; do
  npm run test:cypress
done

# 4. コミット・プッシュ
git add .
git commit -m "stabilize(cypress): ログインテストの安定性を向上

- 要素待機戦略を改善
- テストデータのクリーンアップを強化
- ネットワークタイムアウトを調整"

git push origin stabilize/cypress-flaky-login-tests

# 5. プルリクエスト作成・レビュー・マージ
```

### 3. リリースフロー（develop → main）

```bash
# 1. developブランチの最新化
git checkout develop
git pull origin develop

# 2. 全テストフレームワークでの回帰テスト実行
npm run test:all
# または
docker-compose up

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
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `docs`: ドキュメントのみの変更
- `chore`: ビルド・ツール変更
- `ci`: CI/CD関連

### Scope の例（テストフレームワーク特化）
- `cypress`: Cypress関連
- `playwright`: Playwright関連
- `robotframework`: Robot Framework関連
- `selenium`: Selenium関連
- `test-utils`: テストユーティリティ
- `test-data`: テストデータ
- `ci`: CI/CD関連

### 例
```
feat(cypress): ログイン機能のE2Eテストを追加

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

## 自動テスト特有の保護ブランチ設定

### main ブランチ
- ✅ Require a pull request before merging
- ✅ Require approvals (1)
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - cypress-tests
  - playwright-tests
  - robotframework-tests
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
- `feature/cypress-login-e2e-test`
- `feature/playwright-api-integration-test`
- `feature/robotframework-page-object-pattern`
- `fix/cypress-timeout-flaky-test`
- `stabilize/playwright-network-timeout-issues`

### ❌ 悪い例
- `feature/new-test`
- `fix/bug`
- `stabilize/fix`

## 自動テスト特有のブランチ管理コマンド

### テストブランチの一覧表示
```bash
# 機能テストブランチ
git branch | grep "feature/"

# 修正ブランチ
git branch | grep "fix/"

# 安定化ブランチ
git branch | grep "stabilize/"
```

### テストブランチのクリーンアップ
```bash
# マージ済みテストブランチの削除
git branch --merged | grep -E "(feature|fix|stabilize)/" | xargs -n 1 git branch -d

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

## 自動テスト特有のトラブルシューティング

### よくある問題と解決方法

#### 1. フレイキーテストの対処
```bash
# テストの安定性を確認
for i in {1..5}; do
  npm run test:cypress
done

# 安定化ブランチを作成
git checkout -b stabilize/cypress-flaky-tests
# 修正を実施
```

#### 2. テスト環境の不整合
```bash
# テスト環境をリセット
npm run test:clean
npm run test:setup

# 依存関係を再インストール
npm ci
```

#### 3. CI/CDパイプラインの失敗
```bash
# ローカルでテストを実行して問題を特定
npm run test:local

# ログを確認
npm run test:debug
```

## 自動テスト特有のレビューチェックリスト

### プルリクエストレビュー時
- [ ] ブランチ名が適切か
- [ ] コミットメッセージが適切か
- [ ] **テストが安定して動作するか**
- [ ] **フレイキーテストが含まれていないか**
- [ ] **テストデータの管理が適切か**
- [ ] **エラーハンドリングが適切か**
- [ ] **テスト実行時間が適切か**
- [ ] **複数ブラウザでの動作確認がされているか**
- [ ] **テストレポートが生成されているか**
- [ ] **ドキュメントが更新されているか**
- [ ] **コードの品質が保たれているか**
- [ ] **セキュリティ上の問題がないか**

## 自動テスト特有のベストプラクティス

### テスト安定性の確保
- テストの独立性を保つ
- テストデータのクリーンアップを徹底
- 適切な待機戦略を使用
- フレイキーテストの早期発見と修正

### テスト実行の最適化
- 並列実行の活用
- テスト実行時間の監視
- 不要なテストの削除
- テストデータの効率的な管理

### 品質管理
- テストカバレッジの維持
- テストレポートの可視化
- 継続的なテスト実行
- 定期的なテスト安定性の確認 