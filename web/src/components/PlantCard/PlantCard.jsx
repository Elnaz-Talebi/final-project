"use client";
import styles from "./page.module.css";

export default function PlantCard({
  id,
  name,
  description,
  price,
  imageUrl,
  averageRating,
}) {
  return (
    <a href={`/plants/${id}`}>
      <div className={styles.card}>
        <img src={imageUrl} className={styles.card_image} />
        <div className={styles.card_info}>
          <h2>{name}</h2>
          <p>Average rating: {averageRating}</p>
          <p>{description}</p>
          <p className={styles.price}>{price}DKK</p>
        </div>
      </div>
    </a>
  );
}
