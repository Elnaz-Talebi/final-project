"use client";
import styles from "./page.module.css";

//all links are disabled for now

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="/">Home</a>
        <a href="/plants">All Plants</a>
        <a href="/help">Help</a>
      </div>
      <div>
        <a href="https://www.facebook.com"><div className={styles.facebook_icon}></div></a>
        <a href="https://x.com"><div className={styles.twitter_icon}></div></a>
        <a href="https://www.instagram.com"><div className={styles.instagram_icon}></div></a>
        <a href="https://www.linkedin.com"><div className={styles.linkedin_icon}></div></a>
      </div>
    </footer>
  );
}
