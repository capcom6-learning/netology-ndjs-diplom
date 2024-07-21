import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../users/users.model";
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class SupportRequest {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: User;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Message", required: true })
    messages: Message[];

    @Prop({ required: true, default: true })
    isActive: boolean;
}

@Schema({ timestamps: { createdAt: 'sentAt' } })
export class Message {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    author: User;

    @Prop({ required: true })
    text: string;

    @Prop()
    readAt?: Date;
}

export const SupportRequestModel = SchemaFactory.createForClass(SupportRequest);
export const MessageModel = SchemaFactory.createForClass(Message);

export type SupportRequestDocument = mongoose.HydratedDocument<SupportRequest>;
export type MessageDocument = mongoose.HydratedDocument<Message>;