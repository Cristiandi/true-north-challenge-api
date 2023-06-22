import { IsUUID } from 'class-validator';

export class GetOneRecordInput {
  @IsUUID()
  readonly uid: string;
}
