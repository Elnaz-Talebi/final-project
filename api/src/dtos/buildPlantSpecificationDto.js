export const buildPlantSpecificationDto = (plantSpecification)=>({
  plantSpecificationId: plantSpecification.id,
  plantId: plantSpecification.plant_id,
  scientificName: plantSpecification.scientific_name,
  family: plantSpecification.family,
  origin: plantSpecification.origin,
  createdAt: plantSpecification.created_at,
  updatedAt: plantSpecification.updated_at,
})