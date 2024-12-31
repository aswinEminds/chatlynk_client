// Action types
export const SET_CURRENT_CHAT_USER = "SET_CURRENT_CHAT_USER";
export const RESET_CURRENT_CHAT_USER = "RESET_CURRENT_CHAT_USER";

// Action creators
export const setCurrentChatUser = (user) => {
  return {
    type: SET_CURRENT_CHAT_USER,
    payload: user,
  };
};

export const resetCurrentChatUser = () => {
  return {
    type: RESET_CURRENT_CHAT_USER,
  };
};
