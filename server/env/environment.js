const config = {
  user: 'MT716', // DB使用者名稱'
  password: 'mtadmin716!',// DB使用者密碼'
  server: 'mtserver.database.windows.net', // 例如 'localhost' 或 'your_server.database.windows.net'
  database: 'MTSQLDB',// DB名稱'
  options: {
    encrypt: true, // 如果使用 Azure SQL，設為 true
    trustServerCertificate: true // 本地開發時可設為 true
  }
};
export default config;