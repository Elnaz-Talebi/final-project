"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function InsertNewPlant() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("New Plant Details");

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

  const fields = [
    { name: "name", label: "Plant Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "price", label: "Price (DKK)", type: "number" },
    { name: "image_url", label: "Image URL", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "water_schedule", label: "Water Schedule", type: "text" },
    { name: "sunlight_exposure", label: "Sunlight Exposure", type: "text" },
    {
      name: "humidity_and_temperature",
      label: "Humidity & Temperature",
      type: "text",
    },
    { name: "soil_and_fertilizer", label: "Soil & Fertilizer", type: "text" },
    { name: "scientific_name", label: "Scientific Name", type: "text" },
    { name: "family", label: "Family", type: "text" },
    { name: "origin", label: "Origin", type: "text" },
  ];

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
    const updatedValue =
      name === "price" ? value.replace(/[^\d.]/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
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
        setFormData(initialFormData);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  const handleClose = () => router.back();

  if (loadingUser) return <p>Loading user...</p>;
  if (!user || user.role !== "admin")
    return <p>You do not have access to this page.</p>;

  return (
    <main className={styles.insertPlantContainer}>
      <h1>{title}</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.plantForm}>
        {fields.map((field) => (
          <div key={field.name} className={styles.formGroup}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Insert Plant
          </button>
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
    </main>
  );
}
