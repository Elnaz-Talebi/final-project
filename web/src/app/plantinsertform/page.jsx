"use client";

import { useState } from "react";

export default function InsertNewPlant({ user }) {
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

  if (!user || user.role !== "admin") {
    return <p>You do not have access to this page.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/plants/addPlants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // sends cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setTitle("Add More Plant");
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
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <main>
      <h1>{title}</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
            <input
              type={key === "price" ? "number" : "text"}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Insert Plant</button>
      </form>
    </main>
  );
}
