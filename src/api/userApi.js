import { axiosInstance } from "../interceptors/AxiosInterceptor";

export const getUsers = async (searchText, userId) => {
  try {
    const result = await axiosInstance.get("api/users/getusers", {
      params: {
        searchText,
        userId,
      },
    });
    if (result.data) {
      return result.data;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error fetching users:", e);
    return { error: "Failed to fetch users. Please try again later." };
  }
};

export const sentFriendRequest = async (senderId, receiverId) => {
  try {
    const result = await axiosInstance.post("/api/users/sendfriendrequest", {
      senderId,
      receiverId,
    });
    if (result.status === 201) {
      console.log("Friend request sent successfully", result.data);
      return result.data;
    } else {
      console.error("Failed to send friend request", result);
      throw new Error("Failed to send friend request");
    }
  } catch (e) {
    console.error("Error sending friend request:", e);
    throw e;
  }
};

export const getFriendRequests = async (userId) => {
  try {
    const result = await axiosInstance.get("/api/users/getfriendrequests", {
      params: { userId },
    });
    if (result.data) {
      return result.data.friendRequests;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error fetching friend requests:", e);
    return []; // Return an empty array in case of error
  }
};

export const updateFriendRequest = async (docId, status) => {
  try {
    const results = await axiosInstance.post("/api/users/updatefriendrequest", {
      docId,
      status,
    });

    if (results.data && results.data.friendRequest) {
      return results.data.friendRequest;
    } else {
      throw new Error("Unexpected response format from server.");
    }
  } catch (error) {
    console.error("Error updating friend request:", error.message || error);
    throw new Error("Failed to update friend request. Please try again later.");
  }
};
