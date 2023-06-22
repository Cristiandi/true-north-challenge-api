import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import appConfig from '../../config/app.config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class RandomOrgService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly httpService: HttpService,
  ) {}

  async getRandomString() {
    const {
      randomOrg: { url },
    } = this.appConfiguration;

    const observable = this.httpService
      .get<string>(url + 'strings', {
        params: {
          num: 1,
          len: 15,
          digits: 'on',
          upperalpha: 'on',
          loweralpha: 'on',
          unique: 'on',
          format: 'plain',
          rnd: 'new',
        },
      })
      .pipe(timeout(10000));

    const { data } = await firstValueFrom(observable);

    return data.trim();
  }
}
