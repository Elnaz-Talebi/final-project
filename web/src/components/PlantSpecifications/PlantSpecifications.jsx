"use client";

import styles from "./page.module.css";

export default function PlantSpecifications({ plant }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Specifications</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Scientific Name</div>
          <p className={styles.cardText}>{plant.scientificName}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Family</div>
          <p className={styles.cardText}>{plant.family}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Origin</div>
          <p className={styles.cardText}>{plant.origin}</p>
        </div>
      </div>
    </section>
  );
}
