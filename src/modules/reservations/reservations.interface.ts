import { ID } from "src/common/types";
import { ReservationDto } from "./reservations.dto";

export interface SearchReservationParams {
    userId: ID;
    dateStart: Date;
    dateEnd: Date;
}

export interface IReservationService {
    addReservation(data: ReservationDto): Promise<ReservationDto>;
    removeReservation(id: ID): Promise<void>;
    getReservations(filter: SearchReservationParams): Promise<ReservationDto[]>;
}