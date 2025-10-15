import chalk from "chalk";

export const logger = {
  info: (message, ...args) => console.log(chalk.blue("[INFO]"), message, ...args),
  success: (message, ...args) => console.log(chalk.green("[SUCCESS]"), message, ...args),
  warn: (message, ...args) => console.log(chalk.yellow("[WARN]"), message, ...args),
  error: (message, ...args) => console.error(chalk.red("[ERROR]"), message, ...args),
  debug: (message, ...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(chalk.magenta("[DEBUG]"), message, ...args);
    }
  },
};
