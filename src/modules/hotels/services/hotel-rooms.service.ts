import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateHotelRoomDto, HotelRoomDto, UpdateHotelRoomDto } from '../hotels.dto';
import { IHotelRoomService, SearchRoomsParams } from '../hotels.interface';
import { HotelRoom } from '../hotels.model';

@Injectable()
export class HotelRoomsService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoom>,
    ) { }

    async create(data: CreateHotelRoomDto): Promise<HotelRoomDto> {
        const room = new this.hotelRoomModel(data);
        await room.save();

        return new HotelRoomDto(room.toObject());
    }

    async findById(id: ID): Promise<HotelRoomDto> {
        const room = await this.hotelRoomModel.findById(id);
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        return new HotelRoomDto(room.toObject());
    }

    async search(params: SearchRoomsParams): Promise<HotelRoomDto[]> {
        const rooms = await this.hotelRoomModel
            .find({ hotel: params.hotel, isEnabled: params.isEnabled })
            .skip(params.offset)
            .limit(params.limit);

        return rooms.map((room) => new HotelRoomDto(room.toObject()));
    }

    async update(id: ID, data: UpdateHotelRoomDto): Promise<HotelRoomDto> {
        const room = await this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true });
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        return new HotelRoomDto(room.toObject());
    }
}
