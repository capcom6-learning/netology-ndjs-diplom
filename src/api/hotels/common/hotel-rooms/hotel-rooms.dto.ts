import { ID } from "src/common/types";
import { HotelRoomDto } from "src/modules/hotels/hotels.dto";

export class HotelRoomResponse {
    id: ID
    description: string
    images: string[]
    hotel: {
        id: ID
        title: string
        description?: string
    }

    constructor(data: Partial<HotelRoomResponse>) {
        this.id = data.id;
        this.description = data.description;
        this.images = data.images;
        this.hotel = {
            id: data.hotel.id,
            title: data.hotel.title,
            description: data.hotel.description,
        };
    }

    static from(data: HotelRoomDto): HotelRoomResponse {
        return new HotelRoomResponse(data);
    }
}