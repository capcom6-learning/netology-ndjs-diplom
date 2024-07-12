export interface CreateHotelRequest {
    title: string;
    description?: string;
}

export interface UpdateHotelRequest extends Partial<CreateHotelRequest> { };