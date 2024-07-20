import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Hotel, HotelRoom } from "../hotels/hotels.model";
import { User } from "../users/users.model";

@Schema({ timestamps: true })
export class Reservation {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Hotel.name, required: true })
    hotel: Hotel;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: HotelRoom.name, required: true })
    room: HotelRoom;
    @Prop({ required: true })
    dateStart: Date;
    @Prop({ required: true })
    dateEnd: Date;
}

export const ReservationModel = SchemaFactory.createForClass(Reservation);
export type ReservationDocument = mongoose.HydratedDocument<Reservation>;