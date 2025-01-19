import { Router } from "express";
import { addService, getAllSalons, registerSalon, removeService, updateService } from "../controller/salonController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/", (_, res) => {
  return res.status(200).json({
    message: "Welcome to the API for a Salon Booking Website",
  });
});

router.get("/",(_, res) => {
    return res.status(200).json({
    message: "Welcome to the API for a Salon Booking Website",
  });
});
router.get("/allSalon",getAllSalons)
router.post("/register",protect,registerSalon)
router.post("/:id/add-service",protect,addService)
router.delete("/:id/remove-service",protect,removeService)
router.patch("/:salonId/:serviceId/update-service",protect,updateService)
export default router;