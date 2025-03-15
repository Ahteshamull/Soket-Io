import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Store multiple messages

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("msg", handleMessage);

    return () => {
      socket.off("msg", handleMessage); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex text-center justify-center">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type Something"
        value={message}
      />
      <div className="bg-white min-h-[200px] flex items-center justify-center">
        <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Hover me
        </button>
      </div>
      <button onClick={() => socket.emit("msg", message)}>Submit</button>

      {messages.map((msg, index) => (
        <h2 key={index}>{msg}</h2>
      ))}
    </div>
  );
}
