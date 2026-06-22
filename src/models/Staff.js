import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    role: String,

    image: String, 

    bio: String,   

    email: String,
    phone: String,
    department: String,
    address: String,
  },
  { timestamps: true }
);

export default mongoose.models.Staff ||
  mongoose.model("Staff", StaffSchema);