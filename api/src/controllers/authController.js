import db from "../db_connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  sanitizeUserInput,
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validationsForRegisterPage.js";

const COOKIE_NAME = "auth_token";

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const user = await db("users").select("*").where({ email }).first();
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie(COOKIE_NAME, token, cookieOptions);
    return res.json({
      id: user.id,
      email: user.email,
      username: user.username || null,
      role: user.role || "user",
    });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const me = async (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db("users")
      .select("id", "email", "username", "role")
      .where({ id: payload.sub })
      .first();
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    return res.json(user);
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const logout = (_req, res) => {
  res.cookie(COOKIE_NAME, "", { ...cookieOptions, maxAge: 0 });
  return res.status(204).end();
};

export const register = async (req, res) => {
  try {
    let { email, username, password } = sanitizeUserInput(req.body || {});

    try {
      validateUsername(username);
      validateEmail(email);
      validatePassword(password);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const existing = await db("users").select("id").where({ email }).first();
    if (existing)
      return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const [created] = await db("users")
      .insert({ email, username, password_hash: passwordHash, role: "user" })
      .returning(["id", "email", "username"]);

    return res.status(201).json({
      id: created.id,
      email: created.email,
      username: created.username,
      role: "user",
    });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
