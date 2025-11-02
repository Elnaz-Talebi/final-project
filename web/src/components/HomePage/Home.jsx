"use client";
import { useState, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import SearchFilterSort from "@/components/SearchFilterSort/SearchFilterSort";
import PlantCard from "@/components/PlantCard/PlantCard";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [favoritPlantIds, setFavoritPlantId] = useState([]);

  const fetchFavoritePlantIds = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/plantId`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch favorites");
      const data = await res.json();

      setFavoritPlantId(data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    async function fetchMe() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    }
    fetchMe();
  }, []);

  useEffect(() => {
    if (!user) {
      setFavoritPlantId([]);
    } else {
      fetchFavoritePlantIds();
    }
  }, [user]);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plants`);
        if (!res.ok) throw new Error("Failed to fetch plants");
        const data = await res.json();
        const formatted = (data.plants || []).map((p) => ({
          plantId: p.plantId || p.id,
          plantName: p.plantName || p.name || "",
          category: (p.category || p.plantCategory || "").toLowerCase(),
          price: Number(p.plantPrice || p.price || 0),
          averageRating: Number(p.averageRating || 0),
          plantDescription: p.plantDescription || "",
          plantImage: p.plantImage || "",
        }));
        setPlants(formatted);
      } catch (err) {
        setError({ message: err?.message || String(err) });
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const randomPlants = useMemo(() => {
    if (!plants || plants.length === 0) return [];
    return [...plants].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [plants]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const handleSearchClick = (searchTerm, category, maxPrice, sort) => {
    if (!searchTerm || searchTerm.trim() === "") return;
    const params = new URLSearchParams();
    params.set("search", searchTerm.trim());
    if (category) params.set("category", category);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);
    router.push(`/plants?${params.toString()}`);
  };

  return (
    <div className={styles.main}>
      <SearchFilterSort
        plants={randomPlants}
        onFiltered={(filteredArray) => setFilteredPlants(filteredArray)}
        navigateOnSearch={true}
        searchPath="/plants"
        onSearchClick={handleSearchClick}
      />

      <div className={styles.intro}>
        <div className={styles.intro_text}>
          <h1>Bring Nature Indoors</h1>
          <p>
            Discover EverLeaf's exquisite collection of plants and accessories.
            Cultivate your green space with our curated selection for every
            corner of your home.
          </p>
          <Link href="/plants">
            <button className={styles.button}>Show All Plants</button>
          </Link>
        </div>
        <img src="./main_photo.png" className={styles.intro_photo} />
      </div>

      <div id="catalog">
        <div className={styles.catalog}>
          {(filteredPlants.length > 0 ? filteredPlants : randomPlants).map(
            (plant) => (
              <PlantCard
                key={plant.plantId}
                id={plant.plantId}
                name={plant.plantName}
                description={plant.plantDescription}
                price={plant.price}
                imageUrl={plant.plantImage || null}
                averageRating={plant.averageRating}
                category={plant.category}
                user={user}
                initialFavorite={favoritPlantIds.includes(plant.plantId)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
