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
///創建使用者
async function create_user(req, res) {
  try {
    const { email, password, user_identity } = req.body;
    if (!email || !password || !user_identity) {
      return res.status(400).json({ error: '請提供電子郵件、密碼和用戶身份' });
    }
    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 獲取全局連接池
    const pool = await initializePool();

    // 使用連接池創建 request
    const request = pool.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    // 檢查用戶是否存在
    if (result.recordset.length >0) {
      return res.status(409).json({ error: '電子郵件已經註冊過' });
    }
    const insertRequest = pool.request();
    await insertRequest
      .input('email', sql.VarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('user_identity', sql.Char, user_identity)
      .query(`
        INSERT INTO users (email, password, user_identity)
        VALUES (@email, @password, @user_identity)
      `);

    res.status(201).send('使用者已成功建立');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '建立使用者時發生錯誤', details: err.message });
  }
}
///登入檢查
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
      return res.status(401).json({ error: '電子郵件錯誤' });
    }
    const user = result.recordset[0];
    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(402).json({ error: '密碼錯誤' });
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
export { create_user, sign_in };