import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserInput {
  @IsEmail()
  readonly email: string;

  @Length(6)
  @IsString()
  readonly password: string;
}
