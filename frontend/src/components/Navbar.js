import React from 'react';

import UserContext from "./userContext";
import RestaurantContext from './restaurantContext';
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import leLogo from '../assets/LetsEatLogo.png'

// For Search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },

  display: "flex",
  direction: "row",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width")
  },
  width: "100%"
}));

export default function Navbar() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useContext(UserContext);
  const { restaurants, setSearchQuery } = React.useContext(RestaurantContext);

  console.log("currentUser", currentUser);
  console.log("restaurants", restaurants)

  // Handle onclick for MenuBtn
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:4000/api/users/logout`,
        settings
      );
      const data = await fetchResponse.json();
      console.log("Logout succesfull, response data: ", data);
      setCurrentUser({})
      navigate("/login");
    } catch (e) {
      console.error(e);
      alert("Can't logout");
    }
  }


  return (
    <AppBar
      id="header"
      position="static"
      color="primary"
      sx={{
        position: "sticky",
        top: 0,
        width: "100%"
      }}
    >
      <Toolbar>
        {/* Button toggles Menu (fade-menu) */}
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {/* Components depend on whether user is logged in or not */}
          {currentUser?.user?.email ? (
            <div>
              <MenuItem color="warning" onClick={() => handleLogout()}>Log out</MenuItem>
              <MenuItem onClick={() => navigate("/user-profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/orders")}>Orders</MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={() => navigate("/login")}>Log In</MenuItem>
              <MenuItem onClick={() => navigate("/signup")}>Sign Up</MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
            </div>
          )}
        </Menu>

        {/* The rest of the navbar. Grid container holds Grid item */}
        <Grid
          container
          direction="row"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {/* Website Logo+Name. Also Home button. */}
          <Grid item xs={2}>
            <Button
              variant="h6"
              component="div"
              edge="start"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <img
                src={leLogo}
                style={{ width: 50, height: 50, marginRight: 5 }}
              />
              <b style={{ lineHeight: 1.5, fontSize: 16 }}>Let's Eat</b>
            </Button>
          </Grid>

          {/* Search field component. Defined by custom styles above. */}
          <Grid item xs={6}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => { setSearchQuery(event.target.value) }}
              />
            </Search>
          </Grid>

          {/* Login/Signup/Cart/Welcome message. Visibility and justification depends on whether user is logged in */}
          <Grid
            item
            xs={4}
            container
            direction="row"
            display="flex"
            justifyContent={
              currentUser?.user?.email ?
                ("space-evenly") :
                ("center")
            }
            alignItems="center">


            {currentUser?.user?.email ?
              (<Grid item><Button onClick={() => navigate("/cart")}>Cart</Button></Grid>) :
              (<Grid item><Button onClick={() => navigate("/login")}>Log in</Button></Grid>)
            }

            {currentUser?.user?.email ?
              (<Grid item>{`Hello, ${currentUser?.user?.firstName}!`}</Grid>) :
              (<Grid item><Button onClick={() => navigate("/signup")}>Sign Up</Button></Grid>)
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
