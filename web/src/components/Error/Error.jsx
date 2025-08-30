import styles from "./page.module.css";

export default function Error({ error }) {
  // Handle different types of error inputs
  let errorMessage = "An error occurred";

  if (typeof error === "string") {
    // Direct string error
    errorMessage = error;
  } else if (error?.message) {
    // Error object with message property
    errorMessage = error.message;
  } else if (error?.error) {
    // API response error object
    errorMessage = error.error;
  } else if (error) {
    // Any other object, try to stringify it
    errorMessage = String(error);
  }

  return (
    <div className={styles.container}>
      <div className={styles.error}>Error: {errorMessage}</div>
    </div>
  );
}
