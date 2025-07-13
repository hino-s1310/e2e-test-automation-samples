# Cypress用Dockerfile
FROM cypress/included:12.17.4
WORKDIR /e2e
COPY . .
# 依存関係のインストール（package.jsonがある場合）
RUN if [ -f package.json ]; then npm ci; fi
CMD ["npx", "cypress", "run"] 