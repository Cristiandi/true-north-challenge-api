import * as path from 'path';

import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../../config/app.config';

import { Operation, OperationType } from './operation.entity';

import { OperationService } from './operation.service';
import { RandomOrgService } from '../../plugins/random-org/random-org.service';

import { CalculateOperationInput } from './dto/calculate-operation-input.dto';

const envPath = path.resolve(__dirname, '../../../.env');

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({});

type MockRandomOrgService = Partial<Record<keyof RandomOrgService, jest.Mock>>;
const createMockRandomOrgService = (): MockRandomOrgService => ({});

describe('OperationService', () => {
  let service: OperationService;
  let randomOrgService: MockRandomOrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [appConfig],
          envFilePath: envPath,
        }),
      ],
      providers: [
        OperationService,
        {
          provide: getRepositoryToken(Operation),
          useValue: createMockRepository(),
        },
        {
          provide: RandomOrgService,
          useValue: createMockRandomOrgService(),
        },
      ],
    }).compile();

    service = module.get<OperationService>(OperationService);
    randomOrgService = module.get<MockRandomOrgService>(RandomOrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculate', () => {
    it('should return the result of the addition', async () => {
      const input: CalculateOperationInput = {
        type: OperationType.ADDITION,
        a: 1,
        b: 2,
      };

      const result = await service.calculate(input);

      expect(result).toEqual({
        result: 3,
      });
    });

    it('should return the result of the subtraction', async () => {
      const input: CalculateOperationInput = {
        type: OperationType.SUBTRACTION,
        a: 1,
        b: 2,
      };

      const result = await service.calculate(input);

      expect(result).toEqual({
        result: -1,
      });
    });

    it('should return the result of the multiplication', async () => {
      const input: CalculateOperationInput = {
        type: OperationType.MULTIPLICATION,
        a: 1,
        b: 2,
      };

      const result = await service.calculate(input);

      expect(result).toEqual({
        result: 2,
      });
    });

    it('should return the result of the division', async () => {
      const input: CalculateOperationInput = {
        type: OperationType.DIVISION,
        a: 2,
        b: 2,
      };

      const result = await service.calculate(input);

      expect(result).toEqual({
        result: 1,
      });
    });

    it('should return the result of the square root', async () => {
      const input: CalculateOperationInput = {
        type: OperationType.SQUARE_ROOT,
        a: 16,
      };

      const result = await service.calculate(input);

      expect(result).toEqual({
        result: 4,
      });
    });

    it('should return the result of the random string', async () => {
      const input: CalculateOperationInput = {
        type: OperationType.RANDOM_STRING,
      };

      randomOrgService.getRandomString = jest
        .fn()
        .mockResolvedValue('random-string');

      const result = await service.calculate(input);

      expect(result).toEqual({
        result: 'random-string',
      });
    });
  });
});
