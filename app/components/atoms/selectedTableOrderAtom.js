import { atomWithStorage } from 'jotai/utils';

// Define your atom with localStorage
export const selectedTableOrderAtom = atomWithStorage('selectedTableOrder', {
  orderNumber: "Order Number",
  tableName: "",
  orderType: "Dine-In",
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
});
