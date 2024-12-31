import { Button } from "react-bootstrap";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { updateFriendRequest } from "../api/userApi";

const RequestNotificationCard = ({ user }) => {
  const [status, setStatus] = useState(user.status);

  const updateStatus = async (newStatus) => {
    try {
      const updatedRequest = await updateFriendRequest(user._id, newStatus);
      setStatus(updatedRequest.status);
    } catch (error) {
      console.error("Failed to update status:", error.message);
    }
  };

  return (
    <div className="friend-request-card">
      <div className="profile-name">
        <img
          src={user.receiver.profilePic}
          alt={`${user.receiver.name}'s avatar`}
          className="avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div className="text">
          <h6 className="mb-0">{user.receiver.name}</h6>
          <p className="text-muted" style={{ fontSize: 12 }}>
            {user.receiver.email}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {status === "pending" ? (
          <>
            <Button onClick={() => updateStatus("accepted")} variant="success">
              Accept
            </Button>
            <Button onClick={() => updateStatus("canceled")} variant="danger">
              Discard
            </Button>
          </>
        ) : (
          <span>
            {status === "accepted"
              ? "Request Accepted ✅"
              : "Request Discarded ❌"}
          </span>
        )}
      </div>
    </div>
  );
};

export default RequestNotificationCard;
