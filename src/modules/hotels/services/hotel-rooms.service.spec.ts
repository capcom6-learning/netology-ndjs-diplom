import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoom } from '../hotels.model';
import { HotelRoomsService } from './hotel-rooms.service';

describe('HotelRoomsService', () => {
  let service: HotelRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelRoomsService,
        {
          provide: getModelToken(HotelRoom.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<HotelRoomsService>(HotelRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
