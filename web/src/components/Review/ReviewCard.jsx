import styles from "./page.module.css";

export default function ReviewCard({ review }) {
  const rating = parseFloat(review.rating);

  return (
    <div className={styles.reviewCard}>
      <div>
        {[1, 2, 3, 4, 5].map((star) => {
          if (rating >= star) {
            // full star
            return (
              <span key={star} style={{ color: "gold", fontSize: "1.5rem" }}>
                ★
              </span>
            );
          } else {
            // empty star
            return (
              <span key={star} style={{ color: "gray", fontSize: "1.5rem" }}>
                ★
              </span>
            );
          }
        })}
      </div>

      <p>{review.comment}</p>
      <p>Date: {review.createdAt.slice(0, 10)}</p>
    </div>
  );
}
