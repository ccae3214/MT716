const cosmosPort = 10255; // replace with your port
const dbName = 'admin';
const key = 'LfZmzd0Busgo1B5SaZxRsYs39Dtl5MMMnkqGuCt6EebVTnlNXwP55yTtJfQVpeeMy9Pd8RVDUGJKtxbVilFVZg==';

module.exports = {
  cosmosPort,
  dbName,
  key
};

const config = {
  user: 'MT716', // 例如 'sa'
  password: 'mtadmin716!',
  server: 'mtserver.database.windows.net', // 例如 'localhost' 或 'your_server.database.windows.net'
  database: 'MTSQLDB',
  options: {
    encrypt: true, // 如果使用 Azure SQL，設為 true
    trustServerCertificate: true // 本地開發時可設為 true
  }
};