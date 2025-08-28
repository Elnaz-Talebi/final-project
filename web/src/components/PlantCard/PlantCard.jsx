"use client";
import styles from "./page.module.css";

export default function PlantCard({ id, name, description, price, imageUrl, averageRating }) {
  return (
    <a href={`/${id}`}>
    <div className={styles.card}>
      {/*So instead of images from database, that doesn't work, I put images of fig
      The issue is that the website blocking importing/exporting images, that it has*/}
      <img src="https://images.immediate.co.uk/production/volatile/sites/10/2018/02/bf8289cd-b3b2-4421-8d2b-ca8837696534-39a2ae7.jpg" className={styles.card_image}/>
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
