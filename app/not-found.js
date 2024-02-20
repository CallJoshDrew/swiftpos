"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [color, setColor] = useState('text-white');

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prevColor) => (prevColor === 'text-white' ? 'text-red-600' : 'text-white'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 min-w-full min-h-screen flex items-center justify-center z-10">
      <div className="text-center">
        <h1 className={`text-9xl rounded-md ${color} animate-pulse`}>404</h1>
        <p className="text-xl text-white mt-4 mb-8">Oops! The page you&apos;re looking for does not exist.</p>
        <Link href="/" className="px-4 py-2 rounded bg-green-700 text-white hover:bg-blue-700 transition-colors duration-300">
            Go Back Home
        </Link>
      </div>
    </div>
  );
}
