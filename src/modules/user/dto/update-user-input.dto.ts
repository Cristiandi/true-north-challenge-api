import { IsEmail, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsNumber()
  readonly balance?: number;
}
