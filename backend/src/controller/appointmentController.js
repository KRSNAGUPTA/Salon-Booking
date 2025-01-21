// Appointment Controller

import Appointment from "../model/appointmentModel.js"
import Salon from "../model/salonModel.js";

// Customer: Book an Appointment
export const bookAppointment = async (req, res) => {
  const { salonId, service, date, time } = req.body;

  if (!salonId || !service || !date || !time) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const salon = await Salon.findById(salonId);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    const appointment = await Appointment.create({
      salon: salonId,
      user: req.user._id,
      service,
      date,
      time,
    });

    return res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error.message);
    res.status(500).json({ message: "Failed to book appointment", error: error.message });
  }
};

export const handleAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  if (!status || !["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const appointment = await Appointment.findById(appointmentId).populate("salon");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (!appointment.salon.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "You are not authorized to handle this appointment" });
    }

    appointment.status = status;
    await appointment.save();

    return res.status(200).json({ message: `Appointment ${status} successfully`, appointment });
  } catch (error) {
    console.error("Error handling appointment:", error.message);
    res.status(500).json({ message: "Failed to update appointment status", error: error.message });
  }
};

export const viewAppointmentsForUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).populate("salon", "name");

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
};

export const viewAppointmentsForSalon = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      salon: { $in: await Salon.find({ owner: req.user._id }).select("_id") },
    });

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching salon appointments:", error.message);
    res.status(500).json({ message: "Failed to fetch salon appointments", error: error.message });
  }
};
