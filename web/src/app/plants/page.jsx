"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import SearchFilterSort from "@/components/SearchFilterSort/SearchFilterSort";
import PlantCard from "@/components/PlantCard/PlantCard";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function PlantsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [plants, setPlants] = useState([]); // full dataset
  const [filteredPlants, setFilteredPlants] = useState([]); // filtered dataset
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const pageSize = 12;

  // Fetch all plants once
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plants/all`
        );
        if (!res.ok) throw new Error("Failed to fetch plants");
        const data = await res.json();

        const formatted = data.map((p) => ({
          plantId: p.plantId || p.id,
          plantName: p.plantName || p.name || "",
          category: (p.category || p.plantCategory || "").toLowerCase(),
          price: Number(p.plantPrice || p.price || 0),
          average_rating: Number(p.average_rating || 0),
          plantDescription: p.plantDescription || "",
          plantImage: p.plantImage || "",
        }));

        setPlants(formatted);
        setFilteredPlants(formatted);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Handle filtering from SearchFilterSort
  const handleFilterChange = (filteredArray) => {
    setFilteredPlants(filteredArray);
    setPage(1); // reset to first page whenever filter changes
  };

  // Pagination
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    const maxPage = Math.ceil(filteredPlants.length / pageSize);
    if (newPage > maxPage) return;
    setPage(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`/plants?${params.toString()}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  // Slice filteredPlants for current page
  const startIdx = (page - 1) * pageSize;
  const paginated = filteredPlants.slice(startIdx, startIdx + pageSize);
  console.log("Filtered Plants:", filteredPlants);
  return (
    <div className={styles.plant_page}>
      <SearchFilterSort
        plants={plants}
        onFiltered={handleFilterChange}
        navigateOnSearch={false}
      />

      <h1>Our Plants Collection</h1>
      <div className={styles.plant_grid}>
        {paginated.map((plant) => (
          <PlantCard
            key={plant.plantId}
            id={plant.plantId}
            name={plant.plantName}
            description={plant.plantDescription}
            price={plant.price}
            imageUrl={plant.plantImage}
            averageRating={plant.average_rating}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange(page + 1)}
          disabled={startIdx + pageSize >= filteredPlants.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
