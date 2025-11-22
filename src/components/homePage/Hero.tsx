"use client";
import Link from "next/link";
import React from "react";


const Hero = () => {
  return (
    <div>
      <div className="bg-[#FDFBF8] mb-24">
        <div
          className="relative w-full h-[750px] bg-[url(/home/hero.webp)]
                    bg-cover bg-center rounded-b-[100px] z-30"
        >
          <div className="absolute w-full h-full z-10 bg-gray-900/50 rounded-b-[100px]" />{" "}
          {/*Overlay*/}
          <div className="absolute top-44 md:top-52 xl:top-64 left-12 md:left-20 xl:left-24 z-50">
            <div
            >
              <h1 className="font-bold font-playFairDisplay text-2xl md:text-6xl text-[#FFFFFF]">
                Exclusive Deals of
              </h1>
              <h1 className="font-bold font-playFairDisplay text-6xl text-[#FFFFFF]">
                Furniture Collection.
              </h1>
              <p className="font-normal font-openSans text-2xl text-[#FFFFFF] mt-6">
                Explore different categories. Find the best deals.
              </p>
              <div className="mt-8">
                <Link
                  href="/products"
                  className=" text-white font-bold text-xl bg-linear-to-r px-3 py-2 md:px-5 md:py-3 from-[#088347]
                            to-[#C6E824] cursor-pointer font-openSans rounded-lg "
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
