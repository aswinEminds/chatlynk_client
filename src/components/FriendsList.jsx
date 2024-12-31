import React, { useEffect, useState } from "react";
import FriendCard from "./FriendsCard";
import SearchUserModal from "../modal/SearchUsersModal";
import { Offcanvas } from "react-bootstrap";
import NotificationsModal from "../modal/NotificationsModal";
import UserProfile from "./UserProfile";
import socketManager from "../socket/socket.frontend";
import { data } from "react-router-dom";

const FriendsList = () => {
  const [showSearchModal, setSearchModal] = useState(false);
  const [showNotificationModal, setNotificationModal] = useState(false);
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const socket = socketManager.getSocket();

  // Handle the offcanvas visibility
  const handleOffcanvasClose = () => setOffcanvasShow(false);
  const handleOffcanvasShow = () => setOffcanvasShow(true);
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePic: "https://www.w3schools.com/w3images/avatar2.png", // Replace this with a valid profile picture URL or leave as null
  };

  const getFriendsList = async () => {
    socket.on("getFriendsList", (data) => {
      setFriendsData(data);
    });
  };

  useEffect(() => {});

  return (
    <div className="left-sidebar">
      <div className="profile-card">
        <h5>ChatLynk</h5>
        <div>
          <i
            onClick={() => {
              setSearchModal(true);
              console.log("Clicked");
            }}
            className="fa-solid fa-user-plus"
            style={{
              marginRight: 12,
              cursor: "pointer",
              padding: 8,
              fontSize: 15,
            }}
          ></i>
          <i
            onClick={() => {
              setNotificationModal(true);
              console.log("Clicked");
            }}
            className="fa-solid fa-bell"
            style={{
              marginRight: 12,
              cursor: "pointer",
              padding: 8,
            }}
          ></i>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={handleOffcanvasShow} // Trigger the Offcanvas
            style={{ cursor: "pointer", padding: 8 }}
          ></i>
        </div>
      </div>
      <div className="friends-list">
        {friendsData.map((friend) => (
          <FriendCard key={friend.id} friend={friend} onSelect={() => {}} />
        ))}
      </div>

      {/* --------------------------------------- */}
      <SearchUserModal
        show={showSearchModal}
        onHide={() => setSearchModal(false)}
      />
      {/* -------------------------------------- */}
      <NotificationsModal
        show={showNotificationModal}
        onHide={() => setNotificationModal(false)}
      />
      {/* -------------------------------------- */}
      <UserProfile
        show={offcanvasShow}
        handleClose={handleOffcanvasClose}
        user={user}
      />
    </div>
  );
};

export default FriendsList;
