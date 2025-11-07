
'use client';
import ProductCard from "@/components/products/ProductCard";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";



const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface primary_image {
  id: number;
  alt_text?: string;
  image: string;
}

interface ProductProps {
  id?: number;
  title?: string;
  short_description?: string;
  category_name?: string;
  category_slug?: string;
  availability?: true;
  popularity?: 1;
  primary_image?: primary_image;
}


const ProductsPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products/");
      console.log("checking product respose...", response.data.results.data);
      setProducts(response?.data?.results?.data);
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="my-32">
      <h1 className={`text-center font-bold text-2xl my-8 ${playfair.className}`}>All Products</h1>
      <div className="flex justify-center z-0">
      <div>
      </div>

      <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductsPage;
