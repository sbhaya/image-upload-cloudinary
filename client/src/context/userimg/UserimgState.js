import React, { useReducer } from "react";
import axios from "axios";
import UserimgContext from "./userimgContext";
import userimgReducer from "./userimgReducer";
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

const UserimgState = (props) => {
  const initialState = {
    userimgs: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userimgReducer, initialState);

  // Get Contacts
  const getUserimgs = async () => {
    try {
      const res = await axios.get("/api/userimage");
      dispatch({
        type: GET_USERIMGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERIMG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Contact
  const addUserimg = async (userimg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/userimage", userimg, config);

      dispatch({
        type: ADD_USERIMG,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERIMG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Contact
  const deleteUserimg = async (id) => {
    try {
      await axios.delete(`/api/userimage/${id}`);

      dispatch({
        type: DELETE_USERIMG,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: USERIMG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Contact
  const updateUserimg = async (userimg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/userimg/${userimg._id}`,
        userimg,
        config
      );

      dispatch({
        type: UPDATE_USERIMG,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERIMG_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear Contacts
  const clearUserimgs = () => {
    dispatch({ type: CLEAR_USERIMGS });
  };

  // Set Current Contact
  const setCurrent = (userimg) => {
    dispatch({ type: SET_CURRENT, payload: userimg });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterUserimgs = (text) => {
    dispatch({ type: FILTER_USERIMGS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <UserimgContext.Provider
      value={{
        userimgs: state.userimgs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addUserimg,
        deleteUserimg,
        setCurrent,
        clearCurrent,
        updateUserimg,
        filterUserimgs,
        clearFilter,
        getUserimgs,
        clearUserimgs,
      }}
    >
      {props.children}
    </UserimgContext.Provider>
  );
};

export default UserimgState;
