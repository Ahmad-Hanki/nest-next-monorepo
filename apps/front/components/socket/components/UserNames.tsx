"use client";

import { useEffect, useState } from "react";
import { createSocket } from "@/lib/socket.config";

export default function UserNames() {
  const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    const socket = createSocket();

    // Send your username to backend
    socket.emit("sendUserName", { name: "Ahmad" });

    // Listen for all usernames
    socket.on("allUserNames", (names: string[]) => {
      setUserNames(names);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>All Users:</h2>
      <ul>
        {userNames.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
