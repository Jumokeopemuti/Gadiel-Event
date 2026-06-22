import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    quoteId: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: String,

    phone: String,

    eventType: {
      type: String,
      required: true,
    },

    eventDate: Date,

    location: String,

    budget: String,

    services: [String],

    message: String,

    source: {
      type: String,
      enum: ["website", "admin"],
      default: "website",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Quote ||
  mongoose.model("Quote", QuoteSchema);