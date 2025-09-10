"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { CircleUserRound } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(true);
  const [clicked, setClick] = useState(false);
  const [admin, setAdmin] = useState(true);
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <img src="./logo_everleaf.png" className={styles.header_image} />
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
        {!user && (
          <Link href="/user/login">
            <button className={styles.login_button}>Login</button>
          </Link>
        )}
        {/*Added the "user" variable, so if user logged in, so the icon is showed, else - it doesn't show anything
        Anyway I'm a little bit unsure, how this will work, because authentication is on login page, so the setUser function will be called there and set user to true or this should be made in some other way*/}
        {user && (
          <div className={styles.user_container}>
            <Link href="/">
              <ShoppingBasket className={styles.basket_icon} />
            </Link>
            <p className={styles.username}>UserName</p>
            <CircleUserRound
              onClick={() => setClick(!clicked)}
              className={styles.header_image}
            />
            {clicked &&
              (!admin ? (
                <div className={styles.profile_menu}>
                  <div className={styles.value}>
                    <Link href="/user/profile">Profile</Link>
                  </div>
                  <div className={styles.value}>
                    <Link href="/">Favorites</Link>
                  </div>
                  <div className={styles.value}>
                    <Link href="/" onClick={() => setUser(!user)}>
                      Log out
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={styles.profile_menu}>
                  <div className={styles.value}>
                    <Link href="/user/profile">Profile</Link>
                  </div>
                  <div className={styles.value}>
                    <Link href="/">Insert plant</Link>
                  </div>
                  <div className={styles.value}>
                    <Link href="/">Favorites</Link>
                  </div>
                  <div className={styles.value}>
                    <Link href="/" onClick={() => setUser(!user)}>
                      Log out
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </header>
  );
}
