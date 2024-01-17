"use client";
import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Tables from "./tables/page";

export default function Home() {
  const [menu, setMenu] = useState([]); // Stores the menu items
  // Fetch the menu data when the component mounts
  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <Tables menu={menu}/>
    </>
  );
}
