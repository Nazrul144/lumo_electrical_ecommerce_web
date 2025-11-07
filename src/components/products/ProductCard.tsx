"use client";
import React from "react";
import { Card } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";


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
  category_slug?: string,
  availability?: true,
  popularity?: 1,
  primary_image?: primary_image
}

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  console.log("checking.......", product);

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.3,
        type: "keyframes",
        stiffness: 60,
        duration: 2,
      }}
    >
      <Card className="z-0">
        <Image
          src={product?.primary_image?.image || "/placeholder.jpg"}
          width={300}
          height={500}
          alt={product.title || 'Product image'}
        />
        <h1 className="text-xl font-bold mt-2 text-center">{product.title}</h1>
        {/* other user info */}
      </Card>
    </motion.div>
  );
};

export default ProductCard;