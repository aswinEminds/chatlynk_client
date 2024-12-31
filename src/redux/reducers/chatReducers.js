import {
  SET_CURRENT_CHAT_USER,
  RESET_CURRENT_CHAT_USER,
} from "../actions/chatActions";

// Initial state
const initialState = {
  currentChatUser: null,
};

// Reducer function
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.payload,
      };
    case RESET_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: null,
      };
    default:
      return state;
  }
};

export default chatReducer;
