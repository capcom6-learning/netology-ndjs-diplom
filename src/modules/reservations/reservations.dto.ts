import { ID } from "src/common/types";
import { ReservationDocument } from "./reservations.model";

export class ReservationDto {
    id: ID;
    hotelRoom: {
        description?: string;
        images: string[];
    };
    hotel: {
        title: string;
        description?: string;
    };
    dateStart: Date;
    dateEnd: Date;

    constructor(reservation: ReservationDto) {
        this.id = reservation.id;
        this.dateStart = reservation.dateStart;
        this.dateEnd = reservation.dateEnd;

        this.hotelRoom = {
            description: reservation.hotelRoom.description,
            images: reservation.hotelRoom.images
        };

        this.hotel = {
            title: reservation.hotel.title,
            description: reservation.hotel.description
        };
    }

    static from(reservation: ReservationDocument): ReservationDto {
        const { room, hotel, ...rest } = reservation.toObject({ getters: true });

        return new ReservationDto({
            ...rest,
            id: reservation.id,
            hotelRoom: room,
            hotel: hotel
        });
    }
}

export type CreateReservationDto = Omit<ReservationDto, 'id' | 'hotel' | 'hotelRoom'> & {
    userId: ID,
    roomId: ID
};
