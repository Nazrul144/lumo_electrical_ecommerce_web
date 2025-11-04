"use client";

import { Card } from "antd";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsFilterLeft } from "react-icons/bs";
import api from "@/lib/api";
import { CiSearch } from "react-icons/ci";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface Product {
  id: number;
  category_name: string;
  primary_image: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

const Categories = () => {
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products/categories/").then((response) => {
      setCategories(response?.data?.data);
    });
  }, []);

  // filtered products
  const loadFilteredData = async () => {
    if (active.length > 0) {
      const response = await api.get(`/products/categories/${active}/`);
      setFilteredData(response?.data?.data.products);
    } else {
      const response = await api.get(`/products/list/`);
      console.log("product list...", response?.data.data.results);
      setFilteredData(response?.data.data.results);
    }
  };

  useEffect(() => {
    loadFilteredData();
  }, [active]);

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
      {/* setting option in Sidebar */}
      <div className="hidden lg:flex relative w-64 bg-white flex flex-col lg:mt-20">
        {/* <span className="flex justify-between items-center bg-[#F0F0F0]">
          <CiSearch  className="text-xl"/>
          <input
            type="text"
            placeholder="Search"
            className="  px-3 py-3 text-sm focus:outline-none"
          />
        </span> */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-2 p-4">
            {categories?.map((item: any) => (
              <li
                key={item.id}
                onClick={() => setActive(item.slug)}
                className={`cursor-pointer rounded-md px-3 py-4 text-sm font-medium flex items-center ${
                  active === item.slug
                    ? "bg-gradient-to-r from-[#088347] to-[#b1ce23] text-white "
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item?.name}
              </li>
            ))}
          </ul>
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
        {/* option for mobile sidebar */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-2 p-4">
            {categories?.map((item) => (
              <li
                key={item?.id}
                onClick={() => {
                  setActive(item?.slug);
                  setSidebarOpen(false);
                }}
                className={`cursor-pointer rounded-md px-3 py-4 text-sm font-medium ${
                  active === item?.slug
                    ? "bg-gradient-to-r from-[#088347] to-[#b1ce23] text-white lg:text-xl"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hamburger Button */}
      {/* <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      >
        <HiMenu className="w-6 h-6 text-gray-700" />
      </button> */}

      {/* Main Display */}
      <div className="flex-1 p-6 overflow-y-auto w-6xl mx-auto">
        {/* filter options  */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full ">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* showing product card when selected any category  */}
          {active.length > 0
            ? filteredData?.map((product) => (
                <Link href={`/categories/${product?.id}`} key={product?.id}>
                  <div className="rounded-lg">
                    <Card style={{ width: 400, height: 500 }}>
                      <Image
                        src={product?.primary_image}
                        alt={product?.category_name}
                        fill
                        className="object-cover"
                        quality={100}
                      />
                    </Card>
                    <p className="mt-2 text-center text-xl font-semibold">
                      {product?.category_name}
                    </p>
                  </div>
                </Link>
              ))
            : // showing category card
              categories?.map((category) => (
                <div
                  key={category?.id}
                  onClick={() => setActive(category.slug)}
                  className="group relative w-[400px] h-[500px] rounded-lg cursor-pointer overflow-hidden"
                >
                  {/* Image */}
                  <Image
                    src={category?.image_url}
                    alt={category?.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={100}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-xl font-semibold">
                      {category?.name}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Categories;
