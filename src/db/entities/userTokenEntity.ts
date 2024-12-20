import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './userEntity';

export interface UserTokenModel {
  id: number;
  userId: number; // ( userEntity.ts 에서 id )
  token: string; // 토큰
  expires_at: Date; // 만료일 시간
}

@Entity('user_tokens')
export class UserTokenEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  // 사용자 테이블과의 관계 설정
  @ManyToOne(() => UserEntity, (user) => user.userToken)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'varchar', length: 255 })
  token!: string;

  @Column({ type: 'timestamp' })
  expires_at!: Date;
}