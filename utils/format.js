import moment from "moment";

export const format = {
  currency: (amount, symbol = "₦") => {
    if (!amount && amount !== 0) return `${symbol}0.00`;
    return `${symbol}${Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  },

  date: (date, formatStr = "YYYY-MM-DD") => {
    if (!date) return null;
    return moment(date).format(formatStr);
  },

  datetime: (date, formatStr = "YYYY-MM-DD HH:mm:ss") => {
    if (!date) return null;
    return moment(date).format(formatStr);
  },

  shortText: (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  },

  phone: (number) => {
    if (!number) return "";
    return number.replace(/\D/g, "").replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");
  },
};
