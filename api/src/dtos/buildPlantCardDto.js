export const buildPlantCardDto = (plant) => ({
  plantId: plant.id,
  plantName: plant.name,
  plantDescription: plant.description,
  plantPrice: plant.price,
  plantImage: plant.image_url,
  averageRating: plant.avg_rating,
  category: plant.category,
});
