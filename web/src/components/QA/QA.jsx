"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function QA() {
    const [questionInfo, setQuestionInfo] = useState({ email: "", question: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setQuestionInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return(
    <div className={styles.main_container}>
        <h1 className={styles.h1}>Help page</h1>
        <section className={styles.section}>
            <h2 className={styles.h2}>Where can I see all the plants?</h2>
            <p>Just click on the “All Plants” page – it’s like a big digital garden waiting for you. 🌱</p>
        </section>
        <section className={styles.section}>
            <h2 className={styles.h2}>Do I need an account to buy a plant?</h2>
            <p>Nope! You can browse freely, but if you want to buy (or keep track of your favorites), logging in makes things easier.</p>
        </section>
        <section className={styles.section}>
            <h2 className={styles.h2}>What happens if I forget my plant’s name?</h2>
            <p>Don’t worry – every plant has its own page, so you can always go back and check. No plant gets left behind! 🌿</p>
        </section>
        <h1 className={styles.h1}>Have another question?</h1>
        <form className={styles.form}>
                <h2 className={styles.h2}>Fill the form and send the question!</h2>
                <div className={styles.input_section}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={questionInfo.email} onChange={handleChange} className={styles.input_bar} />
                </div>
                <div className={styles.input_section}>
                <label htmlFor="question">Question</label>
                <input type="text" id="question" name="question" value={questionInfo.question} onChange={handleChange} className={styles.input_bar} />
                </div>
                <button type="submit" className={styles.button}>Send</button>
        </form>
        </div>
    )
}