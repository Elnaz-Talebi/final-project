import styles from "./page.module.css";
export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
}
