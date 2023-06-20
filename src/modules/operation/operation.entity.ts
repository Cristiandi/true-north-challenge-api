import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Record } from '../record/record.entity';

export enum OperationType {
  ADDITION = 'addition',
  SUBTRACTION = 'subtraction',
  MULTIPLICATION = 'multiplication',
  DIVISION = 'division',
  SQUARE_ROOT = 'square_root',
  RANDOM_STRING = 'random_string',
}

@Unique('uk_operation_uid', ['uid'])
@Unique('uk_operation_type', ['type'])
@Entity({ name: 'operation' })
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ type: 'varchar' })
  uid: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'int' })
  cost: number;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
