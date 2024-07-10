import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Hotel } from '../hotels.model';
import { HotelsService } from './hotels.service';

describe('HotelsService', () => {
  let service: HotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsService,
        {
          provide: getModelToken(Hotel.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
