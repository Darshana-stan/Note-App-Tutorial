import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to the database first
connectDB()
  .then(() => {
    // Middleware to parse JSON
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );

    // Rate limiter middleware
    app.use(rateLimiter);

    // Middleware to log requests
    app.use((req, res, next) => {
      console.log(`Req method: ${req.method}, Req URL: ${req.url}`);
      next();
    });

    // Routes
    app.use("/api/notes", notesRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
