import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketManager from "../../socket/socket.frontend";
import "./Home.css";
import Message from "../../components/MessageCard";
import FriendsList from "../../components/FriendsList";
import StartChat from "../../assets/start_chat.png";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const userId = JSON.parse(localStorage.getItem("userDetails")).id;

  // Get current chat user from Redux store
  const currentChatUser = useSelector((state) => state.chat.currentChatUser);

  const socket = socketManager.connect(userId);

  useEffect(() => {
    if (currentChatUser) {
      // Listen for messages from the server
      socket.on("receiveMessage", (message) => {
        console.log("Message received:", message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message.message, isSentByMe: false },
        ]);
      });

      // Cleanup on unmount
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, currentChatUser]);

  const onSendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit("message", inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, isSentByMe: true },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="home-container container-xxxl">
      <FriendsList />

      {/* Render chat area only if a user is selected */}
      {currentChatUser ? (
        <div className="right-chat">
          <div className="chat-header">
            <img
              src={currentChatUser.profilePic}
              alt="User profile"
              className="user-profile-pic"
            />
            <p className="user-name">{currentChatUser.name}</p>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <Message
                key={index}
                text={msg.text}
                isSentByUser={msg.isSentByMe}
              />
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type Message...."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button className="send-button" onClick={onSendMessage}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        // Show select user message in center if no chat user is selected
        <div className="no-chat-message">
          <img src={StartChat} alt="start Chating" />
          <h6>Select Friend to Start chating ...</h6>
        </div>
      )}
    </div>
  );
};

export default HomePage;
