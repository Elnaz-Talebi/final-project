export const buildPlantCareInstructionsDto = (plantCare) => ({
  plantCareId: plantCare.id,
  plantId: plantCare.plant_id,
  waterSchedule: plantCare.water_schedule,
  sunlightExposure: plantCare.sunlight_exposure,
  humidityAndTemperature: plantCare.humidity_and_temperature,
  soilAndFertilizer: plantCare.soil_and_fertilizer,
  createdAt: plantCare.created_at,
  updatedAt: plantCare.updated_at,
});
