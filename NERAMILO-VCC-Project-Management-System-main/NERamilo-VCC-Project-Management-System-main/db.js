import pg from 'pg';
import dotenv from 'dotenv'; 
dotenv.config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
}
const proConfig = {
    connectionString: process.env.DATABASE_URL,
}
const pool = new pg.Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

export default pool;