"use client";
import PlantCard from "./PlantCard/PlantCard";
import {useEffect, useState} from "react";

export default function Home() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    let url = "http://localhost:5000/plants";

    fetch(url)
    .then(res => res.json())
    .then(setPlants);
  }, []);
  
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to final-project 🚀</h2>
      <div>
        {(Array.isArray(plants) ? plants : [])?.map(plant => (
          <PlantCard key={plant.id} id={plant.id} name={plant.name} description={plant.description} price={plant.price} imageUrl={plant.image_url}/>
        ))}
      </div>
    </div>
  );
}
