import { Role } from "src/modules/users/users.model";

export class CreateUserRequest {
    email: string;
    password: string;
    name: string;
    contactPhone: string;
    role: Role;
}
