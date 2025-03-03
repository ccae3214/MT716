import config from './env/environment.js';
import sql from 'mssql';
import jwt from "jsonwebtoken" // 用於生成和驗證 token
import cookie from 'react-cookies'
// 全局連接池
let poolPromise;
async function initializePool() {
    if (!poolPromise) {
        poolPromise = sql.connect(config);
    }
    return poolPromise;
};

async function verify_token(req, res) {
    const token = cookie.load('token'); // 從 Cookie 獲取 token
    const user = cookie.load('user')
    const JWT_SECRET = "dbb289b8a5c7e25b027d915641ed5878cdd0d1861109cb1e25335d0764e16ada"; // 建議使用 .env 文件

    if (!token) {
        return res.status(401).json({ success: false, message: "No token expired" });
    }
    try {
        // 驗證 token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('認證有效')
        res.status(200).json({ success: true,user:user, message: "Token is valid" });
    } catch (err) {
        console.error("Token verification error:", err);
        console.log('無法取得認證')
        res.status(500).json({ success: false, message: "server disconnect" });
    }
};
async function sign_out(req, res) {
    try {
    cookie.remove('token', { path: '/' })
    res.status(200).json({ success: true, message: "Logged out successfully" });
} catch (err) {
    console.error("Signout error:", err);
    res.status(500).json({ success: false, message: "server disconnect" });
}
}
export { verify_token, sign_out };