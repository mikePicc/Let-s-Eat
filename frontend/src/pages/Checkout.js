
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

import UserContext from "../components/userContext";
import RestaurantContext from "../components/restaurantContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  // Store input value

  const [inputFirstName, setInputFirstName] = React.useState("");
  const [inputLastName, setInputLastName] = React.useState("");
  const [inputAddress, setInputAddress] = React.useState("");
  const [inputState, setInputState] = React.useState("");
  const [inputZip, setInputZip] = React.useState("");
  const [inputPhoneNumver, setInputPhoneNumber] = React.useState("");
  const [inputCardName, setInputCardName] = React.useState("");
  const [inputCardNumber, setInputCardNumber] = React.useState("");
  const [inputCardExp, setInputCardExp] = React.useState("");
  const [inputCardCvv, setInputCardCvv] = React.useState("");
  const [currentUser, setCurrentUser] = React.useContext(UserContext)
  const { checkoutCard } = React.useContext(RestaurantContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const submitCheckout = async () => {
    console.log("checkoutCard", checkoutCard);
    const orderItems = checkoutCard.map(o => {
      return {
        "text": o.desc,
        "price": o.prices[0],
      };
    })

    const total = checkoutCard.reduce((acc, o) => {
      return acc + o.prices[0];
    }, 0);
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "customer": `${currentUser?.user?.firstName} ${currentUser?.user?.lastName}`,
        "address": `${inputAddress}, ${inputState}, ${inputZip}`,
        "orderItems": orderItems,
        "total": total,
        "status": 1,
        "method": 1,
        "cardInfo": {
          "cardNumber": inputCardNumber,
          "cardHolder": inputCardName,
          "expiryDate": inputCardExp,
          "cvv": inputCardCvv,
        }
      })
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:4000/api/orders`,
        settings
      );
      const data = await fetchResponse.json();
      console.log("response data: ", data);
      toast("Checkout successful!")
      navigate("/orders");
    } catch (e) {
      console.error(e);
      toast("Failed to checkout!")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Customer Information:
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
                      setInputAddress(changeEvent.target.value);
                    }}
                    required
                    fullWidth
                    id="Address"
                    label="Address"
                    name="Address"
                    autoComplete="Address"
                  />
                </Grid>

                {/* For State */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputState(changeEvent.target.value);
                    }}
                    name="state"
                    required
                    fullWidth
                    id="state"
                    label="Enter State:"
                    autoFocus
                  />
                </Grid>

                {/* For Zipcode */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputZip(changeEvent.target.value);
                    }}
                    name="Zipcode"
                    required
                    fullWidth
                    id="Zipcode"
                    label="Enter Zipcode:"
                    autoFocus
                  />
                </Grid>

                {/* For Phone number */}
                <Grid item xs={12}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputPhoneNumber(changeEvent.target.value);
                    }}
                    required
                    fullWidth
                    id="Phone"
                    label="Enter Phone Number:"
                    autoComplete="number"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Grid for Payment! */}
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PaymentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Payment Method:
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputCardNumber(changeEvent.target.value);
                    }}
                    required
                    fullWidth
                    name="card"
                    label="Card Number"
                    autoComplete="Card Number:"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputCardCvv(changeEvent.target.value);
                    }}
                    name="cvvnumber"
                    required
                    fullWidth
                    id="cvvnumber"
                    label="CVV Number"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputCardExp(changeEvent.target.value);
                    }}
                    required
                    fullWidth
                    label="Expiry Date"
                    name="date"
                  />
                </Grid>
                {/* For Phone number */}
                <Grid item xs={12}>
                  <TextField
                    onChange={(changeEvent) => {
                      setInputCardName(changeEvent.target.value);
                    }}
                    required
                    fullWidth
                    name="namecard"
                    label="Enter name on card:"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {/* Make Button for Back */}
        <Grid item xs={5}>
          <Button
            onClick={() => navigate(-1)}
            type="back"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Back
          </Button>
        </Grid>
        {/* Make Button for Confrim */}
        <Grid item xs={5}>
          <Button
            onClick={() => submitCheckout()}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

