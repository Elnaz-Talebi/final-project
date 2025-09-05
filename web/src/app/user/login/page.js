"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function LoginPage() {
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    
    return (
      <div className={styles.login_page}>
        <h1 className={styles.h1}>Log In</h1>
        <form className={styles.form}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className={styles.input_bar}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            className={styles.input_bar}
          />
          <button type="Submit" className={styles.button}>Log In</button>
            </form>
            <a href="/user/register" className={styles.a}>If you don't have account, so sign up</a>
      </div>
    );
}