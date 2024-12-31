import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { sentFriendRequest } from "../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socketManager from "../socket/socket.frontend";
import { useDispatch } from "react-redux"; // Import dispatch from react-redux
import { setCurrentChatUser } from "../redux/actions/chatActions"; // Import the action

const FriendRequestCard = ({ user, onHide }) => {
  const [isSending, setIsSending] = useState(false);
  const [requestStatus, setRequestStatus] = useState(user.friendRequest.status);
  const socket = socketManager.getSocket();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleSendRequest = async () => {
    setIsSending(true);

    const userDetails = localStorage.getItem("userDetails");
    const parsedUserDetails = JSON.parse(userDetails);
    const userId = parsedUserDetails.id;

    try {
      const result = await sentFriendRequest(userId, user._id);
      if (result) {
        setRequestStatus("pending");
      }
    } catch (e) {
      console.error("Error sending friend request:", e);
      toast.error("Error sent friend request");
    } finally {
      setIsSending(false); // Reset sending state
    }
  };

  async function startChat() {
    socket.emit("joinRoom", user._id);

    // Dispatch the action to set the current chat user in Redux
    dispatch(setCurrentChatUser(user));

    onHide(); // Hide the modal or component
  }

  const renderButton = () => {
    if (requestStatus === "pending") {
      return (
        <Button disabled>
          <p>Cancel</p>
        </Button>
      );
    } else if (requestStatus === "accepted") {
      return (
        <Button onClick={startChat}>
          <p>Start Chatting</p>
          <i className="fa-regular fa-comments"></i>
        </Button>
      );
    } else {
      return (
        <Button
          onClick={handleSendRequest}
          variant="primary"
          disabled={isSending}
        >
          <p>{isSending ? "Sending..." : "Send Request"}</p>
          <i className="fa-regular fa-paper-plane"></i>
        </Button>
      );
    }
  };

  return (
    <div className="friend-request-card">
      <div className="profile-name">
        <img
          src={user.profilePic}
          alt={`${user.name}'s avatar`}
          className="avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div className="text">
          <h6 className="mb-0">{user.name}</h6>
          <p className="text-muted" style={{ fontSize: 12 }}>
            {user.email}
          </p>
        </div>
      </div>
      <div>{renderButton()}</div>
    </div>
  );
};

export default FriendRequestCard;
