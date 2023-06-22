import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { PermissionName } from 'nestjs-basic-acl-sdk';

import { RecordService } from './record.service';
import { OperateInput } from './dto/operate-input.dto';
import { GetUserRecordsInput } from './dto/get-user-records-input.dto';
import { GetOneRecordInput } from './dto/get-one-record-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @PermissionName('records:operate')
  @Version('1')
  @Post('operation')
  operate(@Body() input: OperateInput) {
    return this.recordService.operate(input);
  }

  @PermissionName('records:getUserRecords')
  @Version('1')
  @Get()
  getUserRecords(@Query() input: GetUserRecordsInput) {
    return this.recordService.getUserRecords(input);
  }

  @PermissionName('records:delete')
  @Version('1')
  @Delete()
  delete(@Query() input: GetOneRecordInput) {
    return this.recordService.delete(input);
  }
}
