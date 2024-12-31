import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUserCircle } from "react-icons/fa"; // Optional, for a fallback icon

function UserProfile({ show, handleClose, user }) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>User Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="profile-container">
          {/* Profile Picture */}
          <div className="profile-pic-container">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.name}
                style={{ width: 50, height: 50 }}
                className="profile-pic"
              />
            ) : (
              <FaUserCircle className="default-profile-pic" />
            )}
          </div>
          {/* Profile Info */}
          <div className="profile-info">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default UserProfile;
