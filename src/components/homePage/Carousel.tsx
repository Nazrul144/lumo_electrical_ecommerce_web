"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Navigation, Scrollbar } from "swiper/modules";
import BtnLink from "../shared/BtnLink";
import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
import { Loader } from "../shared/Loader";
import { EmptyData } from "../shared/EmptyData";
import ProductCard from "../products/ProductCard";

const Carousel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bestSellers, setBestSellers] = useState([]);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fatchingBestSellers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/products/?brand=others`);
        setBestSellers(response?.data?.results?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fatchingBestSellers();
  }, []);

  if (isLoading) return <Loader className="h-auto" />;
  if (bestSellers?.length === 0) return <EmptyData />;

  return (
    <div>
      <h1 className="text-center text-[#07484A] text-5xl font-playFairDisplay font-semibold">
        Best Sellers
      </h1>

      <div className="w-full mt-12 px-8 md:px-16 lg:px-24">

        <Swiper
          modules={[Navigation, Scrollbar]}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
            1536: { slidesPerView: 4 },
            1920: { slidesPerView: 5 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            // Re-init navigation after refs are ready
            setTimeout(() => {
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          scrollbar={{ draggable: true }}
        >
          {bestSellers?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex justify-end items-center gap-6 mt-6">
          <button
            ref={prevRef}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E0EFF6]"
          >
            <FaArrowLeft className="text-[#07484A]" />
          </button>

          <button
            ref={nextRef}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F9D9DA]"
          >
            <FaArrowRight className="text-[#07484A]" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <BtnLink text="Explore All Products" isIcone={true} link="/products" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
