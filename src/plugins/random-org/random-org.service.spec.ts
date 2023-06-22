import { Test, TestingModule } from '@nestjs/testing';
import { RandomOrgService } from './random-org.service';

describe('RandomOrgService', () => {
  let service: RandomOrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomOrgService],
    }).compile();

    service = module.get<RandomOrgService>(RandomOrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
