"use client";
import styles from "./page.module.css";

//all links are disabled for now

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="">Shop</a>
        <a href="">About</a>
        <a href="">Help</a>
      </div>
      <div>
        <a href=""><div className={styles.facebook_icon}></div></a>
        <a href=""><div className={styles.twitter_icon}></div></a>
        <a href=""><div className={styles.instagram_icon}></div></a>
        <a href=""><div className={styles.linkedin_icon}></div></a>
      </div>
    </footer>
  );
}
