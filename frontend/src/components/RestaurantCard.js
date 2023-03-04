import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RestaurantCard.css"
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Divider } from '@mui/material';

//  Building block components for Restaurant List
function RestaurantCard(props) {
    const [favorite, setFavorite] = useState(props.favorite)
    const navigate = useNavigate();

    // Clicking on the card navigates the user to the respective's restaurant page
    const handleNavigate = () => {
        let url = '/restaurant/' + props.restaurant._id;
        console.log(url);
        navigate(url);
    }

    // Toggle Favorite. (Currently doesn't update the user's list of favorites (cause they don't have one))
    const handleToggleFavorite = () => {
        console.log("fave");
        setFavorite(!favorite);
    }

    // Returns restaurant name. If too long, shortens it and appends a "..."
    const getName = (rName) => {
        let cutoff = 20 // Arbitrary max length where the restaurant name cuts off
        if (rName.length > cutoff) {
            while (rName.at(cutoff - 1) === " ")
                cutoff--
            rName = rName.substring(0, cutoff) + "..."
        }
        return rName;
    }


    return (
        <div className="rest-card-container" >
            <div className="rest-banner-container">
                <img
                    id="rest-banner-img"
                    alt={props.restaurant.restaurantName + " Banner Image"}
                    src={props.restaurant.bannerImg}
                    onClick={() => { handleNavigate() }} />
                <span className="fave-rest-btn" onClick={() => { handleToggleFavorite() }}>
                    {
                        favorite ? (<FavoriteIcon />) : (<FavoriteTwoToneIcon />)
                    }
                </span>
            </div>
            <Divider flexItem variant="middle" />
            <div
                id="rest-card-body"
                onClick={() => { handleNavigate() }}>
                <span id="rest-card-title" >
                    {
                        getName(props.restaurant.restaurantName)
                    }
                </span>
                <span id="rest-card-addr">
                    {
                        props.restaurant.restaurantAddress.buildingNo + " " + props.restaurant.restaurantAddress.street
                    }
                </span>
            </div>

        </div>
    );
}

export default RestaurantCard;
