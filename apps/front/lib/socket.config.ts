// shared/socket.config.ts
import { io, Socket } from "socket.io-client";

export const SOCKET_URL = "http://localhost:8000"; // change to your backend URL

export const createSocket = (): Socket => {
  return io(SOCKET_URL, {
    transports: ["websocket"], // force WebSocket
    autoConnect: true,
  });
};
