"use client";
import styles from "./page.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
      <img src="./logo_everleaf.png" className={styles.header_image}/>
      <p className={styles.logo_text}>EverLeaf</p>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/plants">All Plants</Link>
        <Link href="/help">Help</Link>
      </nav>
      <div className={styles.header_container}>
      {/*if we will need this, so you can uncomment this input. I just thought, that it has no sense to have search bar on the header, when we have it on the main page in main section */}
      {/* <input type="text" placeholder="Search for plants..." className={styles.header_search}/> */}
      <Link href="/user/login"><button className={styles.login_button}>Login</button></Link>
      <Link href="/user/profile"><img src="./user_icon.png" className={styles.header_image}/></Link>
      </div>
    </header>
  );
}
