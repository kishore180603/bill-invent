import pg from 'pg';
const { Pool } = pg;
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const pool = new Pool({
  user: process.env.DB_USER , // Default to 'postgres' if not set
  host: process.env.DB_HOST ,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT, // Ensure port is a number
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
