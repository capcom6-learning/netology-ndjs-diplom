import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateHotelDto, HotelDto, UpdateHotelDto } from '../hotels.dto';
import { IHotelService, SearchHotelParams } from '../hotels.interface';
import { Hotel, HotelRoom } from '../hotels.model';

@Injectable()
export class HotelsService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
    ) { }

    async create(data: CreateHotelDto): Promise<HotelDto> {
        const hotel = new this.hotelModel(data);
        await hotel.save();
        return HotelDto.from(hotel);
    }

    async findById(id: ID): Promise<HotelDto> {
        const hotel = await this.hotelModel.findById(id);
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        return HotelDto.from(hotel);
    }

    async search(params: SearchHotelParams): Promise<HotelDto[]> {
        const query: {
            title?: string | { $regex: RegExp };
        } = {};
        if (params.title) {
            query.title = { $regex: new RegExp(params.title, 'i') };
        }

        const hotels = await this.hotelModel
            .find(query)
            .skip(params.offset)
            .limit(params.limit)
            .exec();

        return hotels.map(hotel => HotelDto.from(hotel));
    }

    async update(id: ID, data: UpdateHotelDto): Promise<HotelDto> {
        const hotel = await this.hotelModel.findByIdAndUpdate(id, data, { new: true });
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        return HotelDto.from(hotel);
    }
}
