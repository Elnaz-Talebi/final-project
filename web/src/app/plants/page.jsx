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
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plants?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          setError({ message: `Failed to fetch plants: ${res.status}` });
          setPlants([]);
          return;
        }

        const data = await res.json();
        console.log("API response:", data);

        if (Array.isArray(data.plants)) {
          setPlants(data.plants);
          setHasMore(data.plants.length === pageSize);
        } else {
          setPlants([]);
          setHasMore(false);
        }
      } catch (err) {
        setError({ message: `Could not load plants: ${err}` });
        setPlants([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();
  }, [page, pageSize]);

  const handleNext = () => {
    if (hasMore) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

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
              price={`${Number(plant.plantPrice)
                .toFixed(2)
                .replace(".", ",")} `}
              imageUrl={plant.plantImage}
              averageRating={0}
            />
          ))}
      </div>

      {/* Pagination controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNext}
          disabled={!hasMore}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
