const Workspace = require("../ModalSchema/WorkspaceSchema.js");

module.exports.createWorkspace = async (req, res, next) => {
  try {
    const existingWorkspace = await Workspace.findOne({
      email: req.body.email,
    });
    if (existingWorkspace) {
      return res.status(400).json({ message: "Workspace already exists" });
    }
    const workspaceUser = await Workspace.create(req.body);
    res.status(200).json({
      message: "Workspace created successfully",
      status: 200,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.UpdateWorkspace = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const workspaceUser = await Workspace.findByIdAndUpdate(
      {
        _id: _id,
      },
      req.body
    );
    res.status(200).json({
      message: "Workspace updated successfully",
      status: 200,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports.getWorkspaces = async (req, res, next) => {
  try {
    const response = await Workspace.find();
    res.status(200).json({
      status: 200,
      message: "Workspace list fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params, "req");
    const response = await Workspace.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: 200,
      message: "Workspace deleted successfully",
    });
    next();
  } catch (error) {
    console.log(error);
  }
};
