export function formatDate(date) {
  const d = new Date(date); // ensure it's a Date object
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
