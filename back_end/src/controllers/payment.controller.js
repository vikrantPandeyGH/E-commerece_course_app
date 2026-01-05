import razorpay from "../config/razorpay.js";
import courseModel from "../models/course.model.js";

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const options = {
      amount: course.price * 100, // Razorpay paisa me leta hai
      currency: "INR",
      receipt: `receipt_${courseId}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create order",
      error: err.message,
    });
  }
};


//payment verification part

import crypto from "crypto";
import purchaseModel from "../models/purchase.model.js";

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    const alreadyPurchased = await purchaseModel.findOne({
      userId: req.user.id,
      courseId,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        message: "Course already purchased",
      });
    }


    // ✅ payment verified → save purchase
    const purchase = await purchaseModel.create({
      userId: req.user.id,
      courseId,
    });

    return res.status(200).json({
      message: "Payment verified & course purchased",
      purchase,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Payment verification error",
      error: err.message,
    });
  }
};

