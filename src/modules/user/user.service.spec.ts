import * as path from 'path';

import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BasicAclService } from 'nestjs-basic-acl-sdk';

import appConfig from '../../config/app.config';

import { User } from './user.entity';

import { UserService } from './user.service';

import { RegisterUserInput } from './dto/register-user-input.dto';
import { GetOneUserInput } from './dto/get-one-user-input.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { ConflictException } from '@nestjs/common';

const envPath = path.resolve(__dirname, '../../../.env');

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({});

type MockBasicAclService = Partial<Record<keyof BasicAclService, jest.Mock>>;
const createMockBasicAclService = (): MockBasicAclService => ({});

describe('OperationService1', () => {
  let service: UserService;
  let userRepository: MockRepository<User>;
  let basicAclService: MockBasicAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [appConfig],
          envFilePath: envPath,
        }),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: BasicAclService,
          useValue: createMockBasicAclService(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    basicAclService = module.get<MockBasicAclService>(BasicAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should return the created user', async () => {
      const input: RegisterUserInput = {
        email: 'test@test.com',
        password: 'test',
      };

      userRepository.findOne = jest.fn().mockResolvedValue(undefined);
      basicAclService.createUser = jest.fn().mockResolvedValue({});
      userRepository.create = jest.fn().mockReturnValue({});
      userRepository.save = jest.fn().mockResolvedValue({});

      const result = await service.register(input);

      expect(result).toEqual({});
    });

    it('should throw a ConflictException if the user already exists', async () => {
      const input: RegisterUserInput = {
        email: 'test@test.com',
        password: 'test',
      };

      userRepository.findOne = jest.fn().mockResolvedValue({});

      try {
        await service.register(input);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw an error if fails while saving the user', async () => {
      const input: RegisterUserInput = {
        email: 'test@test.com',
        password: 'test',
      };

      userRepository.findOne = jest.fn().mockResolvedValue(undefined);
      basicAclService.createUser = jest.fn().mockResolvedValue({});
      userRepository.create = jest.fn().mockReturnValue({});
      userRepository.save = jest.fn().mockRejectedValue(new Error());
      basicAclService.deleteUser = jest.fn().mockResolvedValue({});

      try {
        await service.register(input);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const getOneUserInput: GetOneUserInput = {
        authUid: 'test',
      };
      const input: UpdateUserInput = {
        email: 'changed@test.com',
      };

      service.getOneByFields = jest.fn().mockResolvedValue({});
      basicAclService.changeEmail = jest.fn().mockResolvedValue({});
      userRepository.preload = jest.fn().mockReturnValue({});
      userRepository.save = jest.fn().mockResolvedValue({});

      const result = await service.update(getOneUserInput, input);

      expect(result).toEqual({});
    });
  });
});
