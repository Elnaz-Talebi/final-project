"use client";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";

export default function PlantCard({
  id,
  name,
  description,
  price,
  imageUrl,
  averageRating,
}) {
  const [favorite, setFavorite] = useState(false);
  const [inCart, addToCart] = useState(false);

  function changeFavorite(e) {
    if (favorite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }

  function changeCart(e) {
    if (inCart === false) {
      addToCart(true);
    } else {
      addToCart(false);
    }
  }

  return (
    <div>
      <div className={styles.card}>
    <Link href={`/plants/${id}`}>
        <img src={imageUrl} className={styles.card_image} />
        <div className={styles.card_info}>
          <h2>{name}</h2>
          <p>Average rating: {averageRating}</p>
          <p>{description}</p>
          <p className={styles.price}>{price}DKK</p>
        </div>
      </Link>
        <div className={styles.card_buttons}>
          {inCart ? (
            <button onClick={changeCart} className={styles.in_cart_button}>
              In Cart
              </button>) : (
            <button onClick={changeCart} className={styles.add_to_cart_button}>
              Add to Cart
              </button>
          )}
          {favorite ? (<button onClick={changeFavorite} className={styles.favorite}>*</button>) : (<button onClick={changeFavorite} className={styles.not_favorite}>*</button>)}
        </div>
      </div>
      </div>
  );
}
