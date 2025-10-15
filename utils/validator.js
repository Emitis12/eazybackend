export const validator = {
  isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  
  isPhone: (phone) => /^\+?[0-9]{10,15}$/.test(phone),

  isStrongPassword: (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),

  isNotEmpty: (value) => value !== undefined && value !== null && value.toString().trim() !== "",

  sanitizeString: (str) => str?.toString().trim() || "",
};
