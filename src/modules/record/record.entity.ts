import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Operation } from '../operation/operation.entity';

@Unique('uk_record_uid', ['uid'])
@Entity({ name: 'record' })
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ type: 'varchar' })
  uid: string;

  @Column({ name: 'user_balance', type: 'int' })
  userBalance: number;

  @Column({ name: 'operation_response', type: 'json' })
  operationResponse: {
    cost: number;
    result: number | string;
  };

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Operation, (operation) => operation.records)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;
}
