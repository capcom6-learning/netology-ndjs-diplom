import { Role } from "./users.model";

export class SafeUserDto {
    email: string;
    name: string;
    contactPhone?: string;
    role: Role;

    constructor(data: Partial<SafeUserDto>) {
        Object.assign(this, data);
    }
}

export class CreateUserDto extends SafeUserDto {
    password: string;
}

export class UserDto extends SafeUserDto {
    passwordHash: string;

    constructor(data: Partial<UserDto>) {
        super(data);
        Object.assign(this, data);
    }
}