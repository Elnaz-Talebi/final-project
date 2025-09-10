"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, LogOut, Plus } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

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
        {/*if we will need this, so you can uncomment this input. I just thought, that it has no sense to have search bar on the header, when we have it on the main page in main section */}
        {/* <input type="text" placeholder="Search for plants..." className={styles.header_search}/> */}
        {!user && (
          <Link href="/user/login">
            <button className={styles.login_button}>Login</button>
          </Link>
        )}
        {user && (
          <div className={styles.profile_wrapper} ref={menuRef}>
            <button
              className={styles.profile_button}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <span className={styles.username}>
                {user.username || user.email}
              </span>
              <img src="/user_icon.png" className={styles.header_image} />
            </button>
            {open && (
              <div className={styles.dropdown} role="menu">
                {user.role === "admin" && (
                  <Link
                    className={styles.dropdown_item}
                    href="/plantinsertform"
                    onClick={() => setOpen(false)}
                  >
                    <Plus size={16} />
                    Insert Plant
                  </Link>
                )}
                <Link
                  className={styles.dropdown_item}
                  href="/favorites"
                  onClick={() => setOpen(false)}
                >
                  <Heart size={16} />
                  Favorites
                </Link>
                <button
                  className={styles.dropdown_item_button}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
