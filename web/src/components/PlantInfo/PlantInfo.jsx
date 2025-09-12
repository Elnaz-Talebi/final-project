"use client";

import styles from "./page.module.css";
import Reviews from "../Review/Reviews";

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
          <div  className={styles.separator}>
            <h1 className={styles.plantName}>{plant.plantName}</h1>
            <p className={styles.plantDescription}>{plant.plantDescription}</p>
            <p className={styles.plantPrice}>${plant.plantPrice}</p>
          </div>

          <div  className={styles.separator}>
            {/* TODO :::  Set up userId */}
            <Reviews plantId={plant.plantId} userId={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
