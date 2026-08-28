export function calcDays(pickupDate, pickupTime, returnDate, returnTime) {
  if (!pickupDate || !returnDate) return 1;

  const start = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
  const end = new Date(`${returnDate}T${returnTime || "00:00"}`);

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  return days > 0 ? days : 1;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function toISODate(date) {
  return date.toISOString().split("T")[0];
}

export function getToday() {
  return toISODate(new Date());
}

export function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toISODate(d);
}
