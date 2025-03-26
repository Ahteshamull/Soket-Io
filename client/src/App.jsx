import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("msg", handleMessage);

    return () => {
      socket.off("msg", handleMessage);
    };
  }, []);

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      socket.emit("msg", message);
      setMessage("");
    }
  };

  const handleEdit = (index) => {
    const newMessage = prompt("Edit your message:", messages[index]);
    if (newMessage !== null && newMessage.trim() !== "") {
      const updatedMessages = [...messages];
      updatedMessages[index] = newMessage;
      setMessages(updatedMessages);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      {/* Input & Button */}
      <div className="flex items-center justify-center gap-3">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type Something..."
          value={message}
          className="px-4 w-[300px] h-[40px] py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleMessageSend}
          className="px-6 py-2 font-medium cursor-pointer bg-indigo-500 rounded-md text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
        >
          Send
        </button>
      </div>

      {/* Message Display */}
      <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-lg min-h-[200px] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Messages:</h2>
        <div className="space-y-2">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-md text-gray-700 flex justify-between items-center"
              >
                <span>{msg}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}
