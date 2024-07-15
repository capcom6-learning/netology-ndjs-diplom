import { ID } from "src/common/types";
import { HotelDocument, HotelRoom, HotelRoomDocument } from "./hotels.model";
import mongoose from "mongoose";

export class HotelDto {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;

    protected constructor(hotel: HotelDto) {
        this.id = hotel.id;
        this.title = hotel.title;
        this.description = hotel.description;
        this.createdAt = hotel.createdAt;
        this.updatedAt = hotel.updatedAt;
    }

    static from(hotelModel: HotelDocument) {
        return new HotelDto(
            {
                ...hotelModel.toObject({ getters: true }),
            },
        );
    }
}

export type CreateHotelDto = Omit<HotelDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateHotelDto = Partial<CreateHotelDto>;

export class HotelRoomDto {
    id: string;
    hotel: HotelDto;
    description?: string;
    images: string[];
    isEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;

    protected constructor(hotelRoom: HotelRoomDto) {
        this.id = hotelRoom.id;
        this.hotel = hotelRoom.hotel;
        this.description = hotelRoom.description;
        this.images = hotelRoom.images;
        this.isEnabled = hotelRoom.isEnabled;
        this.createdAt = hotelRoom.createdAt;
        this.updatedAt = hotelRoom.updatedAt;
    }

    static from(hotelRoomModel: HotelRoomDocument) {
        console.log(hotelRoomModel.hotel.toString());
        return new HotelRoomDto(
            {
                ...hotelRoomModel.toObject({ getters: true }),
                hotel: HotelDto.from(hotelRoomModel.hotel),
            },
        );
    }
}


export type CreateHotelRoomDto = Omit<HotelRoomDto, 'id' | 'hotel' | 'createdAt' | 'updatedAt'> & {
    hotelId: ID
};

export type UpdateHotelRoomDto = Partial<CreateHotelRoomDto>;
