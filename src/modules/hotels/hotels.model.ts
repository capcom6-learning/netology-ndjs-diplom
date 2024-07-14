import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })
export class Hotel {
    @Prop({ unique: true })
    title: string;
    @Prop()
    description?: string;
}

@Schema({ timestamps: true })
export class HotelRoom {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Hotel.name, required: true })
    hotel: Hotel;
    @Prop()
    description?: string;
    @Prop({ default: [] })
    images: string[];
    @Prop({ default: true })
    isEnabled: boolean;
}

export const HotelModel = SchemaFactory.createForClass(Hotel);
export const HotelRoomModel = SchemaFactory.createForClass(HotelRoom);

export type HotelRoomDocument = mongoose.HydratedDocument<HotelRoom>;
