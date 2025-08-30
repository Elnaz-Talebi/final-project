"use client";
import PlantCard from "../PlantCard/PlantCard";
import {useEffect, useState} from "react";
import styles from "./page.module.css";

export default function Home() {
  const [plants, setPlants] = useState([]);

  {/*taking the data of plants and storing them in useState*/}
  useEffect(() => {
    let url = "http://localhost:5000/plants";

    fetch(url)
    .then(res => res.json())
    .then(setPlants);
  }, []);
  
  return (
    <div className={styles.main}>
      <div className={styles.intro}>
      <div className={styles.intro_text}>
      <h1>Bring Nature Indoors</h1>
      <p>Discover EverLeaf's exquisite collection of plants and accessories. Cultivate your green space with our curated selection for every corner of your home.</p>
      <a href="#catalog">
        <button className={styles.button}>Shop Now</button>
      </a>
      </div>
      <img src="./main_photo.png" className={styles.intro_photo}/>
      </div>
      <div id="catalog">
        <div className={styles.inputs}>
          {/*they doesn't have functionality for now... Waiting the API*/}
    <input type="text" placeholder="Search plants..." className={styles.search_bar}/>
    <div className={styles.selections}>
      <select>
        <option value="">Category</option>
        <option value="Indoor">Indoor</option>
        <option value="Outdoor">Outdoor</option>
      </select>
      <select>
        <option value="">Price Range</option>
        <option value="10">Less than 10DKK</option>
        <option value="10">Less than 20DKK</option>
        <option value="10">Less than 30DKK</option>
        <option value="10">Less than 40DKK</option>
        <option value="10">Less than 50DKK</option>
      </select>
      <select>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="averageRating">Average rating</option>
      </select>
    </div>
        </div>
        {/*the list of plants*/}
      <div className={styles.catalog}>
        {(Array.isArray(plants) ? plants : [])?.map(plant => (
          <PlantCard key={plant.id} id={plant.id} name={plant.name} description={plant.description} price={plant.price} imageUrl={plant.image_url} averageRating={plant.average_rating}/>
        ))}
      </div>
      </div>
    </div>
  );
}
