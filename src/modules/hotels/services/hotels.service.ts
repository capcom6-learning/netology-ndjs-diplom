import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateHotelDto, HotelDto, UpdateHotelDto } from '../hotels.dto';
import { IHotelService, SearchHotelParams } from '../hotels.interface';
import { Hotel } from '../hotels.model';

@Injectable()
export class HotelsService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
    ) { }

    async create(data: CreateHotelDto): Promise<HotelDto> {
        const hotel = new this.hotelModel(data);
        await hotel.save();
        return new HotelDto(hotel.toObject());
    }

    async findById(id: ID): Promise<HotelDto> {
        const hotel = await this.hotelModel.findById(id);
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        return new HotelDto(hotel.toObject());
    }

    async search(params: SearchHotelParams): Promise<HotelDto[]> {
        const hotels = await this.hotelModel
            .find({
                title: { $regex: new RegExp(params.title, 'i') },
            })
            .skip(params.offset)
            .limit(params.limit)
            .exec();

        return hotels.map(hotel => new HotelDto(hotel.toObject()));
    }

    async update(id: ID, data: UpdateHotelDto): Promise<HotelDto> {
        const hotel = await this.hotelModel.findByIdAndUpdate(id, data, { new: true });
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        return new HotelDto(hotel.toObject());
    }
}
