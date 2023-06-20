import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Repository } from 'typeorm';

import appConfig from '../../config/app.config';
import { BasicAclService } from 'nestjs-basic-acl-sdk';

import { User, UserStatus } from './user.entity';

import { BaseService } from '../../base.service';

import { RegisterUserInput } from './dto/register-user-input.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly basicAclService: BasicAclService,
  ) {
    super(userRepository);
  }

  async register(input: RegisterUserInput) {
    const { email, password } = input;

    // check if user already exists by email
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('user already exists');
    }

    // create user in the ACL system
    const aclUser = await this.basicAclService.createUser({
      email,
      password,
      roleCode: this.appConfiguration.acl.roles.customerCode,
      sendEmail: false,
    });

    // create user in the database
    try {
      const { authUid } = aclUser;

      const createdUser = this.userRepository.create({
        authUid,
        email,
        status: UserStatus.ACTIVE,
      });

      const savedUser = await this.userRepository.save(createdUser);

      return savedUser;
    } catch (error) {
      Logger.warn('deleting the user in ACL', UserService.name);

      // delete the user in the ACL system if the user creation in the database fails
      await this.basicAclService.deleteUser({
        authUid: aclUser.authUid,
      });
    }
  }
}
