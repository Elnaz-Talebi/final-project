"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css"; // make sure to style the form

export default function InsertNewPlant() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
    water_schedule: "",
    sunlight_exposure: "",
    humidity_and_temperature: "",
    soil_and_fertilizer: "",
    scientific_name: "",
    family: "",
    origin: "",
  });

  const [title, setTitle] = useState("New Plant Details");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For price, remove any non-digit characters except dot
    if (name === "price") {
      const numericValue = value.replace(/[^\d.]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plants/addPlants`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setTitle("Add Another Plant");
        setFormData({
          name: "",
          description: "",
          price: "",
          image_url: "",
          category: "",
          water_schedule: "",
          sunlight_exposure: "",
          humidity_and_temperature: "",
          soil_and_fertilizer: "",
          scientific_name: "",
          family: "",
          origin: "",
        });
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  if (loadingUser) return <p>Loading user...</p>;
  if (!user || user.role !== "admin")
    return <p>You do not have access to this page.</p>;

  return (
    <main className={styles.insertPlantContainer}>
      <h1>{title}</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.plantForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Plant Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter plant name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter plant description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price (DKK)</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="100"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            placeholder="Enter image URL"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="water_schedule">Water Schedule</label>
          <input
            type="text"
            id="water_schedule"
            name="water_schedule"
            placeholder="Enter water schedule"
            value={formData.water_schedule}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sunlight_exposure">Sunlight Exposure</label>
          <input
            type="text"
            id="sunlight_exposure"
            name="sunlight_exposure"
            placeholder="Enter sunlight exposure"
            value={formData.sunlight_exposure}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="humidity_and_temperature">
            Humidity & Temperature
          </label>
          <input
            type="text"
            id="humidity_and_temperature"
            name="humidity_and_temperature"
            placeholder="Enter humidity & temperature"
            value={formData.humidity_and_temperature}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="soil_and_fertilizer">Soil & Fertilizer</label>
          <input
            type="text"
            id="soil_and_fertilizer"
            name="soil_and_fertilizer"
            placeholder="Enter soil & fertilizer info"
            value={formData.soil_and_fertilizer}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="scientific_name">Scientific Name</label>
          <input
            type="text"
            id="scientific_name"
            name="scientific_name"
            placeholder="Enter scientific name"
            value={formData.scientific_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="family">Family</label>
          <input
            type="text"
            id="family"
            name="family"
            placeholder="Enter family"
            value={formData.family}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            name="origin"
            placeholder="Enter origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Insert Plant
        </button>
      </form>
    </main>
  );
}
