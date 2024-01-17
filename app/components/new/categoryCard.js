import React from "react";

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

function CategoryCard({ menu, setShowMenu, selectedCategory, setSelectedCategory, setOrderCounter, selectedOrder, setSelectedOrder, tables, setTables }) {
  const { status } = selectedOrder;
  // If the category already exists in the counts object, increment its count by 1
  // If the category doesn't exist in the counts object, initialize it with a count of 1
  let itemCounts = menu.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
  const handleCloseMenu = () => {
    setShowMenu(false);
    // This is when user haven't place an order yet even though items were added.
    if(status === "Status") {
      setOrderCounter((prevOrderCounter) => prevOrderCounter - 1);
      // Find the index of the table with the current orderNumber
      const tableIndex = tables.findIndex(table => table.orderNumber === selectedOrder.orderNumber);
      if (tableIndex !== -1) {
        // If the table is found, update its orderNumber and occupied status
        setTables((prevTables) => prevTables.map((table, index) => 
          index === tableIndex ? { ...table, orderNumber: "", occupied: false } : table
        ));
      }
      setSelectedOrder((prevSelectedOrder) => ({
        ...prevSelectedOrder,
        orderNumber: "Order Number",
        tableName: "",
        items:[],
      }));
    }
  };
  
  return (
    <>
      <div className="bg-gray-100 flex justify-between w-3/6 fixed top-0 z-20 px-4 pt-9">
        <div className="pb-1 ml-2 text-lg text-green-800 font-bold">Our Menu</div>
        <button
          className="text-xs py-2 px-4 bg-red-700 text-white rounded-md z-10"
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
