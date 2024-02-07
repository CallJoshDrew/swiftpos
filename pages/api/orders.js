let orders = [
  {
    orderNumber: "#TableL18-0001",
    tableName: "Table L18",
    orderType: "Dine-In",
    orderTime: "02:00 PM",
    orderDate: "Wed, Feb 07, 2024",
    status: "Completed",
    items: [
      {
        item: {
          id: 7,
          name: "Chicken Pie",
          category: "Cakes",
          price: 2.7,
          image: "/chickenPie.png",
        },
        quantity: 1,
      },
      {
        item: {
          id: 4,
          name: "Brown Swiss Roll",
          category: "Cakes",
          price: 2.4,
          image: "/brownSwissRoll.png",
        },
        quantity: 1,
      },
    ],
    subTotal: 5.1,
    serviceCharge: 0,
    totalPrice: 5.1,
    quantity: 2,
    paymentMethod: "",
    remarks: "No Remarks",
  },
  {
    orderNumber: "#Table8-0002",
    tableName: "Table 8",
    orderType: "Dine-In",
    orderTime: "02:18 PM",
    orderDate: "Wed, Feb 07, 2024",
    status: "Placed Order",
    items: [
      {
        item: { id: 3, name: "HawFlakes", category: "Cakes", price: 4.2, image: "/hawFlakes.png" },
        quantity: 1,
      },
    ],
    subTotal: 4.2,
    serviceCharge: 0,
    totalPrice: 4.2,
    quantity: 1,
    paymentMethod: "",
    remarks: "No Remarks",
  },
  {
    orderNumber: "#Table5-0003",
    tableName: "Table 5",
    orderType: "Dine-In",
    orderTime: "02:30 PM",
    orderDate: "Wed, Feb 07, 2024",
    status: "Paid",
    items: [
      {
        item: { id: 12, name: "Steam Cake", category: "Cakes", price: 2, image: "/steamCake.png" },
        quantity: 1,
      },
      {
        item: {
          id: 6,
          name: "Chicken Fross",
          category: "Cakes",
          price: 3,
          image: "/chickenFross.png",
        },
        quantity: 1,
      },
    ],
    subTotal: 5,
    serviceCharge: 0,
    totalPrice: 5,
    quantity: 2,
    paymentMethod: "Cash",
    remarks: "No Remarks",
    amountChange: 0,
    amountReceived: 5,
    paymentTime: "02:26 AM, Wed, Feb 07, 2024",
  },
  {
    cancellationTime: "03:02 PM",
    orderNumber: "#Table3-0004",
    tableName: "Table 3",
    orderType: "Dine-In",
    orderTime: "03:00 PM",
    orderDate: "Wed, Feb 07, 2024",
    status: "Cancelled",
    items: [
      {
        item: { id: 3, name: "HawFlakes", category: "Cakes", price: 4.2, image: "/hawFlakes.png" },
        quantity: 1,
      },
    ],
    subTotal: 4.2,
    serviceCharge: 0,
    totalPrice: 4.2,
    quantity: 1,
    paymentMethod: "",
    remarks: "No Remarks",
  },
];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, category } = req.body;

    // create a new id for the new order item
    const id = orders.length + 1;

    // add the new orders item to the orders array
    orders.push({ id, name, category });

    res.status(200).json({ message: "Orders added successfully" });
  } else if (req.method === "GET") {
    // if the request method is GET, return the orders
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
