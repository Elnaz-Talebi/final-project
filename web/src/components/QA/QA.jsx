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

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        setQuestionInfo((prev) => ({ ...prev, email: data.email || "" }));
        setIsLoggedIn(true);
      } catch {}
    }
    fetchUser();
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
      setQuestionInfo((prev) => ({ ...prev, question: "" }));
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

  const faqs = [
    {
      question: "How do I register an account?",
      answer:
        "Click on the register button in the header, fill in your details, and submit the form.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use secure authentication and encryption methods to keep your data safe.",
    },
    {
      question: "Can I access my account from multiple devices?",
      answer:
        "Yes, you can log in from any device using your email and password.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Use the 'Forgot Password' option on the login page to reset your password via email.",
    },
    {
      question: "How often should I water my plants?",
      answer:
        "It depends on the type of plant. Most indoor plants need watering once a week, but always check the soil moisture first.",
    },
    {
      question: "Which plants are best for beginners?",
      answer:
        "Snake plants, pothos, aloe vera, and peace lilies are great beginner-friendly options.",
    },
    {
      question: "Do plants need direct sunlight?",
      answer:
        "Not always. Some plants like succulents need bright sunlight, while others like ferns grow well in low light.",
    },
    {
      question: "How do I know if my plant is unhealthy?",
      answer:
        "Yellow leaves, brown spots, drooping, or slow growth can indicate issues with watering, light, or nutrients.",
    },
    {
      question: "What type of soil is best for houseplants?",
      answer:
        "Most houseplants do well in well-draining potting mix. Succulents and cacti need sandy soil mixes.",
    },
    {
      question: "How can I prevent pests on my plants?",
      answer:
        "Check your plants regularly, keep the leaves clean, and use natural remedies like neem oil if pests appear.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.h1}>Help page</h1>

      <h1 className={styles.h1}>Frequently Asked Questions</h1>
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
            disabled={isLoggedIn}
          />
        </div>
        <div className={styles.input_section}>
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={questionInfo.question}
            onChange={handleChange}
            className={styles.input_bar}
          />
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
