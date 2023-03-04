import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard.js"
import "./Orders.css"

// Page for Order History. At this stage of development, displays all previous orders regardless of user authorization.
const Order = () => {
  const [fetchedOrders, setFetchedOrders] = useState([])

  useEffect(() => {

    // Fetch list of orders on start
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:4000/api/orders");
      const json = await response.json();

      if (response.ok) {
        setFetchedOrders(json);

      } else {
        console.log(response.statusText);
      }
    };

    fetchOrders()
  }, []);
  // console.log("fetchedOrders", fetchedOrders);

  // Build list of orders with OrderCards
  return (
    <div id="orders-page">
      <h1>Orders</h1>
      {
        fetchedOrders.map((order) => {
          return (
            <OrderCard order={order} />
          )
        })
      }
    </div>
  );
}

export default Order;