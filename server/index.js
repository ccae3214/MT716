import { config as dotenvConfig } from 'dotenv';

// Load environment variables only in development
if (process.env.NODE_ENV === 'development') {
    dotenvConfig();
    console.log('DB_USER:', process.env.DB_USER); // Debug log
}
const dbConfig = {
    server: "localhost\\SQLEXPRESS", // 本機開發版 SQL Server 實例名稱
    database: "MT716", // 換成你的專案資料庫名稱，你可以從 SQL Server Management Studio 修改，如果是其他名字請在此調整
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true, // 使用 Windows 驗證登入
        trustServerCertificate: true
    }
};
export default dbConfig;