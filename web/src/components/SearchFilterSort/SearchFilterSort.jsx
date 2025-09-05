"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function SearchFilterSort({
  plants = [],
  onFiltered,
  navigateOnSearch = false,
  searchPath = "/plants",
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const filters = [
    { label: "Indoor", value: "Indoor" },
    { label: "Outdoor", value: "Outdoor" },
  ];

  const priceOptions = [
    { label: "Less than 10DKK", value: "10" },
    { label: "Less than 20DKK", value: "20" },
    { label: "Less than 30DKK", value: "30" },
    { label: "Less than 40DKK", value: "40" },
    { label: "Less than 50DKK", value: "50" },
  ];

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Average rating", value: "averageRating" },
  ];

  const getLocallyFilteredPlants = () => {
    let result = [...plants];

    if (selectedCategory) {
      result = result.filter(
        (p) =>
          (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedPrice) {
      result = result.filter(
        (p) => p.price != null && p.price <= Number(selectedPrice)
      );
    }

    if (selectedSort) {
      result.sort((a, b) => {
        if (selectedSort === "name")
          return (a.plantName || "").localeCompare(b.plantName || "");
        if (selectedSort === "price") return (a.price || 0) - (b.price || 0);
        if (selectedSort === "averageRating")
          return (b.average_rating || 0) - (a.average_rating || 0);
        return 0;
      });
    }

    return result;
  };

  // Local filtering effect (updates live on home page)
  useEffect(() => {
    const filtered = getLocallyFilteredPlants();
    onFiltered &&
      onFiltered(
        filtered,
        searchTerm,
        selectedCategory,
        selectedPrice,
        selectedSort
      );
  }, [plants, selectedCategory, selectedPrice, selectedSort]);

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      if (navigateOnSearch) {
        const params = new URLSearchParams();
        params.set("search", searchTerm.trim());
        router.push(`${searchPath}?${params.toString()}`);

        // Reset all filters and sort only on navigate
        setSelectedCategory("");
        setSelectedPrice("");
        setSelectedSort("");
      } else {
        // Apply local filtering including search term
        const filtered = getLocallyFilteredPlants().filter((p) =>
          (p.plantName || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
        onFiltered &&
          onFiltered(
            filtered,
            searchTerm,
            selectedCategory,
            selectedPrice,
            selectedSort
          );
      }
    }
  };

  return (
    <div className={styles.inputs}>
      <div className={styles.search_container}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search plants..."
          className={styles.search_bar}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <button onClick={handleSearchClick} className={styles.search_icon}>
          🔍
        </button>
      </div>

      <div className={styles.selections}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Category</option>
          {filters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">Price Range</option>
          {priceOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="">Sort by</option>
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
