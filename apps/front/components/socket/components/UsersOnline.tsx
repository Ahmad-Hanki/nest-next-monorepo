"use client";

import { createSocket } from "@/lib/socket.config";
import { useEffect, useState } from "react";

export default function UsersOnline() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = createSocket();

    // Listen to the 'usersOnline' event from backend
    newSocket.on("usersOnline", (users: string[]) => {
      setUsers(users);
    });

    newSocket.emit("joinPresence", {
      name: "User_" + Math.floor(Math.random() * 1000),
    });

    return () => {
      newSocket.disconnect(); // cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h2>Users Online: {users.length}</h2>
      <ul>
        {users.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
}
