import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequest } from '../chats.model';
import { SupportRequestsEmployeeService } from './support-requests-employee.service';


describe('SupportRequestsEmployeeService', () => {
  let service: SupportRequestsEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportRequestsEmployeeService,
        {
          provide: getModelToken(SupportRequest.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SupportRequestsEmployeeService>(SupportRequestsEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
