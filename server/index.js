import { config as dotenvConfig } from 'dotenv';

// Load environment variables only in development
if (process.env.NODE_ENV === 'development') {
    dotenvConfig();
    console.log('DB_USER:', process.env.DB_USER); // Debug log
}
const dbConfig = {
    user:"MT716",
    password: "mtadmin716!",
    server:"mtserver.database.windows.net",
    database: "MTSQLDB",
    options: {
        encrypt: true,
        trustServerCertificate: process.env.NODE_ENV === 'development'
    }
};
export default dbConfig;