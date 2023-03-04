// Protected Route
import UserContext from "./userContext";
import {
  Navigate,
  Outlet,
} from "react-router-dom";
import React from "react";

const ProtectedRoute = () => {
  const [currentUser, setCurrentUser] = React.useContext(UserContext);
  const isAuthenticated = !!currentUser.user;
  //   const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;