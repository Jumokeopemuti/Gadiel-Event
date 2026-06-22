import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    eventType: String,
    eventDate: Date,
    budget: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Consultation ||
  mongoose.model(
    "Consultation",
    ConsultationSchema
  );