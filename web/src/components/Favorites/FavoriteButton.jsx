import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Heart } from "lucide-react";

function FavoriteButton({ plantId, initialFavorite, onRemoveFavorite }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  async function toggleFavorite() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/toggle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // send cookie
          body: JSON.stringify({ plantId }),
        }
      );

      if (!res.ok) throw new Error("Failed to toggle favorite");

      const data = await res.json();

      setIsFavorite(data.favorite);
      if (onRemoveFavorite) {
        onRemoveFavorite(plantId);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className={isFavorite ? styles.favorite : styles.not_favorite}
    >
      <Heart className={styles.heart} />
    </button>
  );
}
export default FavoriteButton;
