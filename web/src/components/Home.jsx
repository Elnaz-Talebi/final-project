"use client";
import Button from "./Button";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to final-project 🚀</h2>
      <Button text="Click me" onClick={() => alert("Button clicked!")} />
    </div>
  );
}
