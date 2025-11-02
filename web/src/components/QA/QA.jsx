"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function QA() {
  const [questionInfo, setQuestionInfo] = useState({ email: "", question: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState({
    visible: false,
    message: "",
    success: false,
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        setQuestionInfo({ email: data.email || "", question: "" });
        setIsLoggedIn(true);
      } catch {}
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/data/faqs.json");
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      }
    }
    fetchFaqs();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setQuestionInfo((prev) => ({ ...prev, [name]: value }));
  }

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, question } = questionInfo;
    if (!email || !question) {
      showPopup("Both fields are required.", false);
      return;
    }
    if (!validateEmail(email)) {
      showPopup("Please enter a valid email address.", false);
      return;
    }
    if (question.length > 500) {
      showPopup("Question is too long (max 500 characters).", false);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/question-answer/send-question`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, question }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        showPopup(data.error || "Failed to send question.", false);
        return;
      }
      showPopup("Your question has been sent!", true);
      setQuestionInfo({ email: "", question: "" }); // clear both fields
    } catch {
      showPopup("Failed to send question. Try again.", false);
    }
  }

  function showPopup(message, success) {
    setPopup({ visible: true, message, success });
    setTimeout(
      () => setPopup({ visible: false, message: "", success: false }),
      4000
    );
  }

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.h1}>Help page</h1>

      <h1 className={styles.h1_frequent}>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.section}>
          <h2
            className={`${styles.h2} ${styles.question}`}
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
          </h2>
          {activeIndex === index && (
            <p className={styles.answer}>{faq.answer}</p>
          )}
        </div>
      ))}

      <h1 className={styles.h1}>Have another question?</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.h2}>Fill the form and send the question!</h2>
        <div className={styles.input_section}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={questionInfo.email}
            onChange={handleChange}
            className={styles.input_bar}
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.input_section}>
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            name="question"
            value={questionInfo.question}
            onChange={handleChange}
            className={styles.textarea_bar}
            placeholder="Type your question here (max 500 characters)"
            maxLength={500}
          />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            {questionInfo.question.length}/500 characters
          </p>
        </div>
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>

      {popup.visible && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            style={{ backgroundColor: popup.success ? "#48A830" : "#dc3545" }}
          >
            {popup.message}
          </div>
        </div>
      )}
    </div>
  );
}
