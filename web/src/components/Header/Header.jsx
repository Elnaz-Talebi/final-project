"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  Heart,
  LogOut,
  Plus,
  ShoppingBasket,
  CircleUserRound,
  Menu,
} from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openedNav, setOpenedNav] = useState(false);
  const menuRef = useRef(null);

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    async function fetchMe() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    }
    fetchMe();
  }, []);

  useEffect(() => {
    function handleDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleDocClick);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  async function handleLogout() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      setOpen(false);
      if (typeof window !== "undefined") window.location.href = "/";
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <img src="/logo_everleaf.png" className={styles.header_image} />
        <p className={styles.logo_text}>EverLeaf</p>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/plants">All Plants</Link>
        <Link href="/help">Help</Link>
      </nav>
      <div className={styles.header_container}>
        {!user && (
          <div className={styles.header_container}>
            <Link href="/cart">
              <ShoppingBasket
                className={styles.basket_icon}
                color="#565d6dff"
                strokeWidth={1.5}
              />
              <span
                className={`${styles.cartTotalItems} ${
                  totalItems > 0
                    ? styles.showTotalItem
                    : styles.doNotshowCartTotalItems
                }`}
              >
                {totalItems}
              </span>
            </Link>
            <Link href="/user/login">
              <button className={styles.login_button}>Login</button>
            </Link>
          </div>
        )}
        {user && (
          <div className={styles.profile_wrapper} ref={menuRef}>
            <Link href="/cart" className={styles.shopping_cart}>
              <ShoppingBasket
                className={styles.basket_icon}
                color="#565d6dff"
                strokeWidth={1.5}
              />

              <span
                className={`${styles.cartTotalItems} ${
                  totalItems > 0
                    ? styles.showTotalItem
                    : styles.doNotshowCartTotalItems
                }`}
              >
                {totalItems}
              </span>
            </Link>
            <span className={styles.username}>
              {user.username || user.email}
            </span>
            <CircleUserRound
              className={styles.profile_button}
              color="#565d6dff"
              strokeWidth={1.5}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            />
            {open && (
              <div className={styles.dropdown} role="menu">
                {user.role === "admin" && (
                  <Link
                    href="/plantinsertform"
                    className={styles.icon_and_text}
                    onClick={() => setOpen(false)}
                  >
                    <div className={styles.dropdown_item}>
                      <Plus size={16} />
                      Insert Plant
                    </div>
                  </Link>
                )}
                <Link
                  className={styles.icon_and_text}
                  href="/favorites"
                  onClick={() => setOpen(false)}
                >
                  <div className={styles.dropdown_item}>
                    <Heart size={16} />
                    Favorites
                  </div>
                </Link>
                <Link
                  href="/"
                  className={styles.icon_and_text}
                  onClick={handleLogout}
                >
                  <div className={styles.dropdown_item}>
                    <LogOut size={16} />
                    Logout
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
        <Menu className={styles.menu} onClick={() => setOpenedNav((v) => !v)} />
        {openedNav && (
          <div className={styles.dropdown}>
            <Link href="/" className={styles.dropdown_item}>
              Home
            </Link>
            <Link href="/plants" className={styles.dropdown_item}>
              All plants
            </Link>
            <Link href="/help" className={styles.dropdown_item}>
              Help
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
