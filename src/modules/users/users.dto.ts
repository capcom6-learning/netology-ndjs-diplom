import { Role } from "./users.model";

export class SafeUserDto {
    email: string;
    name: string;
    contactPhone?: string;
    role: Role;
}

export class CreateUserDto extends SafeUserDto {
    password: string;
}

export class UserDto extends SafeUserDto {
    passwordHash: string;
}