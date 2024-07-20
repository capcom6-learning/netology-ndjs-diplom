import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateReservationDto, ReservationDto } from './reservations.dto';
import { IReservationService, SearchReservationParams } from './reservations.interface';
import { Reservation } from './reservations.model';
import { HotelRoomsService } from '../hotels/services';

@Injectable()
export class ReservationsService implements IReservationService {
    constructor(
        @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
        private readonly hotelRoomsService: HotelRoomsService,
    ) { }

    async addReservation(data: CreateReservationDto): Promise<ReservationDto> {
        const room = await this.hotelRoomsService.findById(data.roomId);
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        if (!room.isEnabled) {
            throw new BadRequestException('Room is not available');
        }

        const existingReservation = await this.reservationModel.findOne({
            hotel: room.hotel.id,
            room: data.roomId,
            dateStart: { $lte: data.dateEnd },
            dateEnd: { $gte: data.dateStart },
        });

        if (existingReservation) {
            throw new BadRequestException('Reservation already exists');
        }

        const reservation = new this.reservationModel({
            ...data,
            user: data.userId,
            room: room.id,
            hotel: room.hotel.id,
        });
        (await reservation.save()).populate('hotel room');

        return ReservationDto.from(reservation);
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

        return reservations.map(reservation => ReservationDto.from(reservation));
    }
}
