const cron = require("node-cron");
const { sendNotifications } = require("./Controllers/Notifications");

// Schedule cron job to run every 5 minutes
cron.schedule("* * * * *", () => {
  console.log("Running notification cron job");
  sendNotifications();
});
