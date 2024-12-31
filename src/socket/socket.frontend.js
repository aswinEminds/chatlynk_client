import { io } from "socket.io-client";

class SocketManager {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    if (!this.socket) {
      this.socket = io(`http://localhost:7878/?userId=${userId}`);
      console.log("Socket connected");
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected");
      this.socket = null;
    }
  }

  getSocket() {
    if (!this.socket) {
      console.warn("Socket is not connected. Call connect() first.");
    }
    return this.socket;
  }
}

const socketManager = new SocketManager();
export default socketManager;
