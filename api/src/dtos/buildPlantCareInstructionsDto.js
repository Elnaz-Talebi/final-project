export const buildPlantCareInstructionsDto = (careInstructions) => ({
  waterSchedule: careInstructions.water_schedule,
  sunlightExposure: careInstructions.sunlight_exposure,
  humidityAndTemperature: careInstructions.humidity_and_temperature,
  soilAndFertilizer: careInstructions.soil_and_fertilizer,
});
