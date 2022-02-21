import React from "react";
import colors from "../../essentials/colors";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Grid
      container
      p={2}
      justifyContent="center"
      style={{ backgroundColor: `${colors.accent}`, color: "white" }}
    >
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item>Follow me on:</Grid>
        <Grid item>
          <a target="_blank" href="https://medium.com/@sabhya12.saini">
            Medium
          </a>
        </Grid>
        <Grid item>
          <a target="_blank" href="https://www.behance.net/sabhya12saa526">
            Behance
          </a>
        </Grid>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item>contact me at: </Grid>
          <Grid item>
            <EmailIcon />
          </Grid>
          <Grid item> sabhya12.saini@gmail.com</Grid>{" "}
        </Grid>
      </Grid>
      <small style={{ marginTop: "1rem" }}>
        © 2022 Sabhya Saini. All rights reserved
      </small>
    </Grid>
  );
};

export default Footer;
