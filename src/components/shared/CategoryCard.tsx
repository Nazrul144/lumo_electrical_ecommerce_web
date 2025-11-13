import React from 'react';
import Image from 'next/image';
import BtnLink from './BtnLink'; 
import { Playfair } from 'next/font/google';


const playfair = Playfair({ subsets: ['latin'], weight: '400' });

interface CategoryCardProps {
  subCategory: {
    id: string;
    image: string;
    name: string;
  };
  categoryId: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ subCategory, categoryId }) => {
  return (
    <div
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
        <p className={`text-white text-6xl text-center ${playfair.className}`}>
          {subCategory?.name}
        </p>
        <BtnLink text="Explore" link={`/categories/${categoryId}/${subCategory?.id}`} />
      </div>
    </div>
  );
};

export default CategoryCard;
