import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import appConfig from '../../config/app.config';

import { Operation, OperationType } from './operation.entity';

import { BaseService } from '../../base.service';
import { RandomOrgService } from '../../plugins/random-org/random-org.service';

import { CalculateOperationInput } from './dto/calculate-operation-input.dto';

@Injectable()
export class OperationService extends BaseService<Operation> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Operation)
    private readonly userRepository: Repository<Operation>,
    private readonly randomOrgService: RandomOrgService,
  ) {
    super(userRepository);
  }

  public async calculate(input: CalculateOperationInput) {
    const { type, a, b } = input;

    switch (type) {
      case OperationType.ADDITION:
        return {
          result: a + b,
        };
        break;
      case OperationType.SUBTRACTION:
        return {
          result: a - b,
        };
        break;
      case OperationType.MULTIPLICATION:
        return {
          result: a * b,
        };
        break;
      case OperationType.DIVISION:
        return {
          result: a / b,
        };
        break;
      case OperationType.SQUARE_ROOT:
        return {
          result: Math.sqrt(a),
        };
        break;
      case OperationType.RANDOM_STRING:
        const randomString = await this.randomOrgService.getRandomString();

        return {
          result: randomString,
        };
        break;

      default:
        break;
    }
  }
}
