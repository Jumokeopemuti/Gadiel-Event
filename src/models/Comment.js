import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    slug: String,
    name: String,
    email: String,
    message: String,
    date: String,
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);