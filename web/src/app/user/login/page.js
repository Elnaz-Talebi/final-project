"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Error from "@/components/Error/Error";

export default function LoginPage() {
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (!res.ok) {
        // Extract error message from response body
        const errorData = await res.json();
        setError(errorData.error || "Login failed");
        return;
      }
      // Clear any previous errors on successful login
      setError("");
      // Logged in successfully; redirect to home so Header can pick up session
      window.location.href = "/";
    } catch {
      setError("Error in Login");
    }
  }

  return (
    <div className={styles.login_page}>
      <h1 className={styles.h1}>Log In</h1>
      {error && <Error error={error} />}
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button type="Submit" className={styles.button}>
          Log In
        </button>
      </form>
      <a href="/user/register" className={styles.a}>
        If you don't have account, so sign up
      </a>
    </div>
  );
}
