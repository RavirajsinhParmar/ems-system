const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  company: {
    type: String,
    required: [true, "Your company name is required"],
  },
  phone: {
    type: String,
    required: [true, "Your mobile number is required"],
  },
  dob: {
    type: Date,
    required: [true, "Your date of birth is required"],
  },
  department: {
    type: String,
    required: [true, "Your department is required"],
  },
  profilePicture: {
    type: Object,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  role: {
    type: String,
    default: "employee",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  joiningDate: {
    type: Date,
    default: new Date(),
  },
});

employeeSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("employee", employeeSchema);
