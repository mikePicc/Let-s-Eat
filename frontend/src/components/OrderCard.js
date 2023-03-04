import React from 'react';
import Avatar from "@mui/material/Avatar";
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Building block components for Order page. 
function OrderCard(props) {

    // Returns a formatted datetime of the current order
    // e.g. "12/01/22 21:11:00"
    const formatDateTime = () => {
        let datetime = new Date(props.order.createdAt)

        return datetime.getMonth() + "/" + datetime.getDate() + "/" + datetime.getFullYear().toString().substring(2, 4)
            + " " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();
    }

    // Returns the text of the item. Shortens the text if too long.
    const getItemText = (item) => {
        let cutoff = 128 // Arbitrary max length where the item text cuts off
        let text = item.text
        if (text.length > cutoff) {
            while (text.at(cutoff - 1) != " ")
                cutoff--
            cutoff--
            text = text.substring(0, cutoff) + "..."
        }
        return text;
    }

    // I wanted to make it so that you need to press a button to see the orderItems
    // i.e. via Accordian, but the styling needed more time than we have.
    return (
        <div className="order-card-container" >
            <div id="order-card-customer">
                <Avatar>
                    <PersonIcon fontSize="large" />
                </Avatar>
                <h2>{props.order.customer}</h2>
            </div>
            <p id="order-card-address"><PlaceIcon />{props.order.address}</p>
            <p><ScheduleIcon />Order placed at: {formatDateTime()}</p>
            <b id="order-card-total">Total: ${props.order.total.toString().substring(0, 5)}</b>
            <ul id="order-card-item-list">
                {
                    props.order.orderItems && props.order.orderItems.map(item => {
                        return <ul className="order-card-item-unit">{getItemText(item)}</ul>
                    })
                }
            </ul>
        </div>
    );
}

export default OrderCard;