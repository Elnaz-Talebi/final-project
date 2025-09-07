"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import SearchFilterSort from "@/components/SearchFilterSort/SearchFilterSort";
import PlantCard from "@/components/PlantCard/PlantCard";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function PlantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = 12;

  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchPlants = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plants?page=${pageNum}&pageSize=${pageSize}`
      );
      if (!res.ok) throw new Error("Failed to fetch plants");
      const data = await res.json();

      const formatted = data.plants.map((p) => ({
        plantId: p.plantId,
        plantName: p.plantName,
        category: "",
        price: Number(p.plantPrice),
        average_rating: 0,
        plantDescription: p.plantDescription,
        plantImage: p.plantImage,
      }));

      setPlants(formatted);
      setFilteredPlants(formatted);
      setTotalResults(data.totalResults || 0);
      setIsSearchActive(false);
    } catch (err) {
      setError({ message: err?.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(page);
    router.replace(`/plants?page=${page}&pageSize=${pageSize}`);
  }, [page]);

  const handleFilterChange = (filteredArray, searchTriggered = false) => {
    setFilteredPlants(filteredArray);
    setIsSearchActive(searchTriggered);
  };

  const maxPage = Math.ceil(totalResults / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > maxPage) return;
    setPage(newPage);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className={styles.plant_page}>
      <SearchFilterSort
        plants={plants}
        onFiltered={handleFilterChange}
        navigateOnSearch={false}
      />

      <h1>{isSearchActive ? "Search Results" : "Our Plants Collection"}</h1>

      <div className={styles.plant_grid}>
        {filteredPlants.length === 0 ? (
          <p>No plants found.</p>
        ) : (
          filteredPlants.map((plant) => (
            <PlantCard
              key={plant.plantId}
              id={plant.plantId}
              name={plant.plantName}
              description={plant.plantDescription}
              price={plant.price}
              imageUrl={plant.plantImage}
              averageRating={plant.average_rating}
            />
          ))
        )}
      </div>

      {!isSearchActive && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || loading}
          >
            Previous
          </button>
          <span>
            Page {page} of {maxPage}
          </span>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= maxPage || loading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
