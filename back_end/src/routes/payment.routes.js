import express from "express";
const router = express.Router();

import { verifyPayment } from "../controllers/payment.controller.js";
import { createOrder } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

router.post("/create-order/:courseId", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

export default router;