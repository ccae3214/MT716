const {
    Pool,
    Client
} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student',
    password: 'postgres',
    port: 5432,
});


module.export = { pool }