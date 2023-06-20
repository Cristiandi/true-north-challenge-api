import { OperationType } from '../operation.entity';

export class CalculateOperationInput {
  readonly type: OperationType;

  readonly a?: number;

  readonly b?: number;
}
