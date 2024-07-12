import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { ReservationDto } from './reservations.dto';
import { IReservationService, SearchReservationParams } from './reservations.interface';
import { Reservation } from './reservations.model';

@Injectable()
export class ReservationsService implements IReservationService {
    constructor(
        @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
    ) { }

    async addReservation(data: ReservationDto): Promise<ReservationDto> {
        const existingReservation = await this.reservationModel.findOne({
            hotelId: data.hotelId,
            roomId: data.roomId,
            dateStart: { $lte: data.dateEnd },
            dateEnd: { $gte: data.dateStart },
        });

        if (existingReservation) {
            throw new Error('Reservation already exists');
        }

        const reservation = new this.reservationModel(data);
        await reservation.save();

        return new ReservationDto(reservation.toObject());
    }
    async removeReservation(id: ID): Promise<void> {
        await this.reservationModel.findByIdAndDelete(id);
    }
    async getReservations(filter: SearchReservationParams): Promise<ReservationDto[]> {
        const reservations = await this.reservationModel
            .find({
                userId: filter.userId,
                dateStart: { $lte: filter.dateEnd },
                dateEnd: { $gte: filter.dateStart },
            })
            .exec();

        return reservations.map(reservation => new ReservationDto(reservation.toObject()));
    }
}
