import mongoose, { Schema } from "mongoose";
const appointmentSchema = new Schema({
    salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  });
  
export default mongoose.model("Appointment", appointmentSchema);