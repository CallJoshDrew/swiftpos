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

function CategoryCard({
  menu,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  tempCartItems,
  setOrderCompleted,
  setShowMenu,
  setShowEditBtn,
  setMsgModalOpen,
}) {
  // Create an object to count the number of items in each category
  let itemCounts = menu.reduce((counts, item) => {
    // If the category already exists in the counts object, increment its count by 1
    // If the category doesn't exist in the counts object, initialize it with a count of 1
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  const handleCloseMenu = () => {
    // Check if cartItems and tempCartItems are arrays, if not, set them as empty arrays
    const cartItemsArray =
      cartItems && cartItems.items && Array.isArray(cartItems.items) ? cartItems.items : [];
    const tempCartItemsArray =
      tempCartItems && tempCartItems.items && Array.isArray(tempCartItems.items)
        ? tempCartItems.items
        : [];

    // Sort the items in cartItems and tempCartItems by their id
    const sortedCartItems = [...cartItemsArray].sort((a, b) => a.id - b.id);
    const sortedTempCartItems = [...tempCartItemsArray].sort((a, b) => a.id - b.id);

    // Check if the sorted cartItems and tempCartItems are the same or if tempCartItems is empty
    if (
      JSON.stringify(sortedCartItems) === JSON.stringify(sortedTempCartItems) ||
      tempCartItemsArray.length === 0
    ) {
      // If they are the same or tempCartItems is empty, close the menu, hide the edit button, and set order as completed
      setShowMenu(false);
      setShowEditBtn(false);
      setOrderCompleted(true);
    } else {
      // If they are not the same and tempCartItems is not empty, open the message modal
      setMsgModalOpen(true);
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
