import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';

import { UserService } from './user.service';

import { RegisterUserInput } from './dto/register-user-input.dto';
import { Public } from 'nestjs-basic-acl-sdk';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Version('1')
  @Post('registration')
  register(@Body() input: RegisterUserInput) {
    return this.userService.register(input);
  }
}
