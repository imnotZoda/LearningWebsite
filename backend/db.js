// db.js
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const mysql = require('mysql2/promise');

const password = process.env.DB_PASSWORD;
if (!password) {
  throw new Error('DB_PASSWORD is required. Set it in backend/.env or the environment.');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password,
  database: process.env.DB_NAME || 'learn_schema',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;