// models/Client.js

import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    source: {
      type: String,
      default: "Manual",
    },
    eventType: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);