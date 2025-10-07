import React from "react";
import { Card } from "antd";
import Image from "next/image";
import { User } from "@/app/(commonLayout)/products/page";



interface ProductCardProps {
  user: User;
}

const ProductCard: React.FC<ProductCardProps> = ({user}) => {
  return (
    <div>
      
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
</div>

  );
};

export default ProductCard;


