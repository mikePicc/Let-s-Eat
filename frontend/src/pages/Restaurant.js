import React, { useEffect, useState } from 'react';
import ProductList from "../components/ProductList.js";
import "./Restaurant.css"
import { useParams } from 'react-router-dom';

import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';

// Page for individual restaurants depending on the id in the current url
function Restaurant() {
    // Get id from the current URL path
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null)

    // Fetch restaurant with the matching id and set page to restaurant.
    useEffect(() => {
        const fetchRestaurant = async () => {
            console.log("fetching ", id);
            const response = await fetch('http://localhost:4000/api/restaurants/' + id)
            const json = await response.json()

            console.log("Restaurants: ", json)
            if (response.ok) {
                setRestaurant(json)
            } else {
                console.log(response.statusText)
            }
        }
        fetchRestaurant()
    }, [id])

    // Return string of the address
    const getRestaurantFullAddress = () => {
        if (restaurant.restaurantAddress)
            return restaurant.restaurantAddress.buildingNo + " " + restaurant.restaurantAddress.street
                + ", " + restaurant.restaurantAddress.city + ", " + restaurant.restaurantAddress.state
                + " " + restaurant.restaurantAddress.zipcode
    }

    // Return string representation of price range
    const getPriceRange = () => {
        let p = ""
        for (let i = 0; i < restaurant.priceRange; i++)
            p += "$"
        return p
    }

    // Return array of 1. the hour and 2. either "am" or "pm"
    const formatHr = (hour) => {
        let hr = hour
        let meridiem = "am"
        if (hr > 11) {
            meridiem = "pm"
            hr -= 12
        }
        if (hr === 0)
            hr = 12

        return [hr, meridiem]
    }

    // Return minute. Append a 0 if necessary
    const formatMin = (minute) => {
        let min = minute
        if (minute < 10)
            return "0" + min
        else
            return min
    }

    // Create a day-indexed array of strings representing their respective open hours
    const buildSchedule = () => {
        // console.log("openHours", restaurant.openHours)
        // i.e. [Sunday, ..., Saturday]
        let schedule = ["", "", "", "", "", "", ""]

        // Loop through each listing of open hours
        restaurant.openHours.forEach(daytime => {
            daytime.days.forEach(day => {
                daytime.times.forEach(time => {
                    // If day has multiple time listings, add a comma
                    if (schedule[day].length > 0)
                        schedule[day] += ", "

                    // Format string and append to proper index
                    let startHour = formatHr(time.startHr)
                    let startMinute = formatMin(time.startMin)
                    let endHour = formatHr(time.endHr)
                    let endMinute = formatMin(time.endMin)

                    schedule[day] += startHour[0] + ":" + startMinute + startHour[1] + " - " + endHour[0] + ":" + endMinute + endHour[1]
                })
            })
        })

        // If any day has no open time listings, label it "Closed"
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i].length === 0)
                schedule[i] = "Closed"
        }
        // console.log(schedule)
        return schedule
    }

    // Convert index into string for day
    const getDay = (index) => {
        switch (index) {
            default:
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }

    // If restaurant hasn't loaded yet, show loading text
    // Display restaurant information
    // Display restaurant's menu of products
    return (
        <div>
            {restaurant ?
                (<div>
                    <img
                        id="banner-img"
                        src={restaurant.bannerImg}
                        alt={"Img of " + restaurant.restaurantName} />
                    <div id="restaurant-header">
                        <div id="left-side-header">
                            <h1>{restaurant.restaurantName}</h1>
                            <b>
                                <PlaceIcon />{getRestaurantFullAddress() + " •"}
                                <StarIcon />{restaurant.rating + " • " + getPriceRange()}
                            </b>
                            <p>{restaurant.description}</p>
                            <span><LanguageIcon /><a href={restaurant.website}>{restaurant.website ? (restaurant.website) : null}</a>
                                {" •"}<PhoneIcon />{restaurant.phoneNo ? (restaurant.phoneNo) : null}</span>
                        </div>
                        <div id="right-side-header">
                            <h3><ScheduleIcon />Schedule</h3>
                            <tbody id="schedule">
                                {
                                    buildSchedule().map((item, index) => {
                                        return (<tr
                                            className="schedule-unit"
                                            data-today={index === new Date().getDay()}>
                                            <h4 className="schedule-dotw">{getDay(index)}</h4>
                                            <p className="schedule-time">{item}</p>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </div>
                    </div>
                    <ProductList restaurant_id={id} />
                </div>

                ) :
                (<div>
                    <p>Fetching restaurant...</p>
                </div>)}

        </div >
    )
}

export default Restaurant;