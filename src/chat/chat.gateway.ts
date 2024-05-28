import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from './dtos/add-message.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('message')
  handleMessage(client: Socket, addMessageDto: AddMessageDto): void {
    console.log(addMessageDto);
    // Обработка полученного сообщения и отправка его обратно всем клиентам
    const message = `${addMessageDto.nickname}: ${addMessageDto.text}`;
    console.log(message);
    this.server.emit('message', addMessageDto);
  }

  // переделать ответ в дто если есть возможность парсить json на стороне unity
  // хранить рекорд в реддис чтобы быстро получать рекорд юзера и отправлять его вместе с сообщением
}
