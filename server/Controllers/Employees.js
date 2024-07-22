const Employee = require("../ModalSchema/EmployeeSchema.js");

module.exports.UpdateEmployee = async (req, res, next) => {
  try {
    const { _id } = req.body;
    await Employee.updateOne({ _id: _id }, req.body);
    res.status(200).json({
      message: "Employee data updated successfully",
      status: 200,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getEmployees = async (req, res, next) => {
  try {
    const { company, isWorkspace } = req.body;
    const response = company
      ? await Employee.find({ company: company, role: "employee" })
      : await Employee.find({ role: "employee" });
    res.status(200).json({
      status: 200,
      message: "Employees list fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Employee.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: 200,
      message: "Employee deleted successfully",
    });
    next();
  } catch (error) {
    console.log(error);
  }
};
