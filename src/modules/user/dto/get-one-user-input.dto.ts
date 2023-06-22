import { IsString } from 'class-validator';

export class GetOneUserInput {
  @IsString()
  readonly authUid: string;
}
