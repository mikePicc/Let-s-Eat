import * as React from "react";
import { useNavigate } from "react-router-dom";

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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function SignUp() {

  let navigate = useNavigate();
  //Store input value
  const [inputFirstName, setInputFirstName] = React.useState("");
  const [inputLastName, setInputLastName] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputRole, setInputRole] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await fetchSignup();
  };

  // Fetch db signup backend
  async function fetchSignup() {
    if (
      inputFirstName === "" ||
      inputLastName === "" ||
      inputEmail === "" ||
      inputPassword === ""
    ) {
      alert("Must enter all require information.");
      return;
    }

    const data = JSON.stringify({
      firstName: inputFirstName,
      lastName: inputLastName,
      email: inputEmail,
      username: inputEmail,
      role: inputRole,
      password: inputPassword,
    });

    // console.log(data);
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    };
    try {
      const fetchResponse = await fetch(
        "http://localhost:4000/api/users/signup",
        settings
      );
      const data = await fetchResponse.json();
      console.log("Succesfully Sign Up", data);
      alert("Welcome to the team!");
      navigate("/login");

    } catch (e) {
      console.log("Error", e);
      alert("Can't signup")
    }
  };

  const handleChange = (event) => {
    const { value } = event.target
    console.log("event", event)
    setInputRole(
      // On autofill we get a stringified value.
      value
    );
  };

  return (
    <>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(changeEvent) => {
                    setInputFirstName(changeEvent.target.value);
                  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(changeEvent) => {
                    setInputLastName(changeEvent.target.value);
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(changeEvent) => {
                    setInputEmail(changeEvent.target.value);
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(changeEvent) => {
                    setInputPassword(changeEvent.target.value);
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Type of user
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputRole}
                    label="Type of user"
                    onChange={handleChange}
                  >
                    <MenuItem value={"guest"}>Guest</MenuItem>
                    <MenuItem value={"driver"}>Driver</MenuItem>
                    <MenuItem value={"business_owner"}>Business Owner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember me!"
              />
            </Grid>
            <Button
              // onClick={() => submitSignUp()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}