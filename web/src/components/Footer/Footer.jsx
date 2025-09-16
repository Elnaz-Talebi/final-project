"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link href="/plants">All Plants</Link>
        <Link href="/help">Help</Link>
      </div>
      <div className={styles.links}>
        <Link href="https://www.facebook.com"><Facebook className={styles.icon}/></Link>
        <Link href="https://x.com"><Twitter className={styles.icon}/></Link>
        <Link href="https://www.instagram.com"><Instagram className={styles.icon}/></Link>
        <Link href="https://www.linkedin.com"><Linkedin className={styles.icon}/></Link>
      </div>
    </footer>
  );
}
