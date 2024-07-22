const {
  getEmployees,
  UpdateEmployee,
  deleteEmployee,
} = require("../Controllers/Employees.js");
const { verifyToken } = require("../Middlewares/verifyToken.js");
const employeeRouter = require("express").Router();

employeeRouter.post("/", verifyToken, getEmployees);
employeeRouter.patch("/", verifyToken, UpdateEmployee);
employeeRouter.delete("/:id", verifyToken, deleteEmployee);

module.exports = employeeRouter;
