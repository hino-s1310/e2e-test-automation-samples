# Playwright用Dockerfile
FROM mcr.microsoft.com/playwright:v1.44.1-jammy
WORKDIR /e2e
COPY . .
# 依存関係のインストール（package.jsonがある場合）
RUN if [ -f package.json ]; then npm ci; fi
CMD ["npx", "playwright", "test"] 