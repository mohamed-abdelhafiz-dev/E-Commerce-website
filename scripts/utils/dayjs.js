import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export function dayAfter(daysNum) {
  const today = dayjs();
  return today.add(daysNum, "days").format("dddd, MMMM D");
}
export function formatDate(date = dayjs()) {
  return dayjs(date).format("MMMM D");
}
export function formatDateDay(date) {
  return dayjs(date).format("dddd, MMMM D");
}
export function today() {
  return dayjs();
}
export function day(date) {
  return dayjs(date);
}
