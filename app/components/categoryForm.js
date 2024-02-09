"use client";
import { useState } from "react";

export default function Setting() {
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    if (response.ok) {
      setCategory("");
      alert("Category created successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="NewCategory"
      className="flex flex-col space-y-2">
      <div className="text-md px-1 text-gray-700">Add New Category</div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border border-gray-300 py-2 pl-4 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-green-800"
          placeholder="Enter Category Name"
        />
        <button
          type="submit"
          className="text-sm bg-green-800 text-white hover:bg-green-700 active:bg-green-900 focus:outline-none focus:ring focus:ring-green-600 rounded-md px-8">
          Create Category
        </button>
      </div>
    </form>
  );
}
