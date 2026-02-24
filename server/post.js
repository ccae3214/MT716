import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import cookie from 'react-cookies';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import path from 'path';

// 取得此檔案的目錄，避免相對路徑問題
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 建立或開啟本地的 SQLite 資料庫檔案（絕對路徑）
const db = new sqlite3.Database(path.join(__dirname, 'mt716-local.db'));

// 將 callbacks 轉為 Promise 方便使用 async/await
const dbGet = promisify(db.get.bind(db));
const dbRun = promisify(db.run.bind(db));
const dbAll = promisify(db.all.bind(db));

// 確保資料庫與資料表存在
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      user_identity TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      course_name TEXT,
      course_content TEXT,
      FOREIGN KEY(teacher_id) REFERENCES users(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      teacher_id INTEGER,
      task_name TEXT,
      task_req TEXT,
      due_date TEXT,
      FOREIGN KEY(course_id) REFERENCES courses(id),
      FOREIGN KEY(teacher_id) REFERENCES users(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS task_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      task_id INTEGER,
      submission_content TEXT,
      is_completed BOOLEAN DEFAULT 0,
      FOREIGN KEY(student_id) REFERENCES users(id),
      FOREIGN KEY(task_id) REFERENCES tasks(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS student_courses (
      student_id INTEGER,
      course_id INTEGER,
      PRIMARY KEY (student_id, course_id),
      FOREIGN KEY(student_id) REFERENCES users(id),
      FOREIGN KEY(course_id) REFERENCES courses(id)
    )
  `);
});

///創建使用者
async function create_user(req, res) {
  try {
    const { email, password, user_identity } = req.body;
    if (!email || !password || !user_identity) {
      return res.status(400).json({ error: '請提供電子郵件、密碼和用戶身份' });
    }
    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 檢查用戶是否存在
    const existingUser = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(409).json({ error: '電子郵件已經註冊過' });
    }

    await dbRun(`
      INSERT INTO users (email, password, user_identity)
      VALUES (?, ?, ?)
    `, [email, hashedPassword, user_identity]);

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
    // 查詢用戶
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);

    // 檢查用戶是否存在
    if (!user) {
      return res.status(401).json({ error: '電子郵件錯誤' });
    }
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
    cookie.save('token', token, { path: '/', expires, httpOnly: true });
    cookie.save('user', user, { path: '/' });///使用者密碼已加密過可直接存cookie沒關係

    res.status(200).json({
      success: true,
      message: '登入成功',
      user: user
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
    res.status(200).json({ success: true, user: {}, message: "Logged out successfully" });
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
    res.status(200).json({ success: true, user: user, message: "Token is valid" });
  } catch (err) {
    console.error("Token verification error:", err);
    ///console.log('無法取得認證')
    res.status(500).json({ success: false, message: "server disconnect" });
  }
};

// 新增：老師建立課程
async function create_course(req, res) {
  try {
    const { teacher_email, course_name, course_content } = req.body;
    console.log('[create_course] teacher_email:', teacher_email, 'course_name:', course_name);
    if (!teacher_email || !course_name) return res.status(400).json({ success: false, error: '請提供完整的課程資訊' });

    const teacher = await dbGet(`SELECT id, user_identity FROM users WHERE email = ?`, [teacher_email]);
    console.log('[create_course] teacher found:', teacher);
    if (!teacher) return res.status(404).json({ success: false, error: '此 Email 的帳號不存在' });
    if (teacher.user_identity !== 'Teacher') return res.status(403).json({ success: false, error: '此帳號身分不是老師: ' + teacher.user_identity });

    await dbRun('INSERT INTO courses (teacher_id, course_name, course_content) VALUES (?, ?, ?)', [teacher.id, course_name, course_content]);
    res.status(201).json({ success: true, message: '課程建立成功！' });
  } catch (err) {
    console.error('[create_course] error:', err.message);
    res.status(500).json({ success: false, error: '伺服器錯誤', details: err.message });
  }
}

// 新增：老師指派任務
async function create_task(req, res) {
  try {
    const { course_id, teacher_email, task_name, task_req, due_date } = req.body;
    if (!teacher_email || !course_id || !task_name) return res.status(400).json({ success: false, error: '請提供完整的任務資訊' });

    const teacher = await dbGet(`SELECT id, user_identity FROM users WHERE email = ?`, [teacher_email]);
    if (!teacher) return res.status(404).json({ success: false, error: '此 Email 的帳號不存在' });
    if (teacher.user_identity !== 'Teacher') return res.status(403).json({ success: false, error: '此帳號身分不是老師: ' + teacher.user_identity });

    await dbRun('INSERT INTO tasks (course_id, teacher_id, task_name, task_req, due_date) VALUES (?, ?, ?, ?, ?)',
      [course_id, teacher.id, task_name, task_req, due_date]);
    res.status(201).json({ success: true, message: '任務指派成功！' });
  } catch (err) {
    res.status(500).json({ success: false, error: '伺服器錯誤', details: err.message });
  }
}

// 新增：取得所有的課程列表
async function get_courses(req, res) {
  try {
    // 簡單的取出所有的課程清單與授課教師Email
    const courses = await dbAll(`
      SELECT c.*, u.email as teacher_email 
      FROM courses c 
      LEFT JOIN users u ON c.teacher_id = u.id
    `);
    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, error: '無法讀取課程' });
  }
}

// 新增：學生選修課程
async function enroll_course(req, res) {
  try {
    const { student_email, course_id } = req.body;
    console.log('[enroll_course] student_email:', student_email, 'course_id:', course_id);

    if (!student_email || !course_id) {
      return res.status(400).json({ success: false, error: '缺少學生 email 或 course_id' });
    }

    const student = await dbGet(`SELECT id, user_identity FROM users WHERE email = ?`, [student_email]);
    console.log('[enroll_course] student found:', student);

    if (!student) return res.status(404).json({ success: false, error: '找不到此郵件的用戶' });
    if (student.user_identity !== 'Student') return res.status(403).json({ success: false, error: '只有學生可以加入課程，該帳號身分是: ' + student.user_identity });

    await dbRun('INSERT OR IGNORE INTO student_courses (student_id, course_id) VALUES (?, ?)', [student.id, course_id]);
    console.log('[enroll_course] enrolled successfully');
    res.status(200).json({ success: true, message: '成功加入課程！' });
  } catch (err) {
    console.error('[enroll_course] error:', err.message);
    res.status(500).json({ success: false, error: '加入課程時發生錯誤', details: err.message });
  }
}

// 新增：取得學生已選修的課程
async function get_student_courses(req, res) {
  try {
    const { email } = req.query;
    const student = await dbGet(`SELECT id FROM users WHERE email = ? AND user_identity = 'Student'`, [email]);
    if (!student) return res.status(404).json({ success: false, error: '找不到學生資料' });

    const courses = await dbAll(`
      SELECT c.*, u.email as teacher_email 
      FROM student_courses sc
      JOIN courses c ON sc.course_id = c.id
      JOIN users u ON c.teacher_id = u.id
      WHERE sc.student_id = ?
    `, [student.id]);
    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, error: '讀取選修課程失敗', details: err.message });
  }
}

// 新增：取得學生因為選修課程而需要做的任務
async function get_student_tasks(req, res) {
  try {
    const { email } = req.query;
    const student = await dbGet('SELECT id FROM users WHERE email = ? AND user_identity = "Student"', [email]);
    if (!student) return res.status(404).json({ success: false, error: '找不到學生資料' });

    const tasks = await dbAll(`
      SELECT t.*, c.course_name, u.email as teacher_email
      FROM tasks t
      JOIN courses c ON t.course_id = c.id
      JOIN users u ON t.teacher_id = u.id
      JOIN student_courses sc ON c.id = sc.course_id
      WHERE sc.student_id = ?
    `, [student.id]);
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: '讀取任務失敗' });
  }
}

// ─── 學生提交任務回報 ─────────────────────────────────────────
async function submit_task(req, res) {
  try {
    const { student_email, task_id, submission_content } = req.body;
    if (!student_email || !task_id) return res.status(400).json({ success: false, error: '缺少必要資訊' });

    const student = await dbGet(`SELECT id FROM users WHERE email = ?`, [student_email]);
    if (!student) return res.status(404).json({ success: false, error: '找不到學生帳號' });

    // 若已有回報就 UPDATE，否則 INSERT
    const existing = await dbGet(
      `SELECT id FROM task_submissions WHERE student_id = ? AND task_id = ?`,
      [student.id, task_id]
    );

    if (existing) {
      await dbRun(
        `UPDATE task_submissions SET submission_content = ?, is_completed = 1 WHERE student_id = ? AND task_id = ?`,
        [submission_content, student.id, task_id]
      );
    } else {
      await dbRun(
        `INSERT INTO task_submissions (student_id, task_id, submission_content, is_completed) VALUES (?, ?, ?, 1)`,
        [student.id, task_id, submission_content]
      );
    }
    res.status(200).json({ success: true, message: '任務回報成功！' });
  } catch (err) {
    console.error('[submit_task] error:', err.message);
    res.status(500).json({ success: false, error: '提交失敗', details: err.message });
  }
}

// ─── 學生查看自己所有任務的回報狀態 ──────────────────────────────
async function get_my_submissions(req, res) {
  try {
    const { email } = req.query;
    const student = await dbGet(`SELECT id FROM users WHERE email = ?`, [email]);
    if (!student) return res.status(404).json({ success: false, error: '找不到學生帳號' });

    // 取得學生所有任務，並 LEFT JOIN 回報表確認有沒有繳交
    const tasks = await dbAll(`
      SELECT t.id as task_id, t.task_name, t.task_req, t.due_date,
             c.course_name,
             ts.submission_content, ts.is_completed
      FROM tasks t
      JOIN courses c ON t.course_id = c.id
      JOIN student_courses sc ON c.id = sc.course_id
      LEFT JOIN task_submissions ts ON ts.task_id = t.id AND ts.student_id = ?
      WHERE sc.student_id = ?
    `, [student.id, student.id]);

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: '讀取失敗', details: err.message });
  }
}

// ─── 老師查看自己指派的任務及每位學生的回報進度 ──────────────────
async function get_teacher_tasks(req, res) {
  try {
    const { email } = req.query;
    const teacher = await dbGet(`SELECT id FROM users WHERE email = ?`, [email]);
    if (!teacher) return res.status(404).json({ success: false, error: '找不到老師帳號' });

    // 取得老師所有任務
    const tasks = await dbAll(`
      SELECT t.*, c.course_name
      FROM tasks t
      JOIN courses c ON t.course_id = c.id
      WHERE t.teacher_id = ?
      ORDER BY t.id DESC
    `, [teacher.id]);

    // 對每個任務，取得選修該課程的學生及其回報狀態
    const result = await Promise.all(tasks.map(async (task) => {
      const submissions = await dbAll(`
        SELECT u.email as student_email,
               COALESCE(ts.submission_content, '') as submission_content,
               COALESCE(ts.is_completed, 0) as is_completed
        FROM student_courses sc
        JOIN users u ON sc.student_id = u.id
        LEFT JOIN task_submissions ts ON ts.student_id = sc.student_id AND ts.task_id = ?
        WHERE sc.course_id = ?
      `, [task.id, task.course_id]);

      return { ...task, submissions };
    }));

    res.status(200).json({ success: true, tasks: result });
  } catch (err) {
    console.error('[get_teacher_tasks] error:', err.message);
    res.status(500).json({ success: false, error: '讀取失敗', details: err.message });
  }
}

export { create_user, sign_in, sign_out, verify_token, create_course, create_task, get_courses, enroll_course, get_student_courses, get_student_tasks, submit_task, get_my_submissions, get_teacher_tasks };
