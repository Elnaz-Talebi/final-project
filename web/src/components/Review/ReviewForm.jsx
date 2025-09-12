import { SubmitReviewForm } from "./SubmitReviewForm";
import { useActionState } from "react";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function ReviewForm({ plantId, userId }) {
  const [message, formAction] = useActionState(async (prevState, formData) => {
    const res = await SubmitReviewForm(formData);
    return res.message || "Review submitted!";
  }, null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (message) {
      alert(message);
      setComment("");
      setRating(0);
    }
  }, [message]);

  return (
    <form action={formAction}>
      <input type="hidden" name="plant-id" value={plantId} />
      <input type="hidden" name="user-id" value={userId} />

      <textarea
        id="comment"
        name="comment"
        rows="4"
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={styles.comment}
      ></textarea>

      <div>
        <label>Rating:</label>
        <div style={{ cursor: "pointer" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                color: star <= rating ? "gold" : "gray",
                fontSize: "1.5rem",
              }}
            >
              ★
            </span>
          ))}
        </div>
        {/* Hidden input to send rating value */}
        <input type="hidden" name="rating" value={rating} />
      </div>

      <button
        type="submit"
        className={styles.addReviewBtn}
        onClick={(e) => {
          if (!rating || !comment) {
            e.preventDefault();
            alert("Comment and Rating are required");
          }
        }}
      >
        Add Review
      </button>
    </form>
  );
}
