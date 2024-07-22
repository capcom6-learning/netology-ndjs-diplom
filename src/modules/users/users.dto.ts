import { ID } from "src/common/types";
import { Role, User, UserDocument } from "./users.model";

export class UserDto {
    id: ID;
    email: string;
    name: string;
    contactPhone?: string;
    role: Role;

    constructor(data: Partial<UserDto>) {
        this.id = data.id.toString();
        this.email = data.email;
        this.name = data.name;
        this.contactPhone = data.contactPhone;
        this.role = data.role;
    }

    static from(data: UserDocument): UserDto {
        return new UserDto(data.toObject({ getters: true }));
    }
}

export type CreateUserDto = Omit<UserDto, 'id'> & { password: string }
