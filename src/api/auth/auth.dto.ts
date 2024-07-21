import { ID } from "src/common/types";
import { UserDto } from "src/modules/users/users.dto";
import { Role } from "src/modules/users/users.model";

export class RegisterDto {
    email: string;
    password: string;
    name: string;
    contactPhone: string;
}

export class UserResponse {
    id: ID;
    email: string;
    name: string;
    contactPhone: string;
    role: Role;

    constructor(data: Partial<UserResponse>) {
        this.id = data.id;
        this.email = data.email;
        this.name = data.name;
        this.contactPhone = data.contactPhone;
        this.role = data.role;
    }

    static from(data: UserDto): UserResponse {
        return new UserResponse(data);
    }
}