import { ID } from "src/common/types";
import { HotelRoom, HotelRoomDocument } from "./hotels.model";
import mongoose from "mongoose";

export class HotelDto {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(hotel: HotelDto) {
        this.id = hotel.id;
        this.title = hotel.title;
        this.description = hotel.description;
        this.createdAt = hotel.createdAt;
        this.updatedAt = hotel.updatedAt;
    }
}

export type CreateHotelDto = Omit<HotelDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateHotelDto = Partial<CreateHotelDto>;

export class HotelRoomDto {
    id: string;
    hotelId: ID;
    description?: string;
    images: string[];
    isEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(hotelRoom: HotelRoomDto) {
        this.id = hotelRoom.id;
        this.hotelId = hotelRoom.hotelId;
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
                hotelId: hotelRoomModel.hotel.toString(),
            },
        );
    }
}


export type CreateHotelRoomDto = Omit<HotelRoomDto, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateHotelRoomDto = Partial<CreateHotelRoomDto>;
