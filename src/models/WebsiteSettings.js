// models/WebsiteSettings.js

import mongoose from "mongoose";

const WebsiteSettingsSchema =
  new mongoose.Schema(
    {
      businessName: String,
      email: String,
      phone: String,
      address: String,
      website: String,
      instagram: String,
      logo: String,
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.WebsiteSettings ||
  mongoose.model(
    "WebsiteSettings",
    WebsiteSettingsSchema
  );