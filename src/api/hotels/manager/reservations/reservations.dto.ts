import { ID } from "src/common/types";

export interface CreateReservationRequest {
    hotelRoom: ID,
    startDate: Date,
    endDate: Date,
}

export class ReservationResponse {
    id: ID;
    startDate: Date;
    endDate: Date;
    hotelRoom: {
        id: ID
        description: string
        images: string[]
    };
    hotel: {
        id: ID
        title: string
        description?: string
    };
}