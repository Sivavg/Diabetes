import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST route to save a new message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
      return res.status(400).json({ success: false, message: "Email must end with @gmail.com" });
    }

    // Create and save the message
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;