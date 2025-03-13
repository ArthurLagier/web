/*const mysql = require('mysql2/promise');

const pool= mysql.createPool({
    host: ProgressEvent.env.DB_HOST,
    user: ProgressEvent.env.DB_USER,
    password: ProgressEvent.env.DB.PASSWORD,
    database: ProgressEvent.env.DB_DATABASE,
    connectionLimit: 30,
})


export default pool;*/
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;