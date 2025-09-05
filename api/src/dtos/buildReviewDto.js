export const buildReviewDto = (review) => ({
  reviewId: review.id,
  plantId: review.plant_id,
  userId: review.user_id,
  rating: review.rating,
  comment: review.comment,
  createdAt: review.created_at,
});
