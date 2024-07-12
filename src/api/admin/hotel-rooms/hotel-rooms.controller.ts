import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HotelRoomsService } from 'src/modules/hotels/services';
import { CreateHotelRoomRequest } from './hotel-rooms.dto';

@Controller('admin/hotel-rooms')
export class HotelRoomsController {
    constructor(
        private readonly hotelRoomsService: HotelRoomsService,
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('images', null, { limits: { fileSize: 5 * 1024 * 1024 } }))
    create(
        @Body() data: CreateHotelRoomRequest,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image',
                })
                .build()
        ) images: Express.Multer.File[]
    ) {
        console.log(data);
        console.log(images);
    }
}
