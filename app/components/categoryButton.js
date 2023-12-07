import React from 'react'

export default function CategoryButton({
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