import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PresenceService } from './presence.service';

@WebSocketGateway()
export class PresenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly presenceService: PresenceService) {}

  handleConnection(client: any) {
    this.presenceService.addUser(client.id);
    this.server.emit('usersOnline', this.presenceService.getUsers());
  }

  handleUserName(client: any) {
    client.on('sendUserName', (data: { name: string }) => {
      console.log('Username received from', client.id, data.name);

      // store username
      this.presenceService.addUserName(client.id, data.name);

      // send all usernames back to all clients
      const allNames = this.presenceService.getAllUserNames();
      this.server.emit('allUserNames', allNames);
    });
  }

  handleDisconnect(client: any) {
    this.presenceService.removeUser(client.id);
    this.server.emit('usersOnline', this.presenceService.getUsers());
  }
}
