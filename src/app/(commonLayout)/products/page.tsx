
'use client';

import ProductCard from "@/components/products/ProductCard";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

interface ProductProps {
  id?: number;
  title?: string;
  short_description?: string;
  category_name?: string;
    category_slug?: string,
    availability?: true,
    popularity?: 1,
    primary_image?: string
}


const ProductsPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products/list/");
      setProducts(response.data.data.results);
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-24 mb-4">All Products</h1>
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
