import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Record } from '../record/record.entity';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Unique('uk_user_auth_uid', ['authUid'])
@Unique('uk_user_email', ['email'])
@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'auth_uid', type: 'varchar' })
  authUid: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  status: string;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
