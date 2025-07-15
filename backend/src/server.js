import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Connect to the database first
connectDB()
  .then(() => {
    // Middleware to parse JSON
    app.use(express.json());

    if (process.env.NODE_ENV !== "production") {
          app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );
    }


    // Rate limiter middleware
    app.use(rateLimiter);

    // Middleware to log requests
    app.use((req, res, next) => {
      console.log(`Req method: ${req.method}, Req URL: ${req.url}`);
      next();
    });

    // Routes
    app.use("/api/notes", notesRoutes);

    //providing static files from the frontend build directory
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/dist")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
      });
    }

    // Start the server
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
