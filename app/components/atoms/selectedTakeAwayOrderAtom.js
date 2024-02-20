import { atomWithStorage } from "jotai/utils";

// Define your atom with localStorage
export const selectedTakeAwayOrderAtom = atomWithStorage("selectedTakeAwayOrder", {
  orderNumber: "Order Number",
  orderType: "TakeAway",
  orderTime: null,
  orderDate: null,
  status: "Status",
  items: [],
  subTotal: 0,
  serviceCharge: 0,
  totalPrice: 0,
  quantity: 0,
  paymentMethod: "",
  remarks: "No Remarks",
  showEditBtn: false,
});
