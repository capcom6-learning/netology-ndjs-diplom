import { ID } from "src/common/types";
import { CreateUserDto, UserDto } from "./users.dto";

export interface SearchUserParams {
    limit: number;
    offset: number;
    email?: string;
    name?: string;
    contactPhone?: string;
}

export interface IUserService {
    create(data: CreateUserDto): Promise<UserDto>;
    findById(id: ID): Promise<UserDto>;
    findByEmail(email: string): Promise<UserDto>;
    findAll(params: SearchUserParams): Promise<UserDto[]>;
}