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
  showEditBtn: false,
});

// {orderNumber: '#Table1-0001', tableName: 'Table1', items:[0: {item: {id: 17, name: 'Goreng Kering', category: 'Dish', price: 9, image: '/gorengKering.png', price:"9", selection:true}, quantity: 1, selectedChoice: {name: 'Campur', price: 0}, selectedMeatLevel: 'Not Available', selectedAddOn:"Not Available"}]}