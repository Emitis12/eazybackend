// jobs/emailAlerts.js
import { User } from "../models/User.js";
import { sendEmailAlert } from "../sockets/emailAlertSocket.js";
import logger from "../utils/logger.js";

/**
 * Notify all premium users in real-time about new deals or alerts
 */
export const notifyPremiumUsers = async () => {
  try {
    const users = await User.findAll({ where: { isPremium: true } });

    if (!users || users.length === 0) {
      logger.info("No premium users found to notify.");
      return;
    }

    users.forEach((user) => {
      try {
        sendEmailAlert({
          userId: user.id,
          title: "Premium Alert 🚀",
          message: "New deals and exclusive offers are available now!",
        });
      } catch (err) {
        logger.error(`Failed to send email alert to user ${user.id}: ${err.message}`);
      }
    });

    logger.info(`Sent email alerts to ${users.length} premium users.`);
  } catch (error) {
    logger.error(`Error in notifyPremiumUsers job: ${error.message}`);
  }
};

/**
 * Optional: Run this job periodically using node-cron
 * Example: run every hour
 * 
 * import cron from "node-cron";
 * cron.schedule("0 * * * *", notifyPremiumUsers);
 */
