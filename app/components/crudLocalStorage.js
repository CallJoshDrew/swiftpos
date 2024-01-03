// All functuons must be export before can be used. 
// Create (Save) Data
export function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    const orderIndex = orders.findIndex(
      (prevOrder) => prevOrder.orderNumber === order.orderNumber
    );

    if (orderIndex !== -1) {
      orders[orderIndex] = order;
    } else {
      orders = [order, ...orders];
    }

    localStorage.setItem('orders', JSON.stringify(orders));
    // console.log(localStorage.getItem('orders'));
}

// Read (Get) Data
export function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// Update Data
export function updateOrder(updatedOrder) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.map(order => order.orderNumber === updatedOrder.orderNumber ? updatedOrder : order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Delete Data
export function deleteOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.orderNumber !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
}
