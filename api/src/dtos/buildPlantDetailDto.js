

export const buildPlantDetailDto = (plant)=>({
    plantId : plant.id,
    plantName : plant.name,
    plantDescription : plant.description,
    plantPrice : plant.price ,
    plantImage : plant.image_url ,
    plantCategory: plant.category,
    plantTags: plant.tags,
    careInstructions: plant.care_instructions,
    averageRating: plant.avg_rating,
    createdAt: plant.created_at,
    updatedAt: plant.updated_at,
})