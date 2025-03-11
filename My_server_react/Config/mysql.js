const mysql = require('mysql2/promise');

const pool= mysql.createPool({
    host: ProgressEvent.env.DB_HOST,
    user: ProgressEvent.env.DB_USER,
    password: ProgressEvent.env.DB.PASSWORD,
    database: ProgressEvent.env.DB_DATABASE,
    connectionLimit: 30,
})


export default pool;