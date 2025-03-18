import sql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken" // 用於生成和驗證 token
import cookie from 'react-cookies'
// 全局連接池
let poolPromise;
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
async function initializePool() {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig);
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
    if (result.recordset.length > 0) {
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
    console.log(123+dbConfig)
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
    // JWT 密鑰（應儲存在環境變數中）
    const JWT_SECRET = "dbb289b8a5c7e25b027d915641ed5878cdd0d1861109cb1e25335d0764e16ada"; // 建議使用 .env 文件
    // 生成 JWT token
    const token = jwt.sign({ user: user.email }, JWT_SECRET, { expiresIn: "24h" });
    // 登入成功（這裡可以返回更多用戶資訊或 JWT Token）
    const expires = new Date()
   expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    cookie.save('token', token, { path: '/',expires,httpOnly: true});
    cookie.save('user', user, { path: '/' });///使用者密碼已加密過可直接存cookie沒關係

    res.status(200).json({
      success: true,
      message: '登入成功',
      user:user
    });
  } catch (err) {
    console.error('登入失敗:', err);
    res.status(500).json({ error: '登入時發生錯誤' });
  }
};
async function sign_out(req, res) {
  
  try {
  cookie.remove('token', { path: '/' })
  cookie.remove('user', { path: '/' })
  const user = cookie.load('user')// 從 Cookie 獲取 user
  res.status(200).json({ success: true,user:{}, message: "Logged out successfully" });
} catch (err) {
  console.error("Signout error:", err);
  res.status(500).json({ success: false, message: "server disconnect" });
}
}
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
      ///console.log('認證有效')
      res.status(200).json({ success: true,user:user, message: "Token is valid" });
  } catch (err) {
      console.error("Token verification error:", err);
      ///console.log('無法取得認證')
      res.status(500).json({ success: false, message: "server disconnect" });
  }
};

export { create_user, sign_in,sign_out,verify_token };