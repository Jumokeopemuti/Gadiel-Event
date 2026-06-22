import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Gadiel Event",
    },

    readTime: String,

    quote: String,

    tags: [String],

    introduction: [String],

    sections: [
      {
        heading: String,
        image: String,
        content: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);