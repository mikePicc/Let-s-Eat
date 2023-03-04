import React from 'react';

import RestaurantList from '../components/RestaurantList.js';

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

// HomePage. Displays RestaurantList with Filter to streamline service to users.
export default function HomePage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RestaurantList />
    </ThemeProvider >
  );
}
