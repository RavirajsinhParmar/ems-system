const Employee = require("../ModalSchema/EmployeeSchema");

module.exports.sendNotifications = async (req, res) => {
  try {
    // Example: Send notifications to each user
    const notification = {
      message: "Hi! Your have new notification",
      createdAt: new Date(),
    };
    res.status(200).json(notification);
    console.log(`Notification sent to user` + new Date());
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};
