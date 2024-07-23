import { PipeTransform, Injectable, BadRequestException, Optional } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
    constructor(
        @Optional() private readonly context: 'http' | 'ws' = 'http',
    ) { }

    /**
     * Validates the given value as a MongoDB ObjectId.
     *
     * @param {string} value - The string value to be validated.
     * @return {string} The validated MongoDB ObjectId.
     * @throws {BadRequestException} If the value is not a valid MongoDB ObjectId.
     */
    transform(value: string): string {
        if (!isValidObjectId(value)) {
            if (this.context === 'ws') {
                throw new WsException('Invalid MongoDB ObjectId');
            }
            throw new BadRequestException('Invalid MongoDB ObjectId');
        }
        return value;
    }
}
