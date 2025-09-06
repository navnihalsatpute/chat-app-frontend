import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://chat-app-backend-ljlg.onrender.com");

const Chat = ({ username, toggleDarkMode, darkMode }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const messagesEndRef = useRef(null);
  const hasSetUsername = useRef(false); // Prevent multiple emits

  useEffect(() => {
    socket.on("chat_message", (data) => {
      // Show only relevant messages
      if (!data.to || data.to === username || data.username === username) {
        setMessages((prev) => [...prev, data]);
      }
    });

    socket.on("update_user_list", (users) => {
      setOnlineUsers(users.filter(user => user !== username)); // Exclude self
    });

    return () => {
      socket.off("chat_message");
      socket.off("update_user_list");
    };
  }, [username]);

  useEffect(() => {
    // Emit only once
    if (username && !hasSetUsername.current) {
      socket.emit("set_username", username);
      hasSetUsername.current = true;
    }
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const data = { message, username, to: selectedUser || null };
      socket.emit("send_message", data);
      setMessage("");
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 flex flex-col space-y-4 h-[80vh]`}>
        
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-center">Chat App</h2>
          <button
            onClick={toggleDarkMode}
            className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex space-x-4 flex-1 overflow-hidden">
          {/* Online Users */}
          <div className={`w-1/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 border border-gray-200 rounded overflow-y-auto`}>
            <h3 className="font-semibold mb-2">Online Users</h3>
            <ul className="space-y-1">
              {onlineUsers.map((user, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedUser(user)}
                  className={`cursor-pointer ${selectedUser === user ? 'font-bold text-blue-400' : ''}`}
                >
                  {user}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedUser("")}
              className="mt-2 text-sm underline text-blue-500"
            >
              Public Chat
            </button>
          </div>

          {/* Chat Messages */}
          <div className={`flex-1 overflow-y-auto max-h-[60vh] p-4 border border-gray-200 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex flex-col space-y-2`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded max-w-[75%] ${
                  msg.username === "System"
                    ? "text-gray-400 italic text-sm self-center"
                    : msg.username === username
                      ? "bg-blue-600 text-white self-end text-right"
                      : `${darkMode ? 'bg-gray-600' : 'bg-gray-200'} self-start text-left`
                }`}
              >
                {msg.username !== "System" && (
                  <span className="font-semibold">
                    {msg.username}{msg.to ? " (Private)" : ""}:{" "}
                  </span>
                )}
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Box */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${selectedUser ? `(Private to ${selectedUser})` : "Public Chat"}`}
            className={`flex-1 border border-gray-300 rounded px-3 py-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
