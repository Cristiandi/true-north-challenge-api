import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetUserRecordsInput {
  @IsString()
  readonly userAuthUid: string;

  @IsOptional()
  @IsString()
  readonly q?: string;

  @IsOptional()
  @IsNumberString()
  readonly take?: string;

  @IsOptional()
  @IsNumberString()
  readonly skip?: string;

  @IsOptional()
  @IsString()
  readonly orderBy?: string;

  @IsOptional()
  @IsEnum(Order, {
    message: `order must be one of ${Object.values(Order)
      .map((item) => `'${item}'`)
      .join(', ')}`,
  })
  readonly order?: 'ASC' | 'DESC';
}
