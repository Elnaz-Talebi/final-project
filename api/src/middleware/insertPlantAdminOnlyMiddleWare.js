import jwt from "jsonwebtoken";
import db from "../db_connection.js";

const COOKIE_NAME = "auth_token";

export async function adminOnly(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db("users")
      .select("role")
      .where({ id: payload.sub })
      .first();

    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (user.role !== "admin")
      return res
        .status(403)
        .json({ error: "Forbidden: Only Admins Can Access This Link" });

    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
