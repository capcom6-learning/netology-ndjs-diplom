import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequest } from '../chats.model';
import { SupportRequestsService } from './support-requests.service';

describe('SupportRequestsService', () => {
  let service: SupportRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportRequestsService,
        {
          provide: getModelToken(SupportRequest.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SupportRequestsService>(SupportRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
