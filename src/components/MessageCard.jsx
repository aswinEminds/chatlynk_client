import React from "react";
import "./style.css";

const Message = ({ text, timestamp, isSentByUser }) => (
  <div className={`message ${isSentByUser ? "sent" : "received"}`}>
    <div
      className={`single-message p-2 ${
        isSentByUser ? "message-sent" : "message-received"
      }`}
    >
      <p className="m-0">{text}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  </div>
);

export default Message;
