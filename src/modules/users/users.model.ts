import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type Role = 'client' | 'admin' | 'manager';

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true })
    email: string;
    @Prop()
    passwordHash: string;
    @Prop()
    name: string;
    @Prop()
    contactPhone?: string;
    @Prop({ default: 'client' })
    role: Role;
}

export type UserDocument = HydratedDocument<User>;

export const UserModel = SchemaFactory.createForClass(User);