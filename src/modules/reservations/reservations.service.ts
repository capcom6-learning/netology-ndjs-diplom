import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/common/types';
import { CreateReservationDto, ReservationDto } from './reservations.dto';
import { IReservationService, RemoveReservationParams, SearchReservationParams } from './reservations.interface';
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
        await (await reservation.save()).populate(['room', 'hotel']);

        return ReservationDto.from(reservation);
    }

    async removeReservation(filter: RemoveReservationParams): Promise<void> {
        const reservation = await this.reservationModel.findById(filter.id);
        if (!reservation) {
            throw new BadRequestException('Reservation not found');
        }

        if (filter.userId && reservation.user.toString() !== filter.userId) {
            throw new BadRequestException('Reservation not found');
        }

        await this.reservationModel.findByIdAndDelete(filter.id);
    }

    async getReservations(filter: SearchReservationParams): Promise<ReservationDto[]> {
        const query: {
            user: ID;
            dateStart?: Date;
            dateEnd?: Date;
        } = {
            user: filter.userId,
        };

        filter.dateEnd && (query.dateEnd = filter.dateEnd);
        filter.dateStart && (query.dateStart = filter.dateStart);

        const reservations = await this.reservationModel
            .find(query)
            .populate(['room', 'hotel'])
            .exec();

        return reservations.map(reservation => ReservationDto.from(reservation));
    }
}
