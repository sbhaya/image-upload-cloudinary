import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import AccountCircle from "@mui/icons-material/AccountCircle";
import breakpoints from "../../essentials/screensize";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import UserimgContext from "../../context/userimg/userimgContext";

const ProfileIcon = styled.img`
width: 3rem;
height:3rem;
margin-right: 0.5rem;
border-radius:50%;
    @media (max-width: ${breakpoints.sm}px) {
      width:1.8rem;
      height:1.8rem;
      margin-right: 0.3rem;
    }
  }
`;

const Navbar = () => {
  const userimgContext = useContext(UserimgContext);
  const { userimgs, getUserimgs } = userimgContext;
  const [anchorElNav, setAnchorElNav] = useState(null);

  let compareurl;

  {
    userimgs?.map((userimg) => (
      <div key={userimg._id} timeout={500}>
        {(compareurl = userimg.userimage)}
      </div>
    ));
  }

  useEffect(() => {
    getUserimgs();

    // eslint-disable-next-line
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          style={{ background: "white", padding: "0.5rem" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid
                container
                columns={12}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={4} md={7}>
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  ></Box>{" "}
                </Grid>

                <Grid item xs={5} md={5}>
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      flexDirection: "row-reverse",
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      style={{ color: "#c9c6c5" }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { sx: "block", md: "none" },
                      }}
                    >
                      <MenuList
                        onClick={handleCloseNavMenu}
                        style={{
                          display: "flex",
                          flexDirection: "column-reverse",
                          justifyContent: "left",
                        }}
                      >
                        <MenuItem>
                          <Link to="/">
                            <IconButton
                              size="large"
                              aria-label="account of current user"
                            >
                              {compareurl ? (
                                <ProfileIcon
                                  src={compareurl}
                                  alt="profileimage"
                                ></ProfileIcon>
                              ) : (
                                <AccountCircle />
                              )}

                              <Typography variant="body2" align="center">
                                User
                              </Typography>
                            </IconButton>
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      flexDirection: "row-reverse",
                    }}
                  >
                    <MenuItem>
                      <Link to="/">
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                        >
                          {compareurl ? (
                            <ProfileIcon
                              src={compareurl}
                              alt="profileimage"
                            ></ProfileIcon>
                          ) : (
                            <AccountCircle />
                          )}

                          <Typography variant="body2" align="center">
                            User
                          </Typography>
                        </IconButton>
                      </Link>
                    </MenuItem>
                  </Box>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  icon: PropTypes.string,
};

export default Navbar;
