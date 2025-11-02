"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function InsertNewPlant() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [popup, setPopup] = useState({
    visible: false,
    message: "",
    success: false,
  });
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
    { name: "category", label: "Category", type: "select" },
    { name: "water_schedule", label: "Water Schedule", type: "select" },
    { name: "sunlight_exposure", label: "Sunlight Exposure", type: "select" },
    {
      name: "humidity_and_temperature",
      label: "Humidity & Temperature",
      type: "select",
    },
    { name: "soil_and_fertilizer", label: "Soil & Fertilizer", type: "select" },
    { name: "scientific_name", label: "Scientific Name", type: "text" },
    { name: "family", label: "Family", type: "text" },
    { name: "origin", label: "Origin", type: "text" },
  ];

  const dropdownFields = [
    "category",
    "water_schedule",
    "sunlight_exposure",
    "humidity_and_temperature",
    "soil_and_fertilizer",
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
    if (dropdownFields.includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    const updatedValue =
      name === "price" ? value.replace(/[^\d.]/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const showPopup = (message, success) => {
    setPopup({ visible: true, message, success });
    if (success) window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(
      () => setPopup({ visible: false, message: "", success: false }),
      4000
    );
    return () => clearTimeout(timer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (!res.ok) {
        showPopup(data.error || "Something went wrong", false);
        return;
      }
      showPopup(data.message || "Plant inserted successfully!", true);
      setTitle("Add Another Plant");
      setFormData(initialFormData);
    } catch {
      showPopup("Something went wrong", false);
    }
  };

  const handleClose = () => router.back();

  if (loadingUser) return <p>Loading user...</p>;
  if (!user || user.role !== "admin")
    return <p>You do not have access to this page.</p>;

  return (
    <main className={styles.insertPlantContainer}>
      <h1>{title}</h1>
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
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className={styles.selectInput}
              >
                <option value="" disabled hidden>
                  Select {field.label}
                </option>
                {field.name === "category" && (
                  <>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                  </>
                )}
                {field.name === "water_schedule" && (
                  <>
                    <option value="Once a week">Once a week</option>
                    <option value="Twice a week">Twice a week</option>
                    <option value="Every 2 weeks">Every 2 weeks</option>
                    <option value="Daily">Daily</option>
                  </>
                )}
                {field.name === "sunlight_exposure" && (
                  <>
                    <option value="Full Sun (6-8 hours)">
                      Full Sun (6-8 hours)
                    </option>
                    <option value="Partial Sun (3-6 hours)">
                      Partial Sun (3-6 hours)
                    </option>
                    <option value="Shade (1-3 hours)">Shade (1-3 hours)</option>
                  </>
                )}
                {field.name === "humidity_and_temperature" && (
                  <>
                    <option value="Low Humidity 20-30% - 18-20°C">
                      Low Humidity 20-30% - 18-20°C
                    </option>
                    <option value="Moderate Humidity 40-60% - 20-25°C">
                      Moderate Humidity 40-60% - 20-25°C
                    </option>
                    <option value="High Humidity 60-80% - 22-28°C">
                      High Humidity 60-80% - 22-28°C
                    </option>
                  </>
                )}
                {field.name === "soil_and_fertilizer" && (
                  <>
                    <option value="Well-draining Soil + Balanced Fertilizer Monthly">
                      Well-draining Soil + Balanced Fertilizer Monthly
                    </option>
                    <option value="Moist Soil + Liquid Fertilizer Every 2 Weeks">
                      Moist Soil + Liquid Fertilizer Every 2 Weeks
                    </option>
                    <option value="Sandy Soil + Slow Release Fertilizer Every 3 Months">
                      Sandy Soil + Slow Release Fertilizer Every 3 Months
                    </option>
                    <option value="Peat-based Soil + Organic Fertilizer Monthly">
                      Peat-based Soil + Organic Fertilizer Monthly
                    </option>
                  </>
                )}
              </select>
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
          <button type="submit" className={styles.formButton}>
            Insert Plant
          </button>
          <button
            type="button"
            className={styles.formButton}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
      {popup.visible && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            style={{ backgroundColor: popup.success ? "#48A830" : "#dc3545" }}
          >
            {popup.message}
          </div>
        </div>
      )}
    </main>
  );
}
