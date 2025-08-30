"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function PlantInfo({ plant }) {
  console.log(plant);
  if (!plant) return null;
  return (
    <div className={styles.container}>
      <div className={styles.plantSection}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={plant.image_url}
            alt={plant.name}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.plantName}>{plant.name}</h1>
          <p className={styles.plantDescription}>{plant.description}</p>
          <p className={styles.plantPrice}>${plant.price}</p>
        </div>
      </div>
    </div>
  );
}
