"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { ordersAtom } from "./atoms/ordersAtom";
import { tablesAtom } from "./atoms/tablesAtom";
import { tableOrderCountAtom } from "./atoms/tableOrderCountAtom";
import { takeAwayOrderCountAtom } from "./atoms/takeAwayOrderCountAtom";
import toast from "react-hot-toast";
import { isLinkDisabledAtom } from "./atoms/linkDisableAtom";
import { selectedTableOrderAtom } from "./atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "./atoms/selectedTakeAwayOrderAtom";
import { selectedTableIndexAtom } from "./atoms/selectedTableIndexAtom";
import { todayRegisteredAtom } from "./atoms/todayRegisteredAtom";
import { salesDataAtom } from "./atoms/salesDataAtom";

export default function SideNav() {
  const path = usePathname();
  const router = useRouter();
  const [, setOrders] = useAtom(ordersAtom);
  const [, setTables] = useAtom(tablesAtom);
  const [, setTableOrderCounter] = useAtom(tableOrderCountAtom);
  const [, setTakeAwayOrderCounter] = useAtom(takeAwayOrderCountAtom);
  const [isLinkDisabled, setIsLinkDisabled] = useAtom(isLinkDisabledAtom);
  const [, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
  const [, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);
  const [, setTableIndex] = useAtom(selectedTableIndexAtom);
  const [, setTodayRegistered] = useAtom(todayRegisteredAtom);
  const [, setSalesData] = useAtom(salesDataAtom);

  const [passwordInput, setPasswordInput] = useState("");

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClearLocalStorage = () => {
    if (showConfirmModal) {
      // setLoading(true);
      // Clear local storage
      setOrders([]);
      setSalesData({});
      setTables([]); // Reset to initial value
      setTableIndex(null);
      setTodayRegistered({ openForRegister: false });
      setTableOrderCounter(1);
      setTakeAwayOrderCounter(1);
      setSelectedTableOrder({
        orderNumber: "Order Number",
        tableName: "",
        orderType: "Dine-In",
        orderTime: null,
        orderDate: null,
        status: "Status",
        items: [],
        subTotal: 0,
        serviceCharge: 0,
        totalPrice: 0,
        quantity: 0,
        paymentMethod: "",
        remarks: "No Remarks",
      });
      setSelectedTakeAwayOrder({
        orderNumber: "Order Number",
        orderType: "TakeAway",
        orderTime: null,
        orderDate: null,
        status: "Status",
        items: [],
        subTotal: 0,
        serviceCharge: 0,
        totalPrice: 0,
        quantity: 0,
        paymentMethod: "",
        remarks: "No Remarks",
      });
      // setIsLinkDisabled(false);Debugging now, thus disabled this.
      // Do this for all atoms that use atomWithStorage

      setTimeout(() => {
        router.push("/");
      }, 1500);
      toast.success("Local Storage is cleared!", {
        duration: 1000,
        position: "top-center",
        reverseOrder: false,
      });
      setTimeout(() => {
        setShowConfirmModal(false);
      }, 1000);
    } else {
      // Show the confirmation modal
      setShowConfirmModal(true);
    }
  };

  return (
    <div className="py-10 w-1/6 flex-auto relative">
      <div className="fixed flex flex-col w-1/6 px-6">
        <div className="relative"></div>
        <div className="text-green-800 text-center font-bold text-sm">POS SYSTEM</div>
        <Link
          href="/tables"
          className={
            path === "/tables"
              ? "bg-green-800 rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
              : "rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6"
          }>
          <svg
            className={path === "/tables" ? "w-8 h-8 text-white" : "w-8 h-8 text-green-800"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
          <div className={path === "/tables" ? "text-white text-sm " : "text-black text-sm"}>
            Table
            {/* 来吹水 */}
          </div>
        </Link>
        <Link
          href="/takeAway"
          className={
            path === "/takeAway"
              ? "bg-green-800 rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
              : "rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
          }>
          <svg
            className={path === "/takeAway" ? "w-8 h-8 text-white" : "w-8 h-8 text-green-800"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
          <div className={path === "/takeAway" ? "text-white text-sm " : "text-black text-sm"}>
            Tapao
            {/* 来打包 */}
          </div>
        </Link>
        <Link
          href="/totalOrders"
          className={
            path === "/totalOrders"
              ? "bg-green-800 rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
              : "rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
          }>
          <svg
            className={path === "/totalOrders" ? "w-8 h-8 text-white" : "w-8 h-8 text-green-800"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          <div className={path === "/totalOrders" ? "text-white text-sm " : "text-black text-sm"}>
            Orders
            {/* 天下订单 */}
          </div>
        </Link>
        <Link
          href="/salesReport"
          className={
            path === "/salesReport"
              ? "bg-green-800 rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
              : "rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
          }>
          {/* // onClick={() => setIsReportsModalOpen(true)}> Later then change Link tag to button*/}
          <svg
            className={path === "/salesReport" ? "w-8 h-8 text-white" : "w-8 h-8 text-green-800"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
              clipRule="evenodd"
            />
          </svg>
          <div className={path === "/salesReport" ? "text-white text-sm " : "text-black text-sm"}>
            Report
            {/* 招財貓 */}
          </div>
        </Link>
        <button
          href="/setting"
          className={
            path === "/setting"
              ? "bg-green-800 rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
              : "rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
          }
          onClick={() => setIsSettingsModalOpen(true)}>
          <svg
            className={path === "/setting" ? "w-8 h-8 text-white" : "w-8 h-8 text-green-800"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
              clipRule="evenodd"
            />
            <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
            <path
              fillRule="evenodd"
              d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
          <div className={path === "/setting" ? "text-white text-sm " : "text-black text-sm"}>
            Settings
            {/* 唔好按 */}
          </div>
        </button>
        <div
          className="flex flex-col items-center mt-6 hover:bg-red-700 hover:rounded-md py-2 group"
          onClick={handleClearLocalStorage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-green-800 group-hover:text-gray-100">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          <div className="text-sm text-black group-hover:text-gray-100">
            Clear
            {/* 清除存储 */}
          </div>
        </div>
        {isReportsModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                ​
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Settings
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please enter your password to proceed.
                        </p>
                        <input
                          type="password"
                          className="mt-2 border rounded-md p-2 w-full text-gray-800"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      // Check password here
                      if (passwordInput === "SMH888") {
                        toast.success("Password is correct!", {
                          duration: 1000,
                          position: "top-center",
                          reverseOrder: false,
                        });
                        setTimeout(() => {
                          // If password is correct, navigate to the settings page
                          router.push("/salesReport");
                          setIsReportsModalOpen(false);
                          setPasswordInput("");
                        }, 1500);
                      } else {
                        setTimeout(() => {
                          // Close the modal
                          setIsReportsModalOpen(false);
                          // Clear the password input
                          setPasswordInput("");
                        }, 1500);

                        toast.error("Wrong Password!", {
                          duration: 1000,
                          position: "top-center",
                          reverseOrder: false,
                        });
                      }
                    }}>
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsReportsModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="fixed flex flex-col w-1/6 px-6 bottom-0">
        <Link
          href="/"
          className={
            path === "/logout"
              ? "bg-green-800 rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
              : "rounded-lg py-4 px-4 flex flex-col items-center mx-auto my-1 w-5/6 group"
          }>
          <svg
            className={
              path === "/logout" ? "w-8 h-8 text-white" : "w-8 h-8 text-green-800"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
          <div
            className={
              path === "/logout" ? "text-white text-sm " : "text-black text-sm"
            }>
            唔好走
          </div>
        </Link>
      </div> */}
      {isLinkDisabled && <div className="absolute inset-0 bg-gray-300 opacity-70"></div>}
      {isSettingsModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                ​
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Settings
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please enter your password to proceed.
                        </p>
                        <input
                          type="password"
                          className="mt-2 border rounded-md p-2 w-full text-gray-800"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      // Check password here
                      if (passwordInput === "SMH888") {
                        toast.success("Password is correct!", {
                          duration: 1000,
                          position: "top-center",
                          reverseOrder: false,
                        });
                        setTimeout(() => {
                          // If password is correct, navigate to the settings page
                          router.push("/setting");
                          setIsSettingsModalOpen(false);
                          setPasswordInput("");
                        }, 1500);
                      } else {
                        setTimeout(() => {
                          // Close the modal
                          setIsSettingsModalOpen(false);
                          // Clear the password input
                          setPasswordInput("");
                        }, 1500);

                        toast.error("Wrong Password!", {
                          duration: 1000,
                          position: "top-center",
                          reverseOrder: false,
                        });
                      }
                    }}>
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsSettingsModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {showConfirmModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              ​
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      All data for this app will be erased forever.
                    </h3>
                    <div className="mt-2">
                      <p className="text-lg text-gray-500">
                        Are you sure you want to clear local storage?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClearLocalStorage}>
                  Yes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfirmModal(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
