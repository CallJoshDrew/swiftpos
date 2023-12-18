import React from "react";

function Category({
  category,
  itemCount,
  selectedCategory,
  setSelectedCategory,
}) {
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

function CategoryButton({menu, selectedCategory, setSelectedCategory}) {
  let itemCounts = menu.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
  return (
    <div className="grid grid-cols-5 grid-rows-1 gap-4">
      <Category
        category="All"
        itemCount={menu.length}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Category
        category="Cakes"
        itemCount={itemCounts["Cakes"] || 0}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Category
        category="Dish"
        itemCount={itemCounts["Dish"] || 0}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Category
        category="Drinks"
        itemCount={itemCounts["Drinks"] || 0}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
export default React.memo(CategoryButton);