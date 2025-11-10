// shared/socket.config.ts
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export const socketIoOptions: Partial<ServerOptions> = {
  cors: {
    origin: '*', // adjust this to your frontend URL in production
    methods: ['GET', 'POST'],
  },
  // other socket.io options if needed
};

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: Partial<ServerOptions>) {
    const mergedOptions = { ...socketIoOptions, ...options };
    return super.createIOServer(port, mergedOptions);
  }
}
