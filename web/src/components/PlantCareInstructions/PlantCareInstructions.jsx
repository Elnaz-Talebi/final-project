"use client";
import styles from "./page.module.css";

export default function PlantCareInstructions({ plant }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Care Instructions</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Watering Schedule</div>
          <p className={styles.cardText}>{plant.waterSchedule}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Sunlight Exposure</div>
          <p className={styles.cardText}>{plant.sunlightExposure}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Humidity & Temperature</div>
          <p className={styles.cardText}>{plant.humidityAndTemperature}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Soil & Fertilizer</div>
          <p className={styles.cardText}>{plant.soilAndFertilizer}</p>
        </div>
      </div>
    </section>
  );
}
