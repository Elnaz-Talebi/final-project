"use client";
export default function Button({ text, onClick }) {
  return (
    <button
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
