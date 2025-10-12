"use client";
import React from "react";
import { Card } from "antd";
import Image from "next/image";
import { User } from "@/app/(commonLayout)/products/page";
import { motion } from "framer-motion";

interface ProductCardProps {
  user: User;
}

const ProductCard: React.FC<ProductCardProps> = ({ user }) => {
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
          src={"/placeholder.jpg"}
          width={300}
          height={500}
          alt={user.name}
        />
        <h1 className="text-xl font-bold mt-2 text-center">{user.name}</h1>
        {/* other user info */}
      </Card>
    </motion.div>
  );
};

export default ProductCard;
