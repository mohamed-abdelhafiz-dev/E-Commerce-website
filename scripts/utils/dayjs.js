import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export function dayAfter(daysNum) {
  const today = dayjs();
  return today.add(daysNum, "days").format("dddd, MMMM D");
}
