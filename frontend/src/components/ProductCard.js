import { Button } from '@mui/material';
import React, { Component, useCallback } from 'react';
import styles from "./ProductCard.module.css";
import RestaurantContext from "./restaurantContext";

const ProductCard = ({ product }) => {
  const {
    checkoutCard,
    setCheckoutCard
  } = React.useContext(RestaurantContext);

  const handleAddItemToCard = () => {
    setCheckoutCard([...checkoutCard, product]);
  }

  // console.log("CheckoutCard", checkoutCard);

  return (
    <div className={styles.container}>
      <img src={product.img} alt="" width="500" height="500" />
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>${product.prices[0]}</span>
      <p className={styles.desc}>{product.desc}</p>
      <Button
        onClick={handleAddItemToCard}>Add Item</Button>
    </div>
  );
};

export default ProductCard;