import * as path from 'path';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { Record as RecordEntity } from './record.entity';

import { RecordService } from './record.service';
import { OperationService } from '../operation/operation.service';
import { UserService } from '../user/user.service';

import { OperateInput } from './dto/operate-input.dto';
import { GetUserRecordsInput } from './dto/get-user-records-input.dto';
import { GetOneRecordInput } from './dto/get-one-record-input.dto';
import { OperationType } from '../operation/operation.entity';
import { ConflictException } from '@nestjs/common';

const envPath = path.resolve(__dirname, '../../../.env');

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({});

type MockOperationService = Partial<Record<keyof OperationService, jest.Mock>>;
const createMockOperationService = (): MockOperationService => ({});

type MockUserService = Partial<Record<keyof UserService, jest.Mock>>;
const createMockUserService = (): MockUserService => ({});

describe('RecordService', () => {
  let service: RecordService;
  let recordRepository: MockRepository<RecordEntity>;
  let operationService: MockOperationService;
  let userService: MockUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [appConfig],
          envFilePath: envPath,
        }),
      ],
      providers: [
        RecordService,
        {
          provide: getRepositoryToken(RecordEntity),
          useValue: createMockRepository(),
        },
        {
          provide: OperationService,
          useValue: createMockOperationService(),
        },
        {
          provide: UserService,
          useValue: createMockUserService(),
        },
      ],
    }).compile();

    service = module.get<RecordService>(RecordService);
    recordRepository = module.get<MockRepository>(
      getRepositoryToken(RecordEntity),
    );
    operationService = module.get<MockOperationService>(OperationService);
    userService = module.get<MockOperationService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('operate', () => {
    it('should calculate and return a record', async () => {
      const input: OperateInput = {
        userAuthUid: 'user-auth-uid',
        operation: OperationType.ADDITION,
        a: 1,
        b: 2,
      };

      userService.getOneByFields = jest.fn().mockResolvedValue({ balance: 10 });
      operationService.getOneByFields = jest
        .fn()
        .mockResolvedValue({ cost: 1 });
      operationService.calculate = jest.fn();
      recordRepository.create = jest.fn();
      userService.update = jest.fn();
      recordRepository.save = jest.fn().mockResolvedValue({});

      const result = await service.operate(input);

      expect(result).toEqual({});
    });

    it('should throw ConflictException due to insufficient balance', async () => {
      const input: OperateInput = {
        userAuthUid: 'user-auth-uid',
        operation: OperationType.ADDITION,
        a: 1,
        b: 2,
      };

      userService.getOneByFields = jest.fn().mockResolvedValue({ balance: 0 });
      operationService.getOneByFields = jest
        .fn()
        .mockResolvedValue({ cost: 1 });

      try {
        await service.operate(input);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual('user does not have enough balance');
      }
    });
  });

  describe('getUserRecords', () => {
    it('should return an array of records', async () => {
      const input: GetUserRecordsInput = {
        userAuthUid: 'user-auth-uid',
      };

      userService.getOneByFields = jest.fn().mockResolvedValue({});

      recordRepository.createQueryBuilder = jest.fn(() => {
        return {
          innerJoin: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          getManyAndCount: jest.fn().mockResolvedValue([[{}], 1]),
        };
      });

      const result = await service.getUserRecords(input);

      expect(result).toEqual({
        count: 1,
        data: [{}],
      });
    });
  });

  describe('delete', () => {
    it('it should delete a record', async () => {
      const input: GetOneRecordInput = {
        uid: 'record-uid',
      };

      service.getOneByFields = jest.fn().mockResolvedValue({});
      recordRepository.softRemove = jest.fn().mockResolvedValue({});

      const result = await service.delete(input);

      expect(result).toEqual({});
    });
  });
});
