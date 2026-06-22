import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Admin",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
    },

    phone: String,

    bio: String,

    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);