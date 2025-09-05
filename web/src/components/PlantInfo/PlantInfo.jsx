"use client";

import styles from "./page.module.css";

export default function PlantInfo({ plant }) {
  console.log("plant:", plant);
  return (
    <div className={styles.container}>
      <div className={styles.plantSection}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={plant.plantImage}
            alt={plant.plantName}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.plantName}>{plant.plantName}</h1>
          <p className={styles.plantDescription}>{plant.plantDescription}</p>
          <p className={styles.plantPrice}>${plant.plantPrice}</p>
        </div>
      </div>
    </div>
  );
}
