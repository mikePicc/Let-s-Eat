import React, { useEffect, useState } from 'react';
import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard.js";

const ProductList = ({ restaurant_id }) => {
  // console.log("restaurant_id", restaurant_id);
  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])

  useEffect(() => {
    // console.log("fire");
    const fetchProducts = async () => {
      // console.log("fetch");
      const response = await fetch('http://localhost:4000/api/products')
      const json = await response.json()

      // console.log("Products: ", json)
      if (response.ok) {
        setProducts(json)
      } else {
        console.log(response.statusText)
      }

    }
    fetchProducts()
  }, [])

  useEffect(() => {
    // console.log("products", products);
    const res = products.filter((product) => {
      return product.restaurant === restaurant_id;
    });
    // console.log("res: ", res);
    setFilteredProduct(res);
  }, [products, restaurant_id]);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured on Let's Eat</h1>
      <p className={styles.desc}>
        Here are some items recommended for you.
      </p>
      <div className={styles.wrapper}>
        {filteredProduct &&
          filteredProduct.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
}

export default ProductList;