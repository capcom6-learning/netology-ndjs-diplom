import { ID } from "src/common/types";

export interface CreateReservationDto {
    hotelRoom: ID,
    startDate: Date,
    endDate: Date,
}