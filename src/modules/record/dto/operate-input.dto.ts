import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { OperationType } from '../../operation/operation.entity';

const OPERATIONS_REQUIRING_AT_LEAST_ONE_NUMBER = [
  OperationType.ADDITION,
  OperationType.SUBTRACTION,
  OperationType.MULTIPLICATION,
  OperationType.DIVISION,
  OperationType.SQUARE_ROOT,
];

const OPERATIONS_REQUIRING_AT_LEAST_TWO_NUMBERS = [
  OperationType.ADDITION,
  OperationType.SUBTRACTION,
  OperationType.MULTIPLICATION,
  OperationType.DIVISION,
];

export class OperateInput {
  @IsString()
  readonly userAuthUid: string;

  @IsEnum(OperationType, {
    message: `operation must be one of ${Object.values(OperationType)
      .map((term) => `'${term}'`)
      .join(', ')}`,
  })
  readonly operation: OperationType;

  @ValidateIf((o) =>
    OPERATIONS_REQUIRING_AT_LEAST_ONE_NUMBER.includes(o.operation),
  )
  @IsNumber()
  readonly a?: number;

  @ValidateIf((o) =>
    OPERATIONS_REQUIRING_AT_LEAST_TWO_NUMBERS.includes(o.operation),
  )
  @IsNumber()
  readonly b?: number;
}
