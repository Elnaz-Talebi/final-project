"use client";
import PlantInfo from "@/components/PlantInfo/PlantInfo";
import PlantSpecifications from "@/components/PlantSpecifications/PlantSpecifications";
import PlantCareInstructions from "@/components/PlantCareInstructions/PlantCareInstructions";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function Page() {
  const { id: plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plants/${plantId}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Plant not found");
          }
          throw new Error("Failed to fetch plant");
        }
        const plantData = await response.json();
        setPlant(plantData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (plantId) {
      fetchPlant();
    }
  }, [plantId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!plant) {
    return <Error error="Plant Not Exist" />;
  }
  return (
    <>
      <PlantInfo plant={plant} />
      <PlantSpecifications plant={plant} />
      <PlantCareInstructions plant={plant} />
    </>
  );
}
