import mongoose, { Schema } from "mongoose";

const salonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      match: [
        /^[0-9]{10}$/,
        "Please enter a valid 10-digit contact number",
      ],
    },
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, required: true },
      },
    ],
    openingHours: {
      start: { type: String, required: true }, 
      end: { type: String, required: true },   
    },
    images: [String], 
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Salon", salonSchema);
