"use client";

import { Card } from "antd";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useState, useRef } from "react";
import React from "react";
import { HiMenu} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsFilterLeft } from "react-icons/bs";

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
const productsData: Record<
  string,
  { id: number; name: string; image: string }[]
> = {
  "Circuit Breakers": [
    {
      id: 1,
      name: "Mini Circuit Breaker",
      image:
        "https://download.schneider-electric.com/files?p_Doc_Ref=HDB3w_IMG&p_File_Type=rendition_1500_jpg",
    },
    {
      id: 2,
      name: "Molded Case Circuit Breaker",
      image:
        "https://www.gses.com.au/wp-content/uploads/2017/10/Mccb-e1612398523722.jpg",
    },
    {
      id: 3,
      name: "Load Breaker",
      image:
        "https://vikiwat.com/userfiles/productimages/119955/product_large_141850.jpg",
    },
    {
      id: 4,
      name: "Vacuum Circuit Breaker",
      image:
        "https://image.made-in-china.com/2f0j00wPqbQWTzavoG/Vsg1-12-Vacuum-Circuit-Breaker-Indoor-Type.webp",
    },
    {
      id: 5,
      name: "SF6 Circuit Breaker",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/3/HG/XH/PI/11340491/sf6-circuit-breaker.jpg",
    },
    {
      id: 6,
      name: "Air Circuit Breaker",
      image:
        "https://iallway.com/wp-content/uploads/2024/02/78805a221a988e79ef3f.png",
    },
  ],

  "Switches & Sockets": [
    {
      id: 7,
      name: "Modern Wall Socket",
      image:
        "https://image.made-in-china.com/202f0j00oedquznRwAks/T3-Wholesale-New-Design-PC-Ultra-Thin-Wall-Switch-Socket-Modern-Luxury-Wall-Switch-Switches-and-Socket.webp",
    },
    {
      id: 8,
      name: "Smart Switch Board",
      image:
        "https://5.imimg.com/data5/HO/SJ/PD/SELLER-67963114/smart-switch-boards.jpg",
    },
    {
      id: 9,
      name: "Universal Plug",
      image:
        "https://gadgetbreeze.com.bd/wp-content/uploads/2025/05/Mcdodo-CP-614-100W-GaN-Universal-Travel-Adapter-with-100w-C-to-C-Cable-430x430.jpg",
    },
  ],

  "Wire & Cables": [
    {
      id: 10,
      name: "Electric Copper Cable",
      image: "https://m.media-amazon.com/images/I/81opAzJl5kL._SL1465_.jpg",
    },
    {
      id: 11,
      name: "Power Wire Bundle",
      image:
        "https://m.media-amazon.com/images/I/41QqyMrjZlS._UF1000,1000_QL80_.jpg",
    },
    {
      id: 12,
      name: "Armored Cable",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/11/AU/UJ/WJ/3446694/polycab-armored-cable.jpg",
    },
    {
      id: 13,
      name: "Coaxial Cable",
      image:
        "https://milcom.edu.au/wp-content/uploads/2019/10/coaxial-cable-1280x720.png",
    },
  ],

  "Distribution Boards": [
    {
      id: 14,
      name: "Electrical Panel Board",
      image:
        "https://www.brilltech.co.in/images/products/img-control-panel-boards.jpg",
    },
    {
      id: 15,
      name: "Fuse Box",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/933ab82f179745c166ceafb62efece28.png_720x720q80.png",
    },
    {
      id: 16,
      name: "Load Center Pane",
      image:
        "https://www.eaton.com/content/dam/eaton/products/low-voltage-power-distribution-controls-systems/load-centers/panelboard-loadcenter.jpg",
    },
    {
      id: 17,
      name: "Meter Distribution Box",
      image: "https://y23.hongcdn.com/uploads/2203/pole-top-box-5-2-!m.jpg",
    },
    {
      id: 18,
      name: "Electrical Panel Board",
      image:
        "https://www.brilltech.co.in/images/products/img-control-panel-boards.jpg",
    },
    {
      id: 19,
      name: "Fuse Box",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/933ab82f179745c166ceafb62efece28.png_720x720q80.png",
    },
  ],

  "Smart Devices": [
    {
      id: 20,
      name: "Smart Home Hub",
      image:
        "https://blog-cdn.athom.com/uploads/2019/08/Homey-Pro-1-2000x1125.png",
    },
    {
      id: 21,
      name: "Smart Light Controller",
      image: "https://m.media-amazon.com/images/I/61njqiDYYPS._SL1500_.jpg",
    },
    {
      id: 22,
      name: "Smart Thermostat",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HQ2E2_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90",
    },
  ],

  "Power Tools": [
    {
      id: 23,
      name: "Electric Drill",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/b8541eec74b99941faf71a25548de3e8.jpg_960x960q80.jpg_.webp",
    },
    {
      id: 24,
      name: "Cordless Screwdriver",
      image:
        "https://admin.techshopbd.com/uploads/product/Cordless-Screwdriver-Set.jpg",
    },
    {
      id: 25,
      name: "Angle Grinder",
      image:
        "https://www.eastmanshop.com/cdn/shop/files/EDG-100Nc_5b32af9f-3ecc-4c95-aabe-07d47286deca_700x700.jpg?v=1755949250",
    },
  ],

  "LED Lights": [
    {
      id: 26,
      name: "LED Bulb",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      id: 27,
      name: "LED Strip Light",
      image:
        "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
    {
      id: 28,
      name: "LED Bulb",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      id: 29,
      name: "LED Strip Light",
      image:
        "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
    {
      id: 30,
      name: "LED Bulb",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      id: 31,
      name: "LED Strip Light",
      image:
        "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
  ],

  "Outdoor Lighting": [
    {
      id: 32,
      name: "Garden Light",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/dbba71738d214438f137c654c42e58a7.jpg_720x720q80.jpg",
    },
    {
      id: 33,
      name: "Street Lamp",
      image:
        "https://thumbs.dreamstime.com/b/victorian-style-street-lamp-night-modern-electric-build-deep-yellow-light-produced-to-illuminate-streets-198835173.jpg",
    },
  ],

  "Energy Meters": [
    {
      id: 34,
      name: "Smart Energy Meter",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolFwN0O4dYHeUCpHjPMkh3nElb1LokVUz4A&s",
    },
    {
      id: 35,
      name: "Digital Meter Display",
      image:
        "https://cdn.roboticsbd.com/11381-home_default/dc-0-100v-10a-voltage-and-current-dual-led-display-panel-meter-robotics-bangladesh.jpg",
    },
  ],

  Generators: [
    {
      id: 36,
      name: "Portable Generator",
      image:
        "https://static.thcdn.com/images/large/original//productimg/1600/1600/11655251-4715186688260835.jpg",
    },
    {
      id: 37,
      name: "Diesel Generator",
      image:
        "https://media.sakurapower.com/pub/media/catalog/product/cache/144bfaf5ae6c8001de0bfb251a4f8b1e/3/3/33_kva_diesel_generator_4.jpg",
    },
  ],

  Transformers: [
    {
      id: 38,
      name: "Power Transformer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ci769LbwmtOWSCVurka5LqdXdOtgwR2CcQ&s",
    },
    {
      id: 39,
      name: "Distribution Transformer",
      image:
        "https://www.bowerselec.co.uk/app/uploads/2022/10/Fedral-stock-1500kVA-853x1024.jpg",
    },
  ],

  "Cable Management": [
    {
      id: 40,
      name: "Cable Tray",
      image:
        "https://www.independenttechbd.com/wp-content/uploads/2024/06/cable-tray-1-500x500-1.jpg",
    },
    {
      id: 41,
      name: "Cable Clips",
      image: "https://m.media-amazon.com/images/I/517KOWvxKpL.jpg",
    },
  ],

  "Indoor Fittings": [
    {
      id: 42,
      name: "Ceiling Light",
      image:
        "https://images-cdn.ubuy.co.in/666f1d2788caec18320c4a76-caneoe-modern-led-ceiling-light-6000k.jpg",
    },
    {
      id: 43,
      name: "Wall Lamp",
      image:
        "https://www.akway.in/cdn/shop/products/61rhOE5zxdL.jpg?v=1697352251&width=1445",
    },
  ],

  "Extension Cords": [
    {
      id: 44,
      name: "Multi Plug Extension",
      image:
        "https://static-01.daraz.com.bd/p/f7f3a8b26a3f3368418881eb42c6208b.jpg",
    },
    {
      id: 45,
      name: "Heavy Duty Extension Reel",
      image:
        "https://www.tronic.co.tz/cdn/shop/products/ER6527_c417e016-6c57-4bbc-8882-3f5363d071c4.jpg?v=1757514186",
    },
  ],

  "Surge Protection": [
    {
      id: 46,
      name: "Surge Protector Power Strip",
      image:
        "https://djuly1j3idynn.cloudfront.net/userfiles/images/inriver/preview/74685_ig112663blk10.jpg",
    },
    {
      id: 47,
      name: "Surge Protector Power Strip",
      image:
        "https://delta.com.bd/wp-content/uploads/2021/06/Sako-120-kVA-Voltage-Stabilizer-price-Bangladesh.jpg",
    },
    {
      id: 48,
      name: "Surge Suppressor",
      image: "https://images.monoprice.com/productlargeimages/158741.jpg",
    },
    {
      id: 49,
      name: "Voltage Stabilizer",
      image:
        "https://delta.com.bd/wp-content/uploads/2021/06/Sako-120-kVA-Voltage-Stabilizer-price-Bangladesh.jpg",
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
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.3,
        type: "keyframes",
        stiffness: 60,
        duration: 2,
      }}
      className="flex h-screen bg-gray-50 lg:px-14"
    >
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full ">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 min-w-[250px] sm:max-w-[120px] rounded-md border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 sticky"
          />
          <div className="flex justify-center flex-1 lg:mr-20">
            <h1 className={`${playfair.className} text-xl text-[#07484A]`}>
              {active}
            </h1>
          </div>
          <div className="relative flex-1 sm:max-w-[140px]">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-md border pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl appearance-none"
            >
              <option value="All">Sort by</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Electrical">Electrical</option>
              <option value="Smart Devices">Smart Devices</option>
            </select>

            {/* Filter icon on the left */}
            <BsFilterLeft
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product) => (
            <Link href={`/categories/${product.id}`} key={product.id}>
              <div className="rounded-lg">
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
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Categories;
