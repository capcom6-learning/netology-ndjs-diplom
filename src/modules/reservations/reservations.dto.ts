import { ID } from "src/common/types";
import { ReservationDocument } from "./reservations.model";

export class ReservationDto {
    id: ID;
    userId: ID;
    roomId: ID;
    dateStart: Date;
    dateEnd: Date;

    constructor(reservation: ReservationDto) {
        this.id = reservation.id;
        this.userId = reservation.userId;
        this.roomId = reservation.roomId;
        this.dateStart = reservation.dateStart;
        this.dateEnd = reservation.dateEnd;
    }

    static from(reservation: ReservationDocument): ReservationDto {
        return new ReservationDto(reservation.toObject({ getters: true }));
    }
}

export type CreateReservationDto = Omit<ReservationDto, 'id'>;
