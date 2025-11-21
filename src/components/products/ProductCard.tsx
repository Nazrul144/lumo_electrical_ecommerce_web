"use client";
import React from "react";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

interface primary_image {
  id: number;
  alt_text?: string;
  image: string;
}

interface ProductProps {
  id?: number;
  name?: string;
  code?: string;
  short_description?: string;
  category_name?: string;
  category_slug?: string;
  availability?: true;
  popularity?: 1;
  primary_image?: primary_image;
}

interface ProductCardProps {
  product: ProductProps;
  selectedFilter?: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedFilter = null,
}) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="cursor-pointer mx-auto rounded-lg shadow-xl  hover:scale-105  transition-all duration-300"
    >
      <Card
        className="z-0 h-[400px] w-[300px] "
        data-filter={selectedFilter ?? ""}
      >
        <Image
          src={product?.primary_image?.image || "/placeholder.jpg"}
          width={200}
          height={250}
          alt={product?.name || "Product image"}
          className="h-[250px] w-[200px] object-contain mx-auto"
        />
        <div className="my-2 overflow-hidden">
          <h1 className="text-lg font-bold text-center ">
            {product?.name}
          </h1>
          <h1 className="text-md  text-center">
            Product Code: {product?.code}
          </h1>
        </div>
        {/* other user info */}
      </Card>
    </Link>
  );
};

export default ProductCard;
