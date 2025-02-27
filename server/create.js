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

async function create_user(req, res) {
  try {
    const { name, email, pass_word, contact_number, address, user_identity } = req.body;

    // 加密密碼
    const hashedPassword = await bcrypt.hash(pass_word, 10);

    // 獲取全局連接池
    const pool = await initializePool();

    // 使用連接池創建 request
    const request = pool.request();
    await request
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('contact_number', sql.NVarChar, contact_number)
      .input('address', sql.NVarChar, address)
      .input('user_identity', sql.NVarChar, user_identity)
      .query(`
        INSERT INTO users (name, email, password, contact_number, address, user_identity)
        VALUES (@name, @email, @password, @contact_number, @address, @user_identity)
      `);

    res.status(201).send('使用者已成功建立');
  } catch (err) {
    console.error(err);
    res.status(500).send('建立使用者時發生錯誤');
  }
}

export { create_user };