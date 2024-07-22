const {
  createWorkspace,
  getWorkspaces,
  UpdateWorkspace,
  deleteWorkspace,
} = require("../Controllers/Workspace.js");
const { verifyToken } = require("../Middlewares/verifyToken.js");
const workspaceRouter = require("express").Router();

workspaceRouter.get("/", getWorkspaces);
workspaceRouter.post("/", verifyToken, createWorkspace);
workspaceRouter.patch("/", verifyToken, UpdateWorkspace);
workspaceRouter.delete("/:id", verifyToken, deleteWorkspace);

module.exports = workspaceRouter;
