import React from 'react';

import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//For dark theme color
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff8300",
    },
  },
});

export default function Footer() {
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      {/* For Footer Information */}
      <div
        id="footer"
        style={{
          width: "100%",
          minHeight: "9em",
          textAlign: "center",
          color: "white",
          backgroundColor: "rgb(39,39,39)",
        }}
      >
        <Grid container spacing={2} id="bottom">
          <Grid item xs={4}>
            <p><u className="uButton" onClick={() => navigate("/")}>Let's Eat</u></p>
            <p><u className="uButton" onClick={() => navigate("/about")}>About Us</u></p>
            <p>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
            </p>
          </Grid>
          <Grid item xs={4}>
            <p>Get Help</p>
            <p>Buy gift cards</p>
            <p>Promotions</p>
          </Grid>
          <Grid item xs={4}>
            <p>Add your restaurant</p>
            <p>Sign up to delivery</p>
            <p>Do not sell our info (California)</p>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider >
  );
}
