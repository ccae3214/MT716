# 選擇特定的 Node.js 版本作為基礎映像檔
FROM node:18.16.0

# 設定工作目錄
WORKDIR /

# 複製 package.json 和 package-lock.json（如果有）
COPY package*.json ./package-lock.json

# 安裝依賴
RUN npm install

# 複製應用程式程式碼
COPY . .

# 暴露應用程式的埠（例如 3000）
EXPOSE 3000

# 啟動應用程式
CMD ["npm", "start"]