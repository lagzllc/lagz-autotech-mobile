// backend/src/middleware/techAuth.js
import jwt from "jsonwebtoken";

export default function techAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "technician") {
      return res.status(403).json({ error: "Forbidden — Technicians only" });
    }

    req.tech = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
