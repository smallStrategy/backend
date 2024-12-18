import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg'; 

// PostgreSQL 연결 설정
const pool = new Pool({
  user: process.env.DB_USER,      // .env에 정의된 DB 사용자
  host: process.env.DB_HOST,      // .env에 정의된 DB 호스트
  database: process.env.DB_NAME,  // .env에 정의된 DB 이름
  password: process.env.DB_PASSWORD, // .env에 정의된 DB 비밀번호
  port: parseInt(process.env.DB_PORT || '5432', 10),  // .env에 정의된 DB 포트
});

// 연결 테스트
pool.connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

export default pool;
