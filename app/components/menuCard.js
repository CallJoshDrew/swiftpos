import { useState } from 'react';
import Image from 'next/image';

function MenuItem({ item, addedItems, setAddedItems, itemCounts, setItemCounts }) {
  const isAdded = addedItems.includes(item.id);

  const handleClick = () => {
    if (isAdded) {
      setAddedItems(addedItems.filter((id) => id !== item.id));
    } else {
      setAddedItems([...addedItems, item.id]);
    }
  };

  const increaseCount = () => {
    setItemCounts({ ...itemCounts, [item.id]: (itemCounts[item.id] || 1) + 1 });
  };

  const decreaseCount = () => {
    if (itemCounts[item.id] > 0) {
      setItemCounts({ ...itemCounts, [item.id]: itemCounts[item.id] - 1 });
    }
  };

  return (
    <div
      key={item.id}
      className="flex flex-col relative rounded-lg bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
      <Image
        src="/sample.png"
        alt={item.name}
        width="100"
        height="100"
        className="sm:h24 w-32 object-cover m-2 rounded-lg"
      />
      <div className="mb-10 mx-2">
        <div className="text-xs text-gray-600 ml-1">{item.name}</div>
        <div className="block text-green-800 text-xs ml-1">{item.price}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2">
        {isAdded ? (
          <div className="flex justify-between px-2 py-1 bg-gray-200 rounded-md">
            <div className="flex items-center gap-x-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-800"
                onClick={decreaseCount}>
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm text-black">{itemCounts[item.id] || 1}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-800"
                onClick={increaseCount}>
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              className="bg-white text-green-800 text-xs py-1 px-2 rounded-md"
              onClick={handleClick}>
              Add
            </button>
          </div>
        ) : (
          <button
            className="block bg-[#cce9d4] text-black text-xs p-1 rounded-md w-full"
            onClick={handleClick}>
            add to table
          </button>
        )}
      </div>
    </div>
  );
}

export default function MenuCard({ menu, selectedCategory }) {
  const [addedItems, setAddedItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  if (selectedCategory !== "All") {
    menu = menu.filter((item) => item.category === selectedCategory);
  }

  return (
    <div className="group rounded-lg grid grid-cols-3 gap-2">
      {menu.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          addedItems={addedItems}
          setAddedItems={setAddedItems}
          itemCounts={itemCounts}
          setItemCounts={setItemCounts}
        />
      ))}
    </div>
  );
}

              
              