"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
// import { CiTwitter } from "react-icons/ci";
// import { LuShare2 } from "react-icons/lu";
// import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Playfair_Display } from "next/font/google";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import BtnLink from "@/components/shared/BtnLink";
import { EmptyData } from "@/components/shared/EmptyData";
import LoadingPage from "@/app/(commonLayout)/products/loading";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// type declaration

interface primary_image {
  id: number;
  alt_text?: string;
  image: string;
}

interface RelatedProducts {
  id: number;
  name: string;
  brand: string;
  availability: string;
  code: string;
  primary_image: primary_image;
}

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

const ProductDetails = () => {
  const params = useParams();
  const [imageId, setImageId] = useState<number>(0);
  const { categoryId, subCategoryId, id } = params;
  const [relatedProducts, setRelatedProducts] = useState<RelatedProducts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<ProductProps | null>(
    null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          `/products/categories/${categoryId}/subcategories/${subCategoryId}/products/`
        );
        console.log("checking respose...", response?.data?.results.data);
        setRelatedProducts(response.data.results.data);
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/products/${id}/`);
        setProductDetails(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
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
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:gap-28 ">
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
            <div className="flex flex-col max-h-[450px] overflow-y-auto">
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
                  className="object-contain w-28 h-auto border-8 cursor-pointer"
                />
              ))}
            </div>
            <Image
              src={productDetails?.images[imageId].image}
              alt={productDetails?.images[imageId]?.alt_text || "Product Image"}
              width={500}
              height={500}
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="text-center px-3 rounded-sm lg:max-w-md xl:max-w-lg lg:text-left flex flex-col gap-4 max-h-[450px] overflow-y-auto">
            <h1
              className={`text-3xl leading-none sm:text-4xl ${playfair.className}`}
            >
              {productDetails.name}
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
            <p className="my-2 max-h-32 overflow-y-auto text-lg text-[#686868] text-justify">
              {productDetails?.short_description}
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
            {/* <div className="flex items-center text-4xl mt-8 gap-4">
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
            </div> */}
          </div>
        </div>
        <div className="container mx-auto">
          <div className="border-b-2 my-2">
            <h1 className="text-[#3C3C3C] text-2xl font-medium my-2">
              Product Details
            </h1>
          </div>
          <div className=" text-justify text-[#686868]">
            {productDetails?.full_description}
          </div>
        </div>
      </section>
      {/* related product section  */}
      <section className="container mx-auto overflow-x-auto">
        <h1 className="text-3xl my-10">Related Products</h1>
        <div className="flex gap-5">
          {relatedProducts?.map((product) => (
            <div
              key={product?.id}
              className="group relative w-[400px] h-[300px] rounded-lg cursor-pointer overflow-hidden border border-[#088347]"
            >
              {/* Image */}
              <Image
                src={product?.primary_image?.image}
                alt={product?.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5 items-center justify-center">
                <p
                  className={`text-white text-6xl text-center ${playfair.className}}`}
                >
                  {product?.name}
                </p>
                <BtnLink
                  text="Explore"
                  link={`/categories/${categoryId}/${subCategoryId}/${product?.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
