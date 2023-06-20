import { INestApplicationContext, Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  Operation,
  OperationType,
} from '../../modules/operation/operation.entity';

const rows: Partial<Operation>[] = [
  {
    type: OperationType.ADDITION,
    cost: 1,
  },
  {
    type: OperationType.SUBTRACTION,
    cost: 1,
  },
  {
    type: OperationType.MULTIPLICATION,
    cost: 1,
  },
  {
    type: OperationType.DIVISION,
    cost: 1,
  },
  {
    type: OperationType.SQUARE_ROOT,
    cost: 1,
  },
  {
    type: OperationType.RANDOM_STRING,
    cost: 2,
  },
];

export const OperationSeedFactory = {
  seed: async (application: INestApplicationContext) => {
    const repository = application.get(getRepositoryToken(Operation));

    for (const row of rows) {
      const existing = await repository.findOne({ where: { type: row.type } });

      if (!existing) {
        await repository.save(repository.create(row));
        Logger.log('created', 'OperationSeedFactory');
      } else {
        Logger.log('already exists', 'OperationSeedFactory');
      }
    }
  },
};
