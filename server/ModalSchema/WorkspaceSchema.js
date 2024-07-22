const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is required"],
    },
    email: {
      type: String,
      required: [true, "Your email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Your phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    address: {
      type: String,
      required: [true, "Your address is required"],
    },
    logo: {
      type: String,
    },
    role: {
      type: String,
      default: "workspace_admin",
    },
  },
  {
    timestamps: true,
  }
);

workspaceSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("workspace", workspaceSchema);
