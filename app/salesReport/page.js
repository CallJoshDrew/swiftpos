"use client";
import { useState } from 'react';

export default function SalesReport() {
  const [selected, setSelected] = useState('today');

  const data = {
    today: [
      { transactions: 1, sales: 120 },
      { transactions: 2, sales: 130 },
      { transactions: 3, sales: 125 },
      { transactions: 4, sales: 145 },
      { transactions: 5, sales: 150 },
      { transactions: 6, sales: 140 },
      { transactions: 7, sales: 150 },
    ],
    weekly: [
      { transactions: 70, sales: 800 },
      { transactions: 75, sales: 850 },
      { transactions: 72, sales: 870 },
      { transactions: 80, sales: 860 },
    ],
    monthly: [
      { transactions: 300, sales: 3500 },
    ],
  };

  const maxSales = Math.max(...data.monthly.map((item) => item.sales));

  return (
    <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 py-10 px-4">
    <div className="bg-gray-100 text-black p-4">
      <h1 className="text-2xl mb-4">Sales Report</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelected('today')}
          className={`py-2 px-4 rounded-md ${selected === 'today' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
        >
          Today
        </button>
        <button
          onClick={() => setSelected('weekly')}
          className={`py-2 px-4 rounded-md ${selected === 'weekly' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setSelected('monthly')}
          className={`py-2 px-4 rounded-md ${selected === 'monthly' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
        >
          Monthly
        </button>
      </div>
      <div className="space-y-4">
        {data[selected].map((item, index) => (
          <div key={index} className="flex items-end space-x-2">
            <div style={{ height: `${(item.sales / maxSales) * 100}%`, width: '10px' }} className="bg-green-600" />
            <div>{`Transactions: ${item.transactions}, Sales: ${item.sales}`}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
