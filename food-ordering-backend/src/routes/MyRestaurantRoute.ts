import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import verifyToken from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get("/order", verifyToken, MyRestaurantController.getMyRestaurantOrders);
router.patch("/order/:orderId/status", verifyToken, MyRestaurantController.updateOrderStatus);
router.get("/", verifyToken, MyRestaurantController.getMyRestaurant);
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  verifyToken,
  MyRestaurantController.createMyRestaurant
);
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  verifyToken,
  MyRestaurantController.updateMyRestaurant
);

export default router;
