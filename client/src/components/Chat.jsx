import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:8001", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const Chat = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatError, setChatError] = useState("");
  const [isUserSet, setIsUserSet] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setChatError("");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setChatError("Failed to connect to chat server");
    });

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/chat");
        if (response.data.success) {
          setChatMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setChatError("Failed to load chat history");
      }
    };

    fetchChatHistory();

    socket.on("receiveChatMessage", (message) => {
      setChatMessages((prev) => [...prev, message]);
    });

    socket.on("error", (data) => {
      setChatError(data.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("receiveChatMessage");
      socket.off("error");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setChatError("Name and email are required");
      return;
    }
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      setChatError("Email must end with @gmail.com");
      return;
    }
    setIsUserSet(true);
    setChatError("");
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setChatError("Message is required");
      return;
    }

    socket.emit("sendChatMessage", { name, email, message });
    setMessage("");
    setChatError("");
  };

  const cardVariants = {
    initial: { opacity: 0, y: -50, rotateX: -15, rotateY: 15 },
    animate: { opacity: 1, y: 0, rotateX: 0, rotateY: 0 },
    hover: { rotateX: 10, rotateY: -10, scale: 1.05, transition: { duration: 0.3 } },
  };

  const inputVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    focus: { scale: 1.02, boxShadow: "0 0 8px rgba(93, 215, 253, 0.5)", transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 via-indigo-200 to-pink-100 p-6">
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-md bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl shadow-2xl p-6 border border-purple-600 transform perspective-1000 animate-3d-card"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">WhatsApp Chat</h2>
        {!isUserSet ? (
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <motion.div
              variants={inputVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
            >
              <label className="block text-base font-semibold text-gray-800 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm"
              />
            </motion.div>
            <motion.div
              variants={inputVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
            >
              <label className="block text-base font-semibold text-gray-800 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Gmail address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm"
              />
            </motion.div>
            {chatError && (
              <p className="text-red-500 text-sm text-center">{chatError}</p>
            )}
            <motion.button
              type="submit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, backgroundColor: "#1e3a8a" }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition duration-300"
            >
              Join Chat
            </motion.button>
          </form>
        ) : (
          <>
            <div
              ref={chatContainerRef}
              className="h-64 overflow-y-auto mb-4 p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
            >
              {chatMessages.length === 0 && (
                <p className="text-sm text-gray-500 text-center">No messages yet</p>
              )}
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    msg.email === email ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.email === email
                        ? "bg-blue-100 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-xs font-semibold">
                      {msg.name}
                    </p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="space-y-4">
              <motion.div
                variants={inputVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm"
                />
              </motion.div>
              {chatError && (
                <p className="text-red-500 text-sm text-center">{chatError}</p>
              )}
              <motion.button
                type="submit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, backgroundColor: "#1e3a8a" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition duration-300"
              >
                Send
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Chat;