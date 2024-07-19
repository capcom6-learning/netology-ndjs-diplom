import { Body, Controller, Param, ParseFilePipeBuilder, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { HotelRoomsService } from 'src/modules/hotels/services';
import { CreateHotelRoomRequest, UpdateHotelRoomRequest } from './hotel-rooms.dto';
import { CreateHotelRoomDto, UpdateHotelRoomDto } from 'src/modules/hotels/hotels.dto';
import { ParseObjectIdPipe } from 'src/api/pipes/parse-objectid.pipe';
import { ID } from 'src/common/types';
import { Roles } from 'src/api/auth/roles.decorator';
import { RolesGuard } from 'src/api/auth/roles.guard';

@Controller('admin/hotel-rooms')
@Roles('admin')
@UseGuards(RolesGuard)
export class HotelRoomsController {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService,
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('images', null, { limits: { fileSize: 5 * 1024 * 1024 } }))
    async create(
        @Body() data: CreateHotelRoomRequest,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image',
                })
                .build()
        ) images: Express.Multer.File[]
    ) {
        const hotelRoom: CreateHotelRoomDto = {
            ...data,
            images: images.map((image) => image.filename),
            isEnabled: true,
        };

        return await this.hotelRoomsService.create(hotelRoom);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('images', null, { limits: { fileSize: 5 * 1024 * 1024 } }))
    async update(
        @Param('id', ParseObjectIdPipe) id: ID,
        @Body() data: UpdateHotelRoomRequest,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image',
                })
                .build()
        ) images: Express.Multer.File[]
    ) {
        const oldImages = [];
        if (data.images) {
            if (Array.isArray(data.images)) {
                oldImages.push(...data.images);
            } else {
                oldImages.push(data.images);
            }
        }

        const hotelRoom: UpdateHotelRoomDto = {
            ...data,
            images: [
                ...images.map((image) => image.filename),
                ...oldImages
            ],
        };

        return await this.hotelRoomsService.update(id, hotelRoom);
    }
}
