import { Router } from "express";
import { getUserProfile, loginUser, registerUser } from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",protect, getUserProfile);
router.get("/", (_, res) => {
  return res.status(200).json({
    message: "Welcome to the API for a Salon Booking Website",
  });
});
export default router;