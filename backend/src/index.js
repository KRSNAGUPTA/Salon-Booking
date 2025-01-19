import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import selonRoutes from "./routes/salonRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the API for a Salon Booking Website",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/salon", selonRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
