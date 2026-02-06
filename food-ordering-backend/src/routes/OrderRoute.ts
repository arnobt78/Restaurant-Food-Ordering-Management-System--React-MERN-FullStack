import express from "express";
import verifyToken from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.get("/", verifyToken, OrderController.getMyOrders);
router.post("/checkout/create-checkout-session", verifyToken, OrderController.createCheckoutSession);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;
