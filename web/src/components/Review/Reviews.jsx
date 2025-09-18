"use client";

import { useState, useEffect } from "react";

import ReviewForm from "./ReviewForm";
import Loading from "../Loading/Loading";
import DisplayReviews from "./DisplayReviews";
import styles from "./page.module.css";

export default function Reviews({ plantId }) {
  const [reviews, setReviews] = useState([]);
  const [displayReviews, setDisplayReview] = useState(true);
  const [displayAddReviewForm, setDisplayAddReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getReviewsByPlantId = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/reviews/${plantId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }
      const res = await response.json();
      setReviews(res);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (plantId) {
      getReviewsByPlantId();
    }
  }, [plantId]);

  const handleNewReviewAdded = (newReview, message) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setDisplayReview(true);
    setDisplayAddReviewForm(false);
    alert(message);
  };

  if (loading) {
    return <Loading />;
  }

  if (reviews.length === 0) {
    return (
      <>
        <h2 className={styles.title}>Reviews</h2>

        <p>There are no reviews yet</p>

        {!displayAddReviewForm && (
          <button
            type="button"
            onClick={() => {
              setDisplayAddReviewForm(true);
              setDisplayReview(false);
            }}
            className={styles.addReviewBtn}
          >
            Add Review
          </button>
        )}

        {displayAddReviewForm && (
          <div className={styles.form_container}>
            <ReviewForm
              plantId={plantId}
              onNewReviewAdded={handleNewReviewAdded}
            />
            <button
              type="button"
              onClick={() => {
                setDisplayAddReviewForm(false);
                setDisplayReview(true);
              }}
              className={styles.backToReviewsBtn}
            >
              Back
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <h2 className={styles.title}>Reviews</h2>
      {displayReviews && <DisplayReviews reviews={reviews} />}

      {!displayAddReviewForm && (
        <button
          type="button"
          onClick={() => {
            setDisplayAddReviewForm(true);
            setDisplayReview(false);
          }}
          className={styles.addReviewBtn}
        >
          Add Review
        </button>
      )}

      {displayAddReviewForm && (
        <div className={styles.form_container}>
          <ReviewForm
            plantId={plantId}
            onNewReviewAdded={handleNewReviewAdded}
          />
          <button
            type="button"
            onClick={() => {
              setDisplayAddReviewForm(false);
              setDisplayReview(true);
            }}
            className={styles.backToReviewsBtn}
          >
            Back
          </button>
        </div>
      )}
    </>
  );
}
