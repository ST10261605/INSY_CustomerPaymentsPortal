import express from "express";
import Payment from "../models/Payment.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/payments", authMiddleware, async (req, res) => {
  const { amount, currency, provider, recipientAccount, swiftCode } = req.body;
  try {
    const payment = new Payment({
      userId: req.user.userId,
      amount,
      currency,
      provider,
      recipientAccount,
      swiftCode
    });
    await payment.save();
    res.status(201).json({ msg: "Payment created", payment });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
