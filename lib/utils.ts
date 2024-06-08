import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPriceBDT(amount:number, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return negativeSign + '৳' + (j ? i.substring(0, j) + thousands : '') + i.substring(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - parseFloat(i)).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
      console.log(e);
  }
};


export function calculateDeliveryFee(districkt: string) {
  if (districkt === "Dhaka") return 60;
  else return 120;
}


export function generateInvoiceId() {
  const prefix = "INV";
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  return `${prefix}-${randomNumber}`;
}