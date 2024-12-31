import React from "react";
import "./style.css";

const FriendCard = ({ friend, onSelect }) => (
  <div className="friend-card" onClick={() => onSelect(friend)}>
    <img
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      }}
      src={friend.profilePic}
      alt={`${friend.name} profile`}
      className="friend-profile-pic"
    />
    <div className="friend-info">
      <p style={{ fontWeight: "bold" }}>{friend.name}</p>
      <p>{friend.lastMessage}</p>
    </div>
    <div className="friend-info lastseen">
      <p
        style={{
          fontSize: 12,
          color: friend.status === "online" ? "green" : "grey",
        }}
      >
        {friend.status}
      </p>

      {/* <p>{friend.lastMessage}</p> */}
    </div>
  </div>
);

export default FriendCard;
