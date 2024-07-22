const Employee = require("../ModalSchema/EmployeeSchema.js");
const Workspace = require("../ModalSchema/WorkspaceSchema.js");
const { createSecretToken } = require("../Utils/index.js");
const bcrypt = require("bcryptjs");

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password, isWorkspace } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = isWorkspace
      ? await Workspace.findOne({ email: email })
      : await Employee.findOne({ email: email });

    if (!user?.isActive) {
      return res.status(400).json({
        success: false,
        message: "Opps! User is not active",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password or email",
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password or email",
      });
    } else {
      const token = createSecretToken(user._id);
      res.status(200).json({
        message: "User logged in successfully",
        status: 200,
        user: isWorkspace
          ? {
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              logo: user.logo,
              role: user.role,
              _id: user._id,
              token: token,
              isWorkspace,
            }
          : {
              name: user.name,
              email: user.email,
              phone: user.phone,
              dob: user.dob,
              company: user.company,
              department: user.department,
              profilePicture: user.profilePicture,
              role: user.role,
              token: token,
              _id: user._id,
            },
      });
      next();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Employee.findOneAndUpdate({ email }, req.body);
    res.status(200).json({
      message: "User updated successfully",
      status: 200,
      user: {
        name: user.name,
        email: user.email,
        phone: user.mobile,
        dob: user.dob,
        company: user.company,
        department: user.department,
        profilePicture: user.profilePicture,
        _id: user._id,
      },
    });
    next();
  } catch (error) {
    console.error(error, "error");
  }
};
