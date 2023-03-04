import * as React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/userContext";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignIn() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useContext(UserContext)
  console.log("currentUser", currentUser);
  const [inputEmail, setInputEmail] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    await fetchSignin();
  };

  // fetch db SignIn backend
  async function fetchSignin() {
    if (inputEmail === "" || inputPassword === "") {
      alert("Must enter email & password!");
      return;
    }

    // Convert Object to string JSON.stringify
    const data = JSON.stringify({
      username: inputEmail,
      password: inputPassword,
    });

    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: data,
      credentials: "include", // IMPORTANT Need this to have the user return to us
    };
    try {
      console.log(settings)
      const fetchResponse = await fetch(
        `http://localhost:4000/api/users/login`,
        settings
      );
      const data = await fetchResponse.json();

      if (!data.success)
        throw "Login failed, response data: " + JSON.stringify(data);
      console.log("Login succesful, response data: ", data);
      setCurrentUser(data)
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Can't login");
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(changeEvent) => {
              setInputEmail(changeEvent.target.value);
            }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(changeEvent) => {
              setInputPassword(changeEvent.target.value);
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/login"
                variant="body2"
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}