import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto, SupportRequestDto } from 'src/modules/chats/chats.dto';
import { SupportRequestsService } from 'src/modules/chats/services';
import { UserDto } from 'src/modules/users/users.dto';
import { User } from '../decorators/user.decorator';
import { ParseObjectIdPipe } from '../pipes/parse-objectid.pipe';

@WebSocketGateway({ namespace: 'support-requests' })
export class SupportRequestsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly supportRequestsService: SupportRequestsService
  ) { }

  @SubscribeMessage('subscribeToChat')
  async handleMessage(
    @User() user: UserDto,
    @ConnectedSocket() client: Socket,
    @MessageBody('chatId', new ParseObjectIdPipe('ws')) chatId: string
  ) {
    if (user.role === 'client') {
      const request = await this.supportRequestsService.findSupportRequests({ user: user.id });
      if (!request.some(request => request.id === chatId)) {
        throw new WsException('Chat not found');
      }
    }

    const unsubscribe = this.supportRequestsService.subscribe(
      (supportRequest: SupportRequestDto, message: MessageDto) => {
        client.emit(`message:${supportRequest.id}`, message);
      }
    );

    client.on('disconnect', () => {
      unsubscribe();
    });

    return {
      event: 'subscribeToChat',
      data: {
        chatId: chatId.toString(),
        result: 'success'
      }
    };
  }
}
