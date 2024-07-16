import { ID } from "src/common/types";

export class ReservationDto {
    userId: ID;
    // hotelId: ID;
    roomId: ID;
    dateStart: Date;
    dateEnd: Date;

    constructor(reservation: ReservationDto) {
        this.userId = reservation.userId;
        // this.hotelId = reservation.hotelId;
        this.roomId = reservation.roomId;
        this.dateStart = reservation.dateStart;
        this.dateEnd = reservation.dateEnd;
    }
}