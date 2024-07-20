import { ID } from "src/common/types";
import { CreateReservationDto, ReservationDto } from "./reservations.dto";

export interface SearchReservationParams {
    userId: ID;
    dateStart?: Date;
    dateEnd?: Date;
}

export interface RemoveReservationParams {
    id: ID;
    userId?: ID;
}

export interface IReservationService {
    addReservation(data: CreateReservationDto): Promise<ReservationDto>;
    removeReservation(filter: RemoveReservationParams): Promise<void>;
    getReservations(filter: SearchReservationParams): Promise<ReservationDto[]>;
}