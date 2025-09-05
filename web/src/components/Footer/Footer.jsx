"use client";
import styles from "./page.module.css";
import Link from "next/link";

//all links are disabled for now

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href="/">Home</Link>
        <Link href="/plants">All Plants</Link>
        <Link href="/help">Help</Link>
      </div>
      <div>
        <Link href="https://www.facebook.com"><div className={styles.facebook_icon}></div></Link>
        <Link href="https://x.com"><div className={styles.twitter_icon}></div></Link>
        <Link href="https://www.instagram.com"><div className={styles.instagram_icon}></div></Link>
        <Link href="https://www.linkedin.com"><div className={styles.linkedin_icon}></div></Link>
      </div>
    </footer>
  );
}
