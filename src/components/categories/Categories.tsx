"use client";

import { Card } from "antd";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useState, useRef } from "react";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Sidebar menu
const menuItems = [
  "Circuit Breakers",
  "Switches & Sockets",
  "Wire & Cables",
  "Distribution Boards",
  "Smart Devices",
  "Power Tools",
  "LED Lights",
  "Outdoor Lighting",
  "Energy Meters",
  "Generators",
  "Transformers",
  "Cable Management",
  "Indoor Fittings",
  "Extension Cords",
  "Surge Protection",
];

// Product data based on menu item
const productsData: Record<string, { name: string; image: string }[]> = {
  "Circuit Breakers": [
    {
      name: "Mini Circuit Breaker",
      image:
        "https://download.schneider-electric.com/files?p_Doc_Ref=HDB3w_IMG&p_File_Type=rendition_1500_jpg",
    },
    {
      name: "Molded Case Circuit Breaker",
      image:
        "https://www.gses.com.au/wp-content/uploads/2017/10/Mccb-e1612398523722.jpg",
    },
    {
      name: "Load Breaker",
      image:
        "https://vikiwat.com/userfiles/productimages/119955/product_large_141850.jpg",
    },
    {
      name: "Vacuum Circuit Breaker",
      image:
        "https://image.made-in-china.com/2f0j00wPqbQWTzavoG/Vsg1-12-Vacuum-Circuit-Breaker-Indoor-Type.webp",
    },
    {
      name: "SF6 Circuit Breaker",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/3/HG/XH/PI/11340491/sf6-circuit-breaker.jpg",
    },
    {
      name: "Air Circuit Breaker",
      image:
        "https://iallway.com/wp-content/uploads/2024/02/78805a221a988e79ef3f.png",
    },
  ],

  "Switches & Sockets": [
    {
      name: "Modern Wall Socket",
      image: "https://image.made-in-china.com/202f0j00oedquznRwAks/T3-Wholesale-New-Design-PC-Ultra-Thin-Wall-Switch-Socket-Modern-Luxury-Wall-Switch-Switches-and-Socket.webp",
    },
    {
      name: "Smart Switch Board",
      image: "https://5.imimg.com/data5/HO/SJ/PD/SELLER-67963114/smart-switch-boards.jpg",
    },
    {
      name: "Universal Plug",
      image: "https://gadgetbreeze.com.bd/wp-content/uploads/2025/05/Mcdodo-CP-614-100W-GaN-Universal-Travel-Adapter-with-100w-C-to-C-Cable-430x430.jpg",
    },
  ],

  "Wire & Cables": [
    {
      name: "Electric Copper Cable",
      image: "https://m.media-amazon.com/images/I/81opAzJl5kL._SL1465_.jpg",
    },
    {
      name: "Power Wire Bundle",
      image: "https://m.media-amazon.com/images/I/41QqyMrjZlS._UF1000,1000_QL80_.jpg",
    },
    {
      name: "Armored Cable",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/11/AU/UJ/WJ/3446694/polycab-armored-cable.jpg",
    },
    {
      name: "Coaxial Cable",
      image: "https://milcom.edu.au/wp-content/uploads/2019/10/coaxial-cable-1280x720.png",
    },
  ],

  "Distribution Boards": [
    {
      name: "Electrical Panel Board",
      image: "https://www.brilltech.co.in/images/products/img-control-panel-boards.jpg",
    },
    {
      name: "Fuse Box",
      image: "https://img.drz.lazcdn.com/static/bd/p/933ab82f179745c166ceafb62efece28.png_720x720q80.png",
    },
    {
      name: "Load Center Pane",
      image: "https://www.eaton.com/content/dam/eaton/products/low-voltage-power-distribution-controls-systems/load-centers/panelboard-loadcenter.jpg",
    },
    {
      name: "Meter Distribution Box",
      image: "https://y23.hongcdn.com/uploads/2203/pole-top-box-5-2-!m.jpg",
    },
    {
      name: "Electrical Panel Board",
      image: "https://www.brilltech.co.in/images/products/img-control-panel-boards.jpg",
    },
    {
      name: "Fuse Box",
      image: "https://img.drz.lazcdn.com/static/bd/p/933ab82f179745c166ceafb62efece28.png_720x720q80.png",
    },
  ],

  "Smart Devices": [
    {
      name: "Smart Home Hub",
      image: "https://blog-cdn.athom.com/uploads/2019/08/Homey-Pro-1-2000x1125.png",
    },
    {
      name: "Smart Light Controller",
      image: "https://m.media-amazon.com/images/I/61njqiDYYPS._SL1500_.jpg",
    },
    {
      name: "Smart Thermostat",
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HQ2E2_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=NThVdWM2Yk9SajVpMGpSRWgxREZOVlZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUTdyVWdQQklJZHo5NGFYZnc1NlNLN1E",
    },
  ],

  "Power Tools": [
    {
      name: "Electric Drill",
      image: "https://img.drz.lazcdn.com/static/bd/p/b8541eec74b99941faf71a25548de3e8.jpg_960x960q80.jpg_.webp",
    },
    {
      name: "Cordless Screwdriver",
      image: "https://admin.techshopbd.com/uploads/product/Cordless-Screwdriver-Set.jpg",
    },
    {
      name: "Angle Grinder",
      image: "https://www.eastmanshop.com/cdn/shop/files/EDG-100Nc_5b32af9f-3ecc-4c95-aabe-07d47286deca_700x700.jpg?v=1755949250",
    },
  ],

  "LED Lights": [
    {
      name: "LED Bulb",
      image: "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      name: "LED Strip Light",
      image: "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
    {
      name: "LED Bulb",
      image: "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      name: "LED Strip Light",
      image: "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
    {
      name: "LED Bulb",
      image: "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      name: "LED Strip Light",
      image: "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
  ],

  "Outdoor Lighting": [
    {
      name: "Garden Light",
      image: "https://img.drz.lazcdn.com/static/bd/p/dbba71738d214438f137c654c42e58a7.jpg_720x720q80.jpg",
    },
    {
      name: "Street Lamp",
      image: "https://thumbs.dreamstime.com/b/victorian-style-street-lamp-night-modern-electric-build-deep-yellow-light-produced-to-illuminate-streets-198835173.jpg",
    },
  ],

  "Energy Meters": [
    {
      name: "Smart Energy Meter",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolFwN0O4dYHeUCpHjPMkh3nElb1LokVUz4A&s",
    },
    {
      name: "Digital Meter Display",
      image: "https://cdn.roboticsbd.com/11381-home_default/dc-0-100v-10a-voltage-and-current-dual-led-display-panel-meter-robotics-bangladesh.jpg",
    },
  ],

  Generators: [
    {
      name: "Portable Generator",
      image: "https://static.thcdn.com/images/large/original//productimg/1600/1600/11655251-4715186688260835.jpg",
    },
    {
      name: "Diesel Generator",
      image: "https://media.sakurapower.com/pub/media/catalog/product/cache/144bfaf5ae6c8001de0bfb251a4f8b1e/3/3/33_kva_diesel_generator_4.jpg",
    },
  ],

  Transformers: [
    {
      name: "Power Transformer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ci769LbwmtOWSCVurka5LqdXdOtgwR2CcQ&s",
    },
    {
      name: "Distribution Transformer",
      image: "https://www.bowerselec.co.uk/app/uploads/2022/10/Fedral-stock-1500kVA-853x1024.jpg",
    },
  ],

  "Cable Management": [
    {
      name: "Cable Tray",
      image: "https://www.independenttechbd.com/wp-content/uploads/2024/06/cable-tray-1-500x500-1.jpg",
    },
    {
      name: "Cable Clips",
      image: "https://m.media-amazon.com/images/I/517KOWvxKpL.jpg",
    },
  ],

  "Indoor Fittings": [
    {
      name: "Ceiling Light",
      image: "https://images-cdn.ubuy.co.in/666f1d2788caec18320c4a76-caneoe-modern-led-ceiling-light-6000k.jpg",
    },
    {
      name: "Wall Lamp",
      image: "https://www.akway.in/cdn/shop/products/61rhOE5zxdL.jpg?v=1697352251&width=1445",
    },
  ],

  "Extension Cords": [
    {
      name: "Multi Plug Extension",
      image: "https://static-01.daraz.com.bd/p/f7f3a8b26a3f3368418881eb42c6208b.jpg",
    },
    {
      name: "Heavy Duty Extension Reel",
      image: "https://www.tronic.co.tz/cdn/shop/products/ER6527_c417e016-6c57-4bbc-8882-3f5363d071c4.jpg?v=1757514186",
    },
  ],

  "Surge Protection": [
    {
      name: "Surge Protector Power Strip",
      image: "https://djuly1j3idynn.cloudfront.net/userfiles/images/inriver/preview/74685_ig112663blk10.jpg",
    },
    {
      name: "Surge Protector Power Strip",
      image: "https://delta.com.bd/wp-content/uploads/2021/06/Sako-120-kVA-Voltage-Stabilizer-price-Bangladesh.jpg",
    },
    {
      name: "Surge Suppressor",
      image: "https://images.monoprice.com/productlargeimages/158741.jpg",
    },
    {
      name: "Voltage Stabilizer",
      image: "https://delta.com.bd/wp-content/uploads/2021/06/Sako-120-kVA-Voltage-Stabilizer-price-Bangladesh.jpg",
    },
  ],
};

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

  // current products
  const currentProducts = productsData[active] || [];

  // --- ADDING FILTER LOGIC ---
  let displayedProducts = currentProducts;

  if (filter !== "All") {
    displayedProducts = currentProducts.filter((product) => {
      if (filter === "Indoor") return product.name.includes("Indoor");
      if (filter === "Outdoor") return product.name.includes("Outdoor");
      if (filter === "Electrical") return product.name.includes("Electric");
      if (filter === "Smart Devices") return product.name.includes("Smart");
      return true;
    });
  }

  return (
    <div className="flex h-screen bg-gray-50 lg:px-14">
      {/* Sidebar */}
      <div className="hidden lg:flex relative w-64 bg-white flex flex-col lg:mt-20">
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
            className="w-10 h-10 rounded-full bg-[#088347] hover:bg-gray-200 flex items-center justify-center cursor-pointer"
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
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        <HiMenu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Main Display */}
      <div className="flex-1 p-6 overflow-y-auto w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 min-w-[250px] sm:max-w-[120px] rounded-md border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <div className="flex justify-center flex-1 lg:mr-20">
            <h1 className={`${playfair.className} text-xl text-[#07484A]`}>
              {active}
            </h1>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 sm:max-w-[140px] rounded-md border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl"
          >
            <option value="All">Sort by</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Electrical">Electrical</option>
            <option value="Smart Devices">Smart Devices</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product, i) => (
            <div key={i} className="rounded-lg">
              <Card style={{ width: 400, height: 500 }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  quality={100} // keeps high resolution
                />
              </Card>
              <p className="mt-2 text-center text-xl font-semibold">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
