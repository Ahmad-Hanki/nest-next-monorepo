import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private onlineUsers = new Set<string>(); // array we push user ids to track online users and remove when they disconnect
  private userNames = new Map<string, string>(); // socket.id => username

  addUser(id: string) {
    this.onlineUsers.add(id);
  }

  removeUser(id: string) {
    this.onlineUsers.delete(id);
  }

  addUserName(id: string, name: string) {
    this.userNames.set(id, name);
  }

  getUsers() {
    return Array.from(this.onlineUsers);
  }

  getAllUserNames() {
    return Array.from(this.userNames.values());
  }
}
