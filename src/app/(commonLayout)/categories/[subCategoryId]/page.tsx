"use client";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Headline } from "@/components/shared/Headline";
import BtnLink from "@/components/shared/BtnLink";
import { useParams } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface SubCategory {
  id: number;
  name: string;
  image: string;
}

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const {subCategoryId} = useParams();



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/categories/${subCategoryId}/subcategories/`);
        setSubCategories(response.data.results.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [subCategoryId]);

  if(subCategories.length === 0){
    return  <div className="flex justify-center items-center h-screen text-3xl text-red-700"> No Subcategory found</div>
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
      {/*------------------ head line-------------   */}
      <Headline text="Explore by Sub category"/>
      {/*------------- showing option card ----------------- */}
      <div className="overflow-y-auto container mx-auto pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* showing product card when selected any category  */}
          {subCategories?.map((subCategory) => (<div
              key={subCategory?.id}
              className="group relative w-[400px] h-[300px] rounded-lg cursor-pointer overflow-hidden border border-[#088347]"
            >
              {/* Image */}
              <Image
                src={subCategory?.image}
                alt={subCategory?.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-5 items-center justify-center">
                <p className={`text-white text-6xl ${playfair.className}}`}>
                  {subCategory?.name}
                </p>
                <BtnLink text="Explore" link={`/categories/${subCategory?.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SubCategories;
