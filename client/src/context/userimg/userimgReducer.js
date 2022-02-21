import {
  GET_USERIMGS,
  ADD_USERIMG,
  DELETE_USERIMG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USERIMG,
  FILTER_USERIMGS,
  CLEAR_FILTER,
  USERIMG_ERROR,
  CLEAR_USERIMGS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERIMGS:
      return {
        ...state,
        userimgs: action.payload,
        loading: false,
      };
    case ADD_USERIMG:
      return {
        ...state,
        userimgs: [action.payload, ...state.userimgs],
        loading: false,
      };
    case UPDATE_USERIMG:
      return {
        ...state,
        userimgs: state.userimgs.map((userimg) =>
          userimg._id === action.payload._id ? action.payload : userimg
        ),
        loading: false,
      };
    case DELETE_USERIMG:
      return {
        ...state,
        userimgs: state.userimgs.filter(
          (userimg) => userimg._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_USERIMGS:
      return {
        ...state,
        userimgs: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_USERIMGS:
      return {
        ...state,
        filtered: state.userimgs.filter((userimg) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return userimg.address.match(regex) || userimg.pincode.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case USERIMG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
