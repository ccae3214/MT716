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


export {  };