"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { Playfair_Display } from "next/font/google";
import api from "@/lib/api";
import LoadingPage from "@/app/(commonLayout)/products/loading";
import parse from "html-react-parser";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// type declaration


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
  images: {
    id: number;
    alt_text: string;
    image: string;
  }[];
  related_products: {
    id: number;
    name: string;
    image: string;
  }[];
}

const ProductDetails = ({id}:{id:number}) => {
  const [imageId, setImageId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<ProductProps | null>(
    null
  );

  

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/products/${id}/`);
       
        setProductDetails(res?.data?.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

 
  if(isLoading){
    return (<div className="flex justify-center items-center h-screen">
      <LoadingPage/>
    </div>);
  }


  return (
    <div className="my-12 lg:px-20">
      <section>
        <div className="container flex flex-col justify-center items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:gap-28 ">
          <div className="flex flex-col-reverse xl:flex-row items-center justify-center gap-5 p-6  mt-8 ">
            <div className="flex flex-col max-h-[450px] scrollbar-hidden  xl:overflow-y-auto">
              {productDetails?.images?.map((image, idx) => (
                <Image
                  key={image.id}
                  onClick={() => {
                    setImageId(idx);
                  }}
                  src={image?.image}
                  alt={image?.alt_text || "Product Image"}
                  width={100}
                  height={100}
                  className="object-contain w-20 md:w-28 h-auto border-3 xl:border-8 cursor-pointer"
                />
              ))}
            </div>
            {productDetails?.images && productDetails.images.length > 0 && (
              <Image
                src={productDetails.images[imageId]?.image || ""}
                alt={productDetails.images[imageId]?.alt_text || "Product Image"}
                width={500}
                height={500}
                className="object-contain w-[420px] h-auto"
              />
            )}
          </div>
          <div className="text-center px-3 rounded-sm lg:max-w-md xl:max-w-lg lg:text-left flex flex-col gap-4 max-h-[450px] overflow-y-auto">
            <h1
              className={`text-2xl font-semibold leading-none  ${playfair.className}`}
            >
              {productDetails?.name}
            </h1>
            <div className="mt-4 text-2xl  text-orange-400 flex items-center gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="text-[#868686] font-medium">
                4.5 {"(212 reviews)"}
              </span>
            </div>
            <p className="my-2 text-lg text-[#686868] text-justify">
              {parse(`${productDetails?.short_description}`)}
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                rel="noopener noreferrer"
                href={`https://wa.me/+123654987877?text=I'm%20interested%20in%20your%20product:%20${productDetails?.name}`}
                target="_blank"
                className="px-8 py-3 text-lg font-semibold rounded text-white flex items-center gap-2
             bg-gradient-to-r from-[#088347] to-[#C6E824]
             transition-all duration-300 hover:scale-105
             shadow-lg hover:shadow-green-500/70 cursor-pointer"
              >
                <ImWhatsapp className="text-3xl text-white" />
                Contact via Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="border-b-2 my-2">
            <h1 className="text-[#3C3C3C] text-2xl font-medium my-2">
              Product Details
            </h1>
          </div>
          <div className=" text-justify text-[#686868]">
            {parse(`${productDetails?.full_description}`)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
