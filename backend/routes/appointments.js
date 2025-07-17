// File: backend/routes/appointments.js
import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// POST /api/appointments - Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorName, specialty, patientName, email, phone, date, time } = req.body;

    if (!doctorName || !specialty || !patientName || !email || !phone || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const appointment = new Appointment({
      doctorName,
      specialty,
      patientName,
      email,
      phone,
      date,
      time,
    });

    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;