import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequest } from '../chats.model';
import { SupportRequestsClientService } from './support-requests-client.service';

describe('SupportRequestsClientService', () => {
  let service: SupportRequestsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportRequestsClientService,
        {
          provide: getModelToken(SupportRequest.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SupportRequestsClientService>(SupportRequestsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
