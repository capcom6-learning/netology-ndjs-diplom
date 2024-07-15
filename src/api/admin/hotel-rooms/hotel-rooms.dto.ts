export class CreateHotelRoomRequest {
    description?: string;
    hotelId: string;
}

export class UpdateHotelRoomRequest {
    description?: string;
    hotelId: string;
    isEnabled?: boolean;
    images?: string[];
}