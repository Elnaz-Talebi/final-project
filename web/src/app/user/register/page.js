"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Error from "@/components/Error/Error";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateUsername = (username) =>
    /^[A-Za-z0-9]*[A-Za-z]+[A-Za-z0-9]*$/.test(username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateUsername(username)) {
      setError(
        "Username must contain letters, can include numbers, and cannot have spaces or special characters"
      );
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setShowPopup(true);

      setTimeout(() => {
        window.location.href = "/user/login";
      }, 4000);
    } catch {
      setError("Error in Registration. Please try again later.");
    }
  };

  return (
    <div className={styles.login_page}>
      <h1 className={styles.h1}>Sign Up</h1>
      {error && <Error error={error} />}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className={styles.input_bar}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={styles.input_bar}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={styles.input_bar}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>

      {showPopup && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            Registration successful! Redirecting to login...
          </div>
        </div>
      )}

      <a href="/user/login" className={styles.a}>
        Already have an account? Log In
      </a>
    </div>
  );
}
