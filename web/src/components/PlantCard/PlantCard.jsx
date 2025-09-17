"use client";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";

export default function PlantCard({
  id,
  name,
  description,
  price,
  imageUrl,
  averageRating,
  category,
}) {
  const [favorite, setFavorite] = useState(false);

  function changeFavorite() {
    if (favorite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }

  function renderStars(rating) {
    const stars = [];
    const convertedRating = parseInt(rating, 10);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i < parseInt(rating) ? "#48a830ff" : "#ccc" }}
        >
          ★
        </span>
      );
    }
    return stars;
  }

  return (
    <div>
      <div className={styles.card}>
        <Link href={`/plants/${id}`}>
          <img src={imageUrl} className={styles.card_image} />
        </Link>
        <Link href={`/plants/${id}`}>
          <div className={styles.card_info}>
            <div>{renderStars(averageRating)}</div>
            <h2 className={styles.h2}>{name}</h2>
            <p className={styles.price}>{price} DKK</p>
          </div>
        </Link>
        <div className={styles.card_buttons}>
          <AddToCartBtn id={id} name={name} price={price} imageUrl={imageUrl} />

          {favorite ? (
            <button onClick={changeFavorite} className={styles.favorite}>
              <Heart className={styles.heart} />
            </button>
          ) : (
            <button onClick={changeFavorite} className={styles.not_favorite}>
              <Heart className={styles.heart} />
            </button>
          )}
        </div>

        {favorite ? (
          <button onClick={changeFavorite} className={styles.favorite_mobile}>
            <Heart className={styles.heart} />
          </button>
        ) : (
          <button
            onClick={changeFavorite}
            className={styles.not_favorite_mobile}
          >
            <Heart className={styles.heart} />
          </button>
        )}
      </div>
    </div>
  );
}
