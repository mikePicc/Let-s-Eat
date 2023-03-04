import React, { useState, useEffect, createContext } from "react";

const RestaurantContext = createContext();


export const RestaurantProvider = ({ children }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRestaurants, setFilteredRestaurant] = useState(restaurants ?? []);
  const [checkoutCard, setCheckoutCard] = useState([]);

  // fech restauant
  const fetchRestaurants = async () => {
    const response = await fetch("http://localhost:4000/api/restaurants/");
    const json = await response.json();

    console.log("Restaurants: ", json);
    if (response.ok) {
      setRestaurants(json);
    } else {
      console.log(response.statusText);
    }
  };

  // useEffect
  useEffect(() => {
    fetchRestaurants()
  }, [])


  useEffect(() => {
    console.log("searchQuery: ", searchQuery);
    // flter resturant list to only have restaurant name search query
    const res = restaurants.filter((restaurant) => {
      return restaurant.restaurantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

    console.log("res", res);
    setFilteredRestaurant(res);
  }, [searchQuery, restaurants]);

  return (
    <RestaurantContext.Provider
      // This use array as the exported value
      // value={[
      //   restaurants,
      //   setRestaurants,
      //   searchQuery,
      //   setSearchQuery,
      //   filteredRestaurants,
      //   checkoutCard,
      //   setCheckoutCard,
      // ]}
      // This use object as the exported value
      value={{
        restaurants,
        setRestaurants,
        searchQuery,
        setSearchQuery,
        filteredRestaurants,
        checkoutCard,
        setCheckoutCard,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;