import config from './env/environment.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
// 全局連接池
let poolPromise;
async function initializePool() {
    if (!poolPromise) {
        poolPromise = sql.connect(config);
    }
    return poolPromise;
}
async function sign_in(req, res) {
    try {
        const { email, password } = req.body;
        // 檢查是否有提供 email 和 password
        if (!email || !password) {
            return res.status(400).json({ error: '請提供電子郵件和密碼' });
        }
        // 獲取連接池
        const pool = await initializePool();
        // 查詢用戶
        const request = pool.request();
        const result = await request
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');
        // 檢查用戶是否存在
        if (result.recordset.length === 0) {
            return res.status(401).json({ error: '電子郵件或密碼錯誤' });
        }
        const user = result.recordset[0];
        // 驗證密碼
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: '電子郵件或密碼錯誤' });
        }
        // 登入成功（這裡可以返回更多用戶資訊或 JWT Token）
        res.status(200).json({
            message: '登入成功',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                identity: user.user_identity,
            },
        });
    } catch (err) {
        console.error('登入失敗:', err);
        res.status(500).json({ error: '登入時發生錯誤' });
    }
};
export { sign_in };