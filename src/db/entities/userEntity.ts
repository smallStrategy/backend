import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // 데이터베이스 테이블 이름
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // 기본 키

  @Column({ type: 'varchar', length: 100 })
  name!: string; // 사용자 이름

  @Column({ type: 'varchar', length: 200, unique: true })
  email!: string; // 이메일 (유니크)

  @Column({ type: 'varchar', length: 255 })
  password!: string; // 비밀번호

  @CreateDateColumn()
  createdAt!: Date; // 생성일자 (자동 생성)

  @UpdateDateColumn()
  updatedAt!: Date; // 수정일자 (자동 업데이트)
}
