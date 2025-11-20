"use client";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Headline } from "../shared/Headline";
import BtnLink from "../shared/BtnLink";
import Pagination from "../shared/Pagination";
import { usePathname } from "next/navigation";
import { Loader } from "../shared/Loader";
import { EmptyData } from "../shared/EmptyData";
import Swal from "sweetalert2";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathName = usePathname();

  // Fetch categories on page change
  useEffect(() => {
    const fetchingProduct = async () => {
      try {
        setIsLoading(true);  // Start loading
        const response = await api.get(`/products/categories?page=${page}`);
        setCategories(response?.data?.results?.data || []);
        setTotalPages(response?.data?.count || 1);  // Ensure correct page count
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1000,
        });
        console.error(error);
      } finally {
        setIsLoading(false);  // Stop loading after fetch
      }
    };

    fetchingProduct();  // Call fetch function
  }, [page]);  // Dependency on page only, triggers on page change

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);  // Update page number
  };

  if (isLoading) {
    return <Loader />;  // Show loading spinner while fetching
  }

  if (categories.length === 0) {
    return <EmptyData />;  // Show empty state if no categories
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
      className="lg:px-14"
    >
      <Headline text="Explore by Category" />
      <div className="container mx-auto pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 xl:gap-10 justify-items-center mx-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative w-[300px] h-[250px] md:w-[400px] md:h-[300px] rounded-lg cursor-pointer overflow-hidden border border-[#088347]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5 items-center justify-center">
                <p className={`text-white text-2xl md:text-4xl xl:text-6xl text-center ${playfair.className}`}>
                  {category.name}
                </p>
                <BtnLink text="Explore" link={`/categories/${category.id}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pathName === "/categories" ? (
          <Pagination
            totalPages={Math.ceil(totalPages / 9)}  // Adjust pagination if needed
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="flex justify-center items-center mt-10">
            <BtnLink text="Explore All Categories" isIcone={true} link="/categories" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Categories;
