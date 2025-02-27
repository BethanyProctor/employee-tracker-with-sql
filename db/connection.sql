require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: 'employee_db'
    }
)