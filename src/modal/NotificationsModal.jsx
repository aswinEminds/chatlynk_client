import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getFriendRequests as fetchRequests } from "../api/userApi";
import RequestNotificationCard from "../components/RequestNotificationCard";
import { Button } from "react-bootstrap";

function NotificationsModal({ show, onHide }) {
  const [requests, setRequest] = useState([]);

  const fetchData = async () => {
    const userDetails = localStorage.getItem("userDetails");
    const parsedUserDetails = JSON.parse(userDetails);
    const userId = parsedUserDetails.id;
    console.log(userId);
    console.log("lorem ipusm");
    const data = await fetchRequests(userId);
    setRequest(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notications ☺
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {requests.length > 0 ? (
          requests.map((user) => <RequestNotificationCard user={user} />)
        ) : (
          <p style={{ textAlign: "center", marginTop: "18px" }}>
            Oops! .. No users found ☹
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default NotificationsModal;
