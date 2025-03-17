// 處理 dotenv 的條件載入
import { config as dotenvConfig } from 'dotenv';
if (process.env.NODE_ENV === 'development') {
    dotenvConfig();
    console.log('DB_USER:', process.env.DB_USER); // 檢查是否載入
}

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || "mtserver.database.windows.net",
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: process.env.NODE_ENV === 'development'
    }
};

export default config; // 直接匯出 config 物件