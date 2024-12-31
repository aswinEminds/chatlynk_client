import Modal from "react-bootstrap/Modal";
import FriendRequestCard from "../components/FriendRequestCard";
import { useEffect, useState } from "react";
import { getUsers as fetchUsers } from "../api/userApi";

function SearchUserModal({ show, onHide }) {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = localStorage.getItem("userDetails");
      const parsedUserDetails = JSON.parse(userDetails);
      const userId = parsedUserDetails.id;
      const data = await fetchUsers(searchText, userId);
      console.log(data);
      setUsers(data);
    };
    if (searchText) {
      fetchData();
    } else {
      setUsers([]);
    }
  }, [searchText]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Friends , Make connections ☺
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-sm">
          <div className="user-search-box">
            <input
              placeholder="Search friends..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {users.length > 0 ? (
            users.map((user) => (
              <FriendRequestCard
                key={user.id}
                user={user}
                onHide={onHide}
                onSendRequest={() => {}}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "18px" }}>
              Oops! .. No users found ☹
            </p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SearchUserModal;
