// backend/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["citizen", "admin", "contractor", "superadmin"],
      default: "citizen",
    },
    city: { type: String }, // For City Admins
    isSuperAdmin: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
