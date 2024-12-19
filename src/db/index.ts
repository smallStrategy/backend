import { DataSource } from 'typeorm';

// 데이터 소스 설정
export const Database = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // 개발 환경에서만 true (자동 마이그레이션)
  logging: false, // 쿼리 로그 활성화
  entities: ['./src/db/entities/*.ts'], // 엔티티 경로
});
