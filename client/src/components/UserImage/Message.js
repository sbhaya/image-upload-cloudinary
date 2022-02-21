import React from "react";
import PropTypes from "prop-types";
import ErrorIcon from "@mui/icons-material/Error";
import Grid from "@mui/material/Grid";

const Message = ({ msg }) => {
  return (
    <Grid
      container
      p={2}
      justifyContent="center"
      justifySelf="center"
      style={{ backgroundColor: "red", color: "white", alignItems: "center" }}
    >
      {msg}
      <ErrorIcon />
    </Grid>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
