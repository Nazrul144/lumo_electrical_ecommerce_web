"use client";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Headline } from "@/components/shared/Headline";
import BtnLink from "@/components/shared/BtnLink";
import { useParams } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import { EmptyData } from "@/components/shared/EmptyData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface primary_image {
  id:number,
  alt_text?:string,
  image:string
}

interface Products {
  id: number;
  name: string;
  brand: string;
  availability: string;
  code: string;
  primary_image: primary_image;
}

const Products = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1)
  const {categoryId,subCategoryId} = useParams();




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/categories/${categoryId}/subcategories/${subCategoryId}/products/`);
        console.log("checking respose...", response?.data?.results.data);

        setTotalPages(response?.data?.count);
        setProducts(response.data.results.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [categoryId,subCategoryId, page]);


  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  if(products.length === 0){
    return  <EmptyData/>
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
      className="lg:px-14 mt-32"
    >
      {/*------------------ head line-------------   */}
      <Headline text="Explore Products"/>
      {/*------------- showing option card ----------------- */}
      <div className="overflow-y-auto container mx-auto pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* showing product card when selected any category  */}
          {products?.map((product) => (<div
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
                <p className={`text-white text-6xl text-center ${playfair.className}}`}>
                  {product?.name}
                </p>
                <BtnLink text="Explore" link={`/categories/${categoryId}/${subCategoryId}/${product?.id}`} />
              </div>
            </div>
          ))}
        </div>
        <Pagination totalPages={Math.ceil(totalPages/9)} onPageChange={handlePageChange} />
      </div>
    </motion.div>
  );
};

export default Products;
