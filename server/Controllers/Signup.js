const Employee = require("../ModalSchema/EmployeeSchema.js");
const { createSecretToken } = require("../Utils/index.js");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await Employee.create(req.body);
    const token = createSecretToken(user?._id);
    res.status(200).json({
      message: "User signed in successfully",
      status: 200,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error, "error");
  }
};
