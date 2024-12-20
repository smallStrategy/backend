import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

import { UserTokenEntity } from './userTokenEntity';

export interface UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  bio: string;
  profile: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  username!: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bio!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile!: string;

  // 권한 ( 0: 일반 사용자, 1: 관리자 )
  @Column({ type: 'int2', default: 0 })
  role!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // 사용자 로그인 기록 토큰을 저장하는 테이블과의 관계 설정
  @OneToOne(() => UserTokenEntity, (userToken) => userToken.user)
  @JoinColumn()
  userToken?: UserTokenEntity;
}

