import React, { useEffect, useState } from 'react';
import "./RestaurantList.css";
import RestaurantCard from './RestaurantCard.js';
import RestaurantFilter from './RestaurantFilter.js';
import RestaurantContext from './restaurantContext.js';

// Component that builds the grid of restaurant cards alongside the restaurant filter. Handles restaurant filter logic.
function RestaurantsList() {
    // Set of restaurants based on Context (Searchbar)
    const { filteredRestaurants } = React.useContext(RestaurantContext);
    // Set of restaurants based on Filter (Filter Sidebar)
    const [filteredFilteredRestaurants, setRestaurants] = useState(null)

    // Initialize searchbar filter and adapt list when Context(Searchbar) changes
    useEffect(() => {
        setRestaurants(filteredRestaurants)
    }, [filteredRestaurants])

    // Take arguments from RestaurantFilter (Sidebar) to filter through Context
    const handleFilter = (fltUseTime, fltTime, fltPrices, fltDiets) => {
        // Take the given snapshot of time and calculate how many minutes have passed since 00:00
        let timeInstance = fltTime[1] * 60 + fltTime[3] * 60 * 12 + fltTime[2]

        // .filter is a JSON/object filter that
        // returns elements(individual restaurants) where the following statement returns true.
        var results = filteredRestaurants.filter(rest => {

            // Check Prices (early to reduce search for openhours)
            if (!fltPrices[(rest.priceRange - 1)])
                return false

            // (Not implemented) Check Diets

            // Check open hours if useTime is true. If useTime is false, just return true.
            if (fltUseTime) {
                // Loop through each listing of open hours
                for (let daytime of rest.openHours) {
                    for (let time of daytime.times) {

                        // If at any listing we have a hit, just return true to skip the rest
                        if (
                            // Check if we have the right day
                            (daytime.days.includes(fltTime[0]))
                            &&
                            // Check if our timeInstance is between the start time (inclusive) and end time (exclusive)
                            (((time.startHr * 60 + time.startMin <= timeInstance
                                && time.endHr * 60 + time.endMin > timeInstance))
                                // Extra check for timeInstance of 23:00+
                                || (time.endHr === 0 && timeInstance > 23 * 60))
                        )
                            return true
                    }
                }
            }
            else
                return true

            // If we have the right priceRange but not the right time (with useTime), return false
            return false
        })

        // console.log("Filter Results: ", results);
        // Set list of restaurants to match results
        setRestaurants(results)
    }

    // Render filter and build grid of RestaurantCards
    return (
        <div id="main-content">
            <RestaurantFilter onFilter={handleFilter} />
            <div className="rest-list" id="rest-list-main">
                {filteredFilteredRestaurants &&
                    filteredFilteredRestaurants.map((item, index) => {
                        return (
                            <RestaurantCard
                                key={"main" + item._id}
                                restaurant={item}
                                favorite={index % 2 === 1 /* temporary, just for testing. REPLACE with actual logic*/}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default RestaurantsList;