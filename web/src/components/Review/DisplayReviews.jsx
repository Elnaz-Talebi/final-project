import ReviewCard from "./ReviewCard";
import styles from "./page.module.css";


export default function DisplayReviews({ reviews }) {
  return (
    <div className={styles.displayReviewsContainer}>
      {reviews.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
}
