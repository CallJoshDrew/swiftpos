"use client";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { todayRegisteredAtom } from "../components/atoms/todayRegisteredAtom";
import { useRouter } from "next/navigation";
import CategoryForm from "../components/categoryForm";

export default function Setting() {
  const [todayRegistered, setTodayRegistered] = useAtom(todayRegisteredAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (todayRegistered.openForRegister === false) {
      setLoading(true);
      // toast.success("Please Register First", {
      //   duration: 1000,
      //   position: "top-center",
      //   reverseOrder: false,
      // });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [todayRegistered, router]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center z-10">
        <div className="loader ease-linear rounded-full border-4 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 py-10 px-4">
      <CategoryForm />
    </div>
  );
}
