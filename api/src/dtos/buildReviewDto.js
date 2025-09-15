export const buildReviewDto = (review) => ({
  id: review.id,
  plantId: review.plant_id,
  rating: review.rating,
  comment: review.comment,
  createdAt: review.created_at,
});
