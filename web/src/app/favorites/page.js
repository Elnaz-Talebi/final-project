"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import PlantCard from "@/components/PlantCard/PlantCard";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import Link from "next/link";

export default function Favorite() {
  const searchParams = useSearchParams();
  const pageSize = 12;

  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlants = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookie
      });
      if (!res.ok) throw new Error("Failed to fetch plants");
      const data = await res.json();

      console.log("data:", data);

      const formatted = data.map((p) => ({
        plantId: p.plantId,
        plantName: p.plantName,
        category: p.category,
        price: Number(p.plantPrice),
        averageRating: p.averageRating,
        plantDescription: p.plantDescription,
        plantImage: p.plantImage,
      }));

      setFilteredPlants(formatted);
    } catch (err) {
      setError({ message: err?.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(page);
  }, [page]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className={styles.main_container}>
      <div className={styles.plant_page}>
        <h1 className={styles.h1}>Favorite Plants</h1>
        <div className={styles.plant_grid}>
          {filteredPlants.length === 0 ? (
            <div className={styles.no_plants}>
              <p>No favorite plants yet</p>
              <Link href="/plants">
                <button className={styles.button}>Go to the catalog</button>
              </Link>
            </div>
          ) : (
            filteredPlants.map((plant) => (
              <PlantCard
                key={plant.plantId}
                id={plant.plantId}
                name={plant.plantName}
                description={plant.plantDescription}
                price={plant.price}
                imageUrl={plant.plantImage}
                averageRating={plant.averageRating}
                category={plant.category}
                user={true}
                initialFavorite={true}
                onRemoveFavorite={(removedPlantId) => {
                  // remove from favorites list
                  setFilteredPlants((prev) =>
                    prev.filter((p) => p.plantId !== removedPlantId)
                  );
                  alert(`${plant.plantName} removed from favorites`);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
