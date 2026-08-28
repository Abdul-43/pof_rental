import { protections } from "../data/protections";
import { extrasList } from "../data/extras";

export function getExtrasCost(extras, days) {
  if (!extras) return 0;
  let total = 0;

  for (let item of extrasList) {
    const val = extras[item.id];
    if (item.isQuantity && typeof val === "number" && val > 0) {
      total += item.price * val * days;
    } else if (val === true) {
      total += item.type === "PerDay" ? item.price * days : item.price;
    }
  }

  return total;
}

export function getProtectionCost(id, days) {
  const p = protections.find((item) => item.id === id);
  return p ? p.pricePerDay * days : 0;
}

export function calcTotals(booking, days) {
  const pricePerDay = booking.selectedCar ? booking.selectedCar.pricePerDay : 0;
  const baseRental = pricePerDay * days;
  const protectionTotal = getProtectionCost(booking.protection, days);
  const extrasTotal = getExtrasCost(booking.extras, days);

  const subtotal = baseRental + protectionTotal + extrasTotal;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;

  return {
    pricePerDay,
    baseRental,
    protectionTotal,
    extrasTotal,
    subtotal,
    tax,
    grandTotal
  };
}

export function formatPrice(amount) {
  return Number(amount || 0).toLocaleString("en-AE", {
    maximumFractionDigits: 2
  });
}
