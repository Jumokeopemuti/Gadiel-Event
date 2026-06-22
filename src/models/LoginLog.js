import mongoose from "mongoose";

const LoginLogSchema =
  new mongoose.Schema(
    {
      email: String,

      imageUrl: String,

      loginTime: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.LoginLog ||
  mongoose.model(
    "LoginLog",
    LoginLogSchema
  );