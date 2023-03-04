import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import SignIn from "./pages/SignIn.js";
import SignUp from './pages/SignUp.js';
import HomePage from "./pages/HomePage.js";
import Orders from "./pages/Orders.js";
import Checkout from "./pages/Checkout.js";
import Restaurant from "./pages/Restaurant.js"
import UserProfile from './pages/UserProfile.js';
import Cart from './pages/Cart';
import About from "./pages/About.js"

import ProtectedRoute from "./components/ProtectedRoute.js"
import { UserProvider } from "./components/userContext.js";
import { RestaurantProvider } from './components/restaurantContext.js';

import { createTheme, ThemeProvider } from "@mui/material/styles";

//For dark theme color
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <UserProvider>
          <RestaurantProvider>
            <Navbar />
            <div className="page">
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/restaurant/:id" element={<Restaurant />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/user-profile" element={<ProtectedRoute />}>
                  <Route exact path="/user-profile" element={<UserProfile />} />
                </Route>
                <Route exact path="/cart" element={<ProtectedRoute />}>
                  <Route exact path="/cart" element={<Cart />} />
                </Route>
                <Route exact path="/about" element={<About />} />
              </Routes>
            </div>
            <Footer />
          </RestaurantProvider>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;