import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from 'jotai/utils';
import { tablesAtom } from "../atoms/tablesAtom";
import { tableOrderCountAtom } from "../atoms/tableOrderCount";
import { takeAwayOrderCountAtom } from "../atoms/takeAwayOrderCount";
import { isLinkDisabledAtom } from "../atoms/linkDisableAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";
import { ordersAtom } from "../atoms/ordersAtom";

function CategoryButton({ category, itemCount, selectedCategory, setSelectedCategory }) {
  const isSelected = selectedCategory === category;
  return (
    <button
      className={`rounded-lg flex items-center justify-center flex-col py-4 shadow-md ${
        isSelected ? "bg-green-700 text-white" : "bg-white text-black"
      }`}
      onClick={() => setSelectedCategory(category)}>
      <div className="text-lg">{category}</div>
      <div className="text-xs">{itemCount} items</div>
    </button>
  );
}

function CategoryCard({
  menu,
  orderType,
  setShowMenu,
  selectedCategory,
  setSelectedCategory,
  setShowEditBtn,
  setShowEditControls,
  tempCartItems,
  setTempCartItems,
  setIsConfirmCloseModal,
  setShowRemarksBtn,
  setShowRemarksArea,
  remarks,
  tempRemarks,
}) {
  // Why need coma? when you destructure an array, you can choose which elements to assign to variables.
  // If you want to skip certain elements, you can leave their places empty.
  const [, setTables] = useAtom(tablesAtom);
  const [orders, setOrders] = useAtom(ordersAtom);

  const [, setIsLinkDisabled] = useAtom(isLinkDisabledAtom);    

  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);

    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;
  
    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);
  
  function useOrderCounter(orderType) {
    const [tableOrderCounter, setTableOrderCounter] = useAtom(tableOrderCountAtom);
    const [takeAwayOrderCounter, setTakeAwayOrderCounter] = useAtom(takeAwayOrderCountAtom);
  
    const orderCounter = orderType === "Dine-In" ? tableOrderCounter : takeAwayOrderCounter;
    const setOrderCounter =
      orderType === "Dine-In" ? setTableOrderCounter : setTakeAwayOrderCounter;
  
    return [orderCounter, setOrderCounter];
  }
  const [, setOrderCounter] = useOrderCounter(orderType);
  // Sort the items in tempCartItems and selectedOrder.items by their id
  const sortedTempCartItems = [...tempCartItems].sort((a, b) => a.item.id - b.item.id);
  const sortedSelectedOrderItems = [...selectedOrder.items].sort((a, b) => a.item.id - b.item.id);
  function compareQuantities(items1, items2) {
    // If the arrays are not the same length, they are not the same
    if (items1.length !== items2.length) {
      return false;
    }
    for (let i = 0; i < items1.length; i++) {
      // Find the corresponding item in items2
      const correspondingItem = items2.find((item2) => item2.item.id === items1[i].item.id);
      // If there's no corresponding item or the quantities are not the same, return false
      if (!correspondingItem || items1[i].quantity !== correspondingItem.quantity) {
        return false;
      }
    }
    // If we've made it this far, the quantities are the same for all items
    return true;
  }

  // If the category already exists in the counts object, increment its count by 1
  // If the category doesn't exist in the counts object, initialize it with a count of 1
  let itemCounts = menu.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
  const handleCloseMenu = () => {
    // close if it is the same items and status is "Placed Order"
    if (selectedOrder?.status === "Placed Order" && remarks !== tempRemarks) {
      setIsConfirmCloseModal(true);
    } else if (
      selectedOrder?.status === "Placed Order" &&
      compareQuantities(sortedTempCartItems, sortedSelectedOrderItems) &&
      remarks === tempRemarks
    ) {
      // setIsLinkDisabled(false);Debugging now, thus disabled this. 
      setShowMenu(false);
      setShowEditBtn(true);
      console.log("Set to true from closeMenu");
      setShowEditControls(false);
      setShowRemarksBtn(false);
      if (remarks === "" && tempRemarks === "") {
        setSelectedOrder((prevSelectedOrder) => ({
          ...prevSelectedOrder,
          remarks: "No Remarks",
        }));
      }
    } else if (
      selectedOrder?.status === "Placed Order" &&
      !compareQuantities(sortedTempCartItems, sortedSelectedOrderItems) &&
      remarks === tempRemarks
    ) {
      setIsConfirmCloseModal(true);
      console.log("items are not the same, but remarks the same");
    } else if (
      selectedOrder?.status === "Placed Order" &&
      !compareQuantities(sortedTempCartItems, sortedSelectedOrderItems) &&
      remarks !== tempRemarks
    ) {
      setIsConfirmCloseModal(true);
      console.log("items and remarks are not the same");
    } else if (
      selectedOrder?.status === "Status" &&
      compareQuantities(sortedTempCartItems, sortedSelectedOrderItems)
    ) {
      setOrderCounter((prevOrderCounter) => prevOrderCounter - 1);
      if (selectedOrder?.orderType === "Dine-In") {
        setTables((prevTables) => {
          return prevTables.map((table) => {
            if (table.orderNumber === selectedOrder?.orderNumber) {
              const { orderNumber, occupied, ...rest } = table;
              return rest;
            } else {
              return table;
            }
          });
        });
      }
      setSelectedOrder((prevSelectedOrder) => ({
        ...prevSelectedOrder,
        orderNumber: "Order Number",
        tableName: "",
        items: [],
      }));
      // setIsLinkDisabled(false); Debugging now, thus disabled this. 
      setShowMenu(false);
      setShowEditBtn(false);
      console.log("set to false from category");
      setShowEditControls(false);
      setShowRemarksBtn(false);
      setShowRemarksArea(false);
    } else if (
      selectedOrder?.status === "Status" &&
      !compareQuantities(sortedTempCartItems, sortedSelectedOrderItems)
    ) {
      setIsConfirmCloseModal(true);
    }
  };

  useEffect(() => {
    // This function will be called whenever `selectedOrder` changes
    setOrders((prevOrders) => {
      // Find the order in `prevOrders` that matches `selectedOrder`
      const orderIndex = prevOrders.findIndex(
        (order) => order.orderNumber === selectedOrder.orderNumber
      );
  
      if (orderIndex === -1) {
        // If the order is not found, add it to `prevOrders`
        return [...prevOrders, selectedOrder];
      } else {
        // If the order is found, replace it with `selectedOrder`
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex] = selectedOrder;
        return updatedOrders;
      }
    });
  }, [selectedOrder, setOrders]); // Dependencies of the effect
  
  return (
    <>
      <div className="bg-gray-100 flex justify-between w-3/6 fixed top-0 z-20 px-4 pt-9">
        <div className="pb-1 ml-2 text-lg text-green-800 font-bold">Our Menu</div>
        <button
          className="text-xs py-2 px-4 bg-red-600 text-white rounded-md z-10"
          onClick={() => handleCloseMenu()}>
          x Close Menu
        </button>
      </div>
      <div className="grid grid-cols-5 grid-rows-1 gap-4 fixed top-16 z-10 p-4 w-3/6 bg-gray-100">
        <CategoryButton
          category="All"
          itemCount={menu.length}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <CategoryButton
          category="Cakes"
          itemCount={itemCounts["Cakes"] || 0}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <CategoryButton
          category="Dish"
          itemCount={itemCounts["Dish"] || 0}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <CategoryButton
          category="Drinks"
          itemCount={itemCounts["Drinks"] || 0}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </>
  );
}

export default React.memo(CategoryCard);
