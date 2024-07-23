import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestsGateway } from './support-requests.gateway';

describe('SupportRequestsGateway', () => {
  let gateway: SupportRequestsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportRequestsGateway],
    }).compile();

    gateway = module.get<SupportRequestsGateway>(SupportRequestsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
