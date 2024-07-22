const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoutes");
const bodyParser = require("body-parser");
const workspaceRoute = require("./Routes/WorkspaceRoutes");
const employeesRoute = require("./Routes/EmployeesRoutes");
const notificationsRoute = require("./Routes/NotificationsRoute");

require("dotenv").config();

const { MONGO_URL, PORT } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully!"))
  .catch((err) => console.log(err));

app.use("", authRoute);
app.use("/workspace", workspaceRoute);
app.use("/employees", employeesRoute);
app.use("/notifications", notificationsRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
