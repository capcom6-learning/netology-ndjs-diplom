import { Role, User, UserDocument } from "./users.model";

export class UserDto {
    email: string;
    name: string;
    contactPhone?: string;
    role: Role;

    constructor(data: Partial<UserDto>) {
        this.email = data.email;
        this.name = data.name;
        this.contactPhone = data.contactPhone;
        this.role = data.role;
    }

    static from(data: UserDocument): UserDto {
        return new UserDto(data.toObject({ getters: true }));
    }
}

export class CreateUserDto extends UserDto {
    password: string;
}
