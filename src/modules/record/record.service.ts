import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import appConfig from '../../config/app.config';

import { Record } from './record.entity';

import { BaseService } from '../../base.service';
import { OperationService } from '../operation/operation.service';
import { UserService } from '../user/user.service';

import { OperateInput } from './dto/operate-input.dto';
import { GetUserRecordsInput } from './dto/get-user-records-input.dto';
import { GetOneRecordInput } from './dto/get-one-record-input.dto';

@Injectable()
export class RecordService extends BaseService<Record> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly operationService: OperationService,
    private readonly userService: UserService,
  ) {
    super(recordRepository);
  }

  async operate(input: OperateInput) {
    const { userAuthUid, operation, a, b } = input;

    // get the user and operation
    const [existingUser, existingOperation] = await Promise.all([
      this.userService.getOneByFields({
        fields: {
          authUid: userAuthUid,
        },
        checkIfExists: true,
        loadRelationIds: false,
      }),
      this.operationService.getOneByFields({
        fields: {
          type: operation,
        },
        checkIfExists: true,
        loadRelationIds: false,
      }),
    ]);

    // check if the user has enough balance
    if (existingUser.balance < existingOperation.cost) {
      throw new ConflictException('user does not have enough balance');
    }

    // create the record
    const createdRecord = this.recordRepository.create({
      user: existingUser,
      operation: existingOperation,
      userBalance: existingUser.balance - existingOperation.cost,
      operationResponse: await this.operationService.calculate({
        type: operation,
        a,
        b,
      }),
    });

    const [, savedRecord] = await Promise.all([
      // update the user balance
      this.userService.update(
        {
          authUid: userAuthUid,
        },
        {
          balance: existingUser.balance - existingOperation.cost,
        },
      ),
      // save the record
      this.recordRepository.save(createdRecord),
    ]);

    return savedRecord;
  }

  async getUserRecords(input: GetUserRecordsInput) {
    const {
      userAuthUid,
      q,
      take = '10',
      skip = '0',
      orderBy = 'id',
      order = 'ASC',
    } = input;

    const existingUser = await this.userService.getOneByFields({
      fields: {
        authUid: userAuthUid,
      },
      checkIfExists: true,
      loadRelationIds: false,
    });

    const query = this.recordRepository
      .createQueryBuilder('record')
      .innerJoin('record.operation', 'operation')
      .where('record.user = :userId', { userId: existingUser.id });

    if (q) {
      query.andWhere('operation.type LIKE :q', {
        q: `%${q}%`,
      });
    }

    query
      .take(+take)
      .skip(+skip)
      .orderBy('record.' + orderBy, order);

    const [records, count] = await query.getManyAndCount();

    return {
      count,
      data: records,
    };
  }

  async delete(input: GetOneRecordInput) {
    const { uid } = input;

    const existingRecord = await this.getOneByFields({
      fields: {
        uid,
      },
      checkIfExists: true,
      loadRelationIds: false,
    });

    const deletedRecord = await this.recordRepository.softRemove(
      existingRecord,
    );

    return deletedRecord;
  }
}
