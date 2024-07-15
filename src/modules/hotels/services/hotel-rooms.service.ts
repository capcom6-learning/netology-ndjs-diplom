import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateHotelRoomDto, HotelRoomDto, UpdateHotelRoomDto } from '../hotels.dto';
import { IHotelRoomService, SearchRoomsParams } from '../hotels.interface';
import { HotelRoom } from '../hotels.model';
import { HotelsService } from './hotels.service';

@Injectable()
export class HotelRoomsService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoom>,
        private readonly hotelsService: HotelsService,
    ) { }

    async create(data: CreateHotelRoomDto): Promise<HotelRoomDto> {
        const hotel = await this.hotelsService.findById(data.hotelId);
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        const room = new this.hotelRoomModel({ ...data, hotel: hotel.id });
        await (await room.save()).populate('hotel');

        return HotelRoomDto.from(room);
    }

    async findById(id: ID): Promise<HotelRoomDto> {
        const room = await this.hotelRoomModel.findById(id).populate('hotel');
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        return HotelRoomDto.from(room);
    }

    async search(params: SearchRoomsParams): Promise<HotelRoomDto[]> {
        const query: {
            hotel?: ID;
            isEnabled?: boolean;
        } = {};
        if (params.hotel) {
            query.hotel = params.hotel;
        }
        if (params.isEnabled !== undefined) {
            query.isEnabled = params.isEnabled;
        }

        const rooms = await this.hotelRoomModel
            .find(query)
            .populate('hotel')
            .skip(params.offset)
            .limit(params.limit);

        return rooms.map((room) => HotelRoomDto.from(room));
    }

    async update(id: ID, data: UpdateHotelRoomDto): Promise<HotelRoomDto> {
        const room = await this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true });
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        return HotelRoomDto.from(room);
    }
}
