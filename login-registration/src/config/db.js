
const {Pool} = require('pg');
const fs = require('fs');
const path = require('path')
require('dotenv').config();

const pool = new Pool (
    {
        connectionString: process.env.DATABASE_URL,
    }
);

pool.on('connect', () => console.log('Connected to PostgreSQL'));

const initDB = async () => {
    try {
        const sql = fs.readFileSync(
            path.join(__dirname,'init.sql'), 'utf8'
        )
        await pool.query(sql)
        console.log('Database initialized — USERS table created');
    }
    catch(err){
        if (err.code === '42P07') {
            console.log('Table already exists, skipping.');
        } else {
            console.error('Error initializing database:', err.message);
            throw err;
        }
    }
}

module.exports = pool;
module.exports.initDB =initDB;