"use client";

import styles from "./page.module.css";
import Reviews from "../Review/Reviews";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";

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
          <div className={styles.info_text}>
            <h1 className={styles.plantName}>{plant.plantName}</h1>
            <p className={styles.plantDescription}>{plant.plantDescription}</p>

            <div className={styles.priceRow}>
              <p className={styles.plantPrice}>{plant.plantPrice} DKK</p>
              <AddToCartBtn id={plant.plantId} name={plant.plantName} price={plant.plantPrice} imageUrl={plant.plantImage}/>
            </div>
          </div>

          <div className={styles.separator}>
            <Reviews plantId={plant.plantId} />
          </div>
        </div>
      </div>
    </div>
  );
}
