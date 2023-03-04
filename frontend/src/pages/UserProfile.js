import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/userContext";

import styled from '@emotion/styled'
import Avatar from "@mui/material/Avatar";
import PeopleIcon from "@mui/icons-material/People";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import HistoryIcon from "@mui/icons-material/History";
import PaymentIcon from "@mui/icons-material/Payment";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserProfile() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useContext(UserContext);

  console.log(currentUser)


  return (
    <Grid container spacing={2} direction="column" alignItems="center" sx={{ marginTop: "1em" }}>
      <Grid item xs={12}>
        <Avatar variant="rounded">
          <PeopleIcon />
        </Avatar>
      </Grid>
      {currentUser?.user?.email ? (
        // <h1>{currentUser.user.email}</h1>
        <Grid item xs={12}>
          <div>
            <p>{`Welcome, ${currentUser?.user?.firstName} ${currentUser?.user?.lastName}`}</p>
          </div>
        </Grid>
      ) : null
      }
      <Grid item xs={12}>
        <Button variant="contained" color="primary" component="span">
          Edit Profile
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button endIcon={<SettingsIcon />}>Privacy Setting</Button>
      </Grid>
      <Grid item xs={12}>
        <Button endIcon={<CircleNotificationsIcon />}>Notificaitons</Button>
      </Grid>
      <Grid item xs={12}>
        <Button endIcon={<HistoryIcon />}>Order History</Button>
      </Grid>
      <Grid item xs={12}>
        <Button endIcon={<PaymentIcon />}>Payment Details</Button>
      </Grid>
    </Grid>
  );
}
