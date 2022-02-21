import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserimgContext from "../../context/userimg/userimgContext";
import Card from "@mui/material/Card";
import styled from "styled-components";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import FileUpload from "./FileUpload";
import Modal from "@mui/material/Modal";
import CheckoutCard from "../containers/CheckoutCard";

const CheckoutButton = styled(Button)`
  .MuiButton-outlinedInherit {
    color: white;
  }
`;

const UserimgItem = ({ userimg }) => {
  const userimgContext = useContext(UserimgContext);
  const { deleteUserimg, setCurrent, clearCurrent } = userimgContext;
  let history = useHistory();
  const { userimage, _id } = userimg;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setCurrent(userimg);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onDelete = async (e) => {
    e.preventDefault();
    deleteUserimg(_id);
    const formData = new FormData();
    formData.append("file", userimage);
    try {
      await axios.post("/api/delete", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {}
    clearCurrent();
  };

  const onEdit = async (e) => {
    e.preventDefault();
    history.push({ pathname: "/userimage" });
  };
  return (
    <>
      <CheckoutCard
        sx={{ marginTop: "0.5rem" }}
        style={{
          textAlign: "justify",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={userimage}
          alt="Profile Image"
        />

        <CardActions>
          <CheckoutButton variant="outlined" onClick={handleOpen}>
            <Edit />
          </CheckoutButton>
          <CheckoutButton variant="outlined" onClick={onDelete}>
            <Delete />
          </CheckoutButton>
        </CardActions>
      </CheckoutCard>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <FileUpload closeModal={setOpen} currentimage={userimg} />
      </Modal>
    </>
  );
};

UserimgItem.propTypes = {
  userimg: PropTypes.object.isRequired,
};

export default UserimgItem;
