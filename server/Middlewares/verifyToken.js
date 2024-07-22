const Employee = require("../ModalSchema/EmployeeSchema.js");
const jwt = require("jsonwebtoken");
const Workspace = require("../ModalSchema/WorkspaceSchema.js");

module.exports.verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Login required",
      });
    }
    const { isWorkspace } = req.body;
    const accessToken = req.headers.authorization.split(" ")?.[1];
    if (accessToken) {
      jwt.verify(accessToken, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Token was expired!" });
        }
        const userId = decoded.id;

        const user = isWorkspace
          ? await Workspace.findById({ _id: userId })
          : await Employee.findById({ _id: userId });
        if (!user?._id) {
          return res.status(400).json({
            message: "Invalid token, please login again.",
          });
        }
        req.userData = decoded.data;
        return next();
      });
    } else {
      return res.status(401).send({
        message: "Login required",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
