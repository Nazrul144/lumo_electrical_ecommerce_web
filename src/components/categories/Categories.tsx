"use client";

import { Playfair_Display } from "next/font/google";
import { useState, useRef } from "react";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you want
  display: "swap",
});

const menuItems = [
  "Circuit Breakers",
  "Switches & Sockets",
  "Wire & Cables",
  "Distribution Boards",
  "Cable Management",
  "Switchgear",
  "Indoor Fittings",
  "Outdoor Lighting",
  "Smart Devices",
  "Energy Meters",
  "Surge Protection",
  "Power Tools",
  "Transformers",
  "Generators",
  "LED Lights",
  "Extension Cords",
  "Electrical Panels",
  "Motors",
  "Sensors",
  "Timers & Relays",
  "UPS Systems",
  "Conduits & Pipes",
  "Fuses & Holders",
  "Electrical Accessories"
]


const Categories = () => {
  const [active, setActive] = useState("Circuit Breakers");
  const [filter, setFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "up" | "down", type: "desktop" | "mobile") => {
    const ref = type === "desktop" ? desktopRef.current : mobileRef.current;
    if (ref) {
      const scrollAmount = 100;
      ref.scrollBy({
        top: direction === "down" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex relative w-64  bg-white flex flex-col  lg:mt-20">
        {/* Scrollable menu */}
        <div
          ref={desktopRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          <ul className="space-y-2 p-4">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`cursor-pointer rounded-md px-3 py-4 text-sm font-medium flex items-center ${
                  active === item
                    ? "bg-gradient-to-r from-[#088347] to-[#b1ce23] text-white "
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item} 
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll buttons */}
        <div className="flex justify-between p-2 border-t">
          <button
            onClick={() => scroll("up", "desktop")}
            className="w-10 h-10 rounded-full bg-[#C6E824] hover:bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            ↑
          </button>
          <button
            onClick={() => scroll("down", "desktop")}
            className="w-10 h-10 text rounded-full bg-[#088347] hover:bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            ↓
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            <IoClose />
          </button>
        </div>

        <div
          ref={mobileRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          <ul className="space-y-2 p-4">
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setActive(item);
                  setSidebarOpen(false);
                }}
                className={`cursor-pointer rounded-md px-3 py-4 text-sm font-medium ${
                  active === item
                    ? "bg-gradient-to-r from-[#088347] to-[#b1ce23] text-white lg:text-xl"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between p-2 border-t">
          <button
            onClick={() => scroll("up", "mobile")}
            className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            ↑
          </button>
          <button
            onClick={() => scroll("down", "mobile")}
            className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            ↓
          </button>
        </div>
      </div>

      {/* Hamburger Button for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        <HiMenu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dynamic Content Area */}
      <div className="flex-1 p-6 overflow-y-auto ">
        {/* Top middle search + filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="flex-1 min-w-[250px] sm:max-w-[120px] rounded-md border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Center Title */}
          <div className="flex justify-center flex-1 lg:mr-20">
            <h1 className={`${playfair.className} text-xl text-[#07484A]`}>
              {active}
            </h1>
          </div>

          {/* Filter Dropdown */}
          {/* <BsFilterLeft className="text-4xl"/> */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1  sm:max-w-[140px] rounded-md border px-3 py-3  focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl"
          >
          
            <option value="All">Sort by</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Electrical">Electrical</option>
            <option value="Smart Devices">Smart Devices</option>
          </select>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-white border rounded-lg shadow-sm flex items-center justify-center text-gray-500"
            >
              {active} Item {i + 1} ({filter})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
