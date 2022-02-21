import React, { useContext, useEffect, useState } from "react";
import Userimgs from "../UserImage/userimgs";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import userpic from "../../assets/user.png";
import UserimgContext from "../../context/userimg/userimgContext";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import CheckoutCard from "../containers/CheckoutCard";
import Modal from "@mui/material/Modal";
import FileUpload from "../UserImage/FileUpload";

const Profile = () => {
  const userimgContext = useContext(UserimgContext);
  const { getUserimgs, loading, userimgs } = userimgContext;
  let uploadedimage;
  useEffect(() => {
    getUserimgs();

    // eslint-disable-next-line
  }, []);
  {
    userimgs?.map((userimg) => (uploadedimage = userimg.userimage));
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Grid container columns={12}>
        <Grid item md={12} xs={12}>
          <Typography variant="h4" align="center">
            Profile Section
          </Typography>
        </Grid>
        <Grid container justifyContent="center" md={4}>
          {uploadedimage ? (
            <Userimgs />
          ) : (
            <>
              <CheckoutCard>
                {" "}
                <CardMedia
                  component="img"
                  height="240"
                  image={userpic}
                  alt="Profile Image"
                />
                <CardActions>
                  <Button variant="outlined" onClick={handleOpen}>
                    <Edit />
                  </Button>
                </CardActions>
              </CheckoutCard>
              <Modal open={open} onClose={handleClose} closeAfterTransition>
                <FileUpload closeModal={setOpen} />
              </Modal>
            </>
          )}
        </Grid>
        <Grid container md={8} p={5} spacing={1}>
          <Grid item md={5} xs={6}>
            Name :
          </Grid>
          <Grid item md={7} xs={6}>
            User_name
          </Grid>
          <Grid item md={5} xs={6}>
            User Id :
          </Grid>
          <Grid item md={7} xs={6}>
            user_id
          </Grid>
          <Grid item md={5} xs={6}>
            Address :
          </Grid>
          <Grid item md={7} xs={6}>
            user_address
          </Grid>
          <Grid item md={5} xs={6}>
            Contact :
          </Grid>
          <Grid item md={7} xs={6}>
            user_contact_info
          </Grid>
          <Grid item md={5} xs={6}>
            E-mail :
          </Grid>
          <Grid item md={7} xs={6}>
            user_email
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Profile;
