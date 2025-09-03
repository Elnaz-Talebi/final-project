"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import PlantCard from "@/components/PlantCard/PlantCard";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function PlantsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plants`);
        if (!res.ok) {
          setError({ message: `Failed to fetch plants: ${res.status}` });
          setPlants([]);
          return;
        }
        const data = await res.json();
        setPlants(Array.isArray(data.plants) ? data.plants : []);
      } catch (err) {
        setError({ message: `Could not load plants: ${err}` });
        setPlants([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();
  }, []);

  return (
    <div className={styles.plant_page}>
      <h1>Our Plants Collection</h1>
      <div className={styles.plant_grid}>
        {loading && <Loading />}
        {error && <Error error={error} />}
        {!loading && !error && plants.length === 0 && (
          <p>No plants available.</p>
        )}
        {!loading &&
          !error &&
          plants.map((plant) => (
            <PlantCard
              key={plant.plantId}
              id={plant.plantId}
              name={plant.plantName}
              description={plant.plantDescription}
              price={plant.plantPrice}
              imageUrl={plant.plantImage}
              averageRating={0}
            />
          ))}
      </div>
    </div>
  );
}
