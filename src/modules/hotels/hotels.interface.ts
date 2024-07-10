import { ID } from "src/common/types";
import { CreateHotelDto, CreateHotelRoomDto, HotelDto, HotelRoomDto, UpdateHotelDto, UpdateHotelRoomDto } from "./hotels.dto";

export interface SearchHotelParams {
    limit: number;
    offset: number;
    title: string;
}

export interface IHotelService {
    create(data: CreateHotelDto): Promise<HotelDto>;
    findById(id: ID): Promise<HotelDto>;
    search(params: SearchHotelParams): Promise<HotelDto[]>;
    update(id: ID, data: UpdateHotelDto): Promise<HotelDto>;
}

export interface SearchRoomsParams {
    limit: number;
    offset: number;
    hotel: ID;
    isEnabled?: boolean;
}

export interface IHotelRoomService {
    create(data: CreateHotelRoomDto): Promise<HotelRoomDto>;
    findById(id: ID): Promise<HotelRoomDto>;
    search(params: SearchRoomsParams): Promise<HotelRoomDto[]>;
    update(id: ID, data: UpdateHotelRoomDto): Promise<HotelRoomDto>;
}