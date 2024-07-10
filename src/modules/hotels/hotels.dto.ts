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

export type CreateHotelDto = Omit<HotelDto, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateHotelDto = Partial<CreateHotelDto>

export class HotelRoomDto {
    id: string;
    description?: string;
    images: string[];
    isEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(hotelRoom: HotelRoomDto) {
        this.id = hotelRoom.id;
        this.description = hotelRoom.description;
        this.images = hotelRoom.images;
        this.isEnabled = hotelRoom.isEnabled;
        this.createdAt = hotelRoom.createdAt;
        this.updatedAt = hotelRoom.updatedAt;
    }
}


export type CreateHotelRoomDto = Omit<HotelRoomDto, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateHotelRoomDto = Partial<CreateHotelRoomDto>