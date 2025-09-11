import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

export const sendQuestion = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let { email, question } = req.body || {};

    email = sanitizeHtml(email || "", {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    question = sanitizeHtml(question || "", {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();

    if (!email || !question)
      return res.status(400).json({ error: "Both fields are required." });
    if (!/\S+@\S+\.\S+/.test(email))
      return res.status(400).json({ error: "Invalid email address." });
    if (question.length > 500)
      return res
        .status(400)
        .json({ error: "Question too long (max 500 chars)." });

    // Transporter defined before using
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OFFICIAL_EMAIL,
        pass: process.env.OFFICIAL_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Webshop QA" <${process.env.OFFICIAL_EMAIL}>`,
      replyTo: email,
      to: process.env.OFFICIAL_EMAIL,
      subject: `Webshop Question from ${email}`,
      text: question,
    });

    return res.status(200).json({ message: "Question sent successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send question." });
  }
};
