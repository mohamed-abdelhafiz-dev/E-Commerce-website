import { dayAfter } from "../scripts/utils/dayjs.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
export function deliveryOptionDate(deliveryOptionId) {
  let deliveryDate;
  if (deliveryOptionId === "1") {
    deliveryDate = dayAfter(7);
  } else if (deliveryOptionId === "2") {
    deliveryDate = dayAfter(3);
  } else {
    deliveryDate = dayAfter(1);
  }
  return deliveryDate;
}
