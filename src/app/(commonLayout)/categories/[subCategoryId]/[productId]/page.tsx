"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaStar } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { CiTwitter } from "react-icons/ci";
import { LuShare2 } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Playfair_Display } from "next/font/google";
import api from "@/lib/api";
import { useParams } from "next/navigation";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});



interface ProductProps {
  id: number;
  name: string;
  full_description: string;
  short_description: string;
  category: {
    image: string;
    name: string;
    slug: string;
    id: number;
    products_count: number;
  };
  image: string;
  related_products: {
    id: number;
    name: string;
    image: string;
  }[];
}

const ProductDetails = () => {
  const params = useParams();
  const { subCategoryId } = params;
  const [productDetails, setProductDetails] = useState<ProductProps | null>(
    null
  );

  const fetchProductDetails = React.useCallback(async () => {
    try {
      const res = await api.get(`/products/categories/${subCategoryId}/subcategories/`);
      console.log("checking subcategories..",res);
      setProductDetails(res.data.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }, [subCategoryId]);

  useEffect(() => {
    if (subCategoryId) {
      fetchProductDetails();
    }
  }, [subCategoryId, fetchProductDetails]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-28 lg:px-20">
      <section>
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row  lg:gap-28">
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
            <Image
              src={productDetails.image}
              alt={productDetails?.name || "Product Image"}
              width={500}
              height={500}
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left ">
            <h1 className="text-xl font-bold leading-none sm:text-4xl">
              {productDetails.name}
            </h1>
            <div className="mt-4 text-3xl text-orange-400 flex gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="text-gray-700">4.5 {"(212 reviews)"}</span>
            </div>
            <p className="mt-2 mb-8 text-lg sm:mb-12 text-justify">
              {productDetails.full_description}
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded text-white flex items-center gap-2
             bg-gradient-to-r from-[#088347] to-[#C6E824]
             transition-all duration-300 hover:scale-105
             shadow-lg hover:shadow-green-500/70 cursor-pointer"
              >
                <ImWhatsapp className="text-3xl text-white" />
                Contact via Whatsapp
              </Link>
            </div>
            <div className="flex items-center text-4xl mt-8 gap-4">
              <span className="text-2xl">Share</span>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <CiTwitter />
              </a>
              <a href="#">
                <LuShare2 />
              </a>
            </div>
            <Link href={"/categories"}>
              <button
                className="mt-8 px-6 py-2 relative rounded-lg font-semibold text-white flex items-center gap-2
             bg-gradient-to-r from-[#088347] to-[#C6E824]
             transition-all duration-300 hover:scale-105
             shadow-lg hover:shadow-green-500/70 cursor-pointer"
              >
                <MdKeyboardDoubleArrowLeft />
                Back to Categories
                {/* Neon green glow */}
                <span
                  className="absolute inset-0 rounded-lg pointer-events-none
                   bg-green-400 opacity-0 hover:opacity-50
                   blur-2xl mix-blend-lighten transition-all duration-300 "
                ></span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {productDetails.related_products &&
        productDetails.related_products.length > 0 && (
          <section className="mt-20">
            <h2
              className={`${playfair.className} text-3xl text-center mb-6 text-green-900 font-bold`}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productDetails.related_products.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <Image
                      src={p?.image}
                      alt={p?.name || "Product Image"}
                      width={300}
                      height={300}
                      className="object-contain h-48 w-full mb-4"
                    />
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
    </div>
  );
};

export default ProductDetails;

