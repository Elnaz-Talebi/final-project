"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function PlantCareInstructions({ plantId }) {
  const [care, setCare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const fetchCareInstructions = async () => {
      try {
        setLoading(true);
        setErrMsg(null);

        const response = await fetch(
          `http://localhost:5000/plants/${plantId}/care-instructions`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Plant care instructions not found");
          }
          throw new Error("Failed to fetch care instructions");
        }

        const data = await response.json();
        setCare(data);
      } catch (err) {
        setErrMsg(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (plantId) {
      console.log(plantId);
      fetchCareInstructions();
    }
  }, [plantId]);

  if (loading) {
    return <Loading />;
  }
  if (errMsg) {
    return <Error error={errMsg} />;
  }
  if (!care) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Care Instructions</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Watering Schedule</div>
          <p className={styles.cardText}>{care.waterSchedule}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Sunlight Exposure</div>
          <p className={styles.cardText}>{care.sunlightExposure}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Humidity & Temperature</div>
          <p className={styles.cardText}>{care.humidityAndTemperature}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Soil & Fertilizer</div>
          <p className={styles.cardText}>{care.soilAndFertilizer}</p>
        </div>
      </div>
    </section>
  );
}
