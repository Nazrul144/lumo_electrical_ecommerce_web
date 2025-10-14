'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import TestimonialCard from "./TestimonialCard";

const reviews = [
  { id: 1, imageName: "person", name: "Leona Paul", review: "My experience with Mark is a complete sucess..." },
  { id: 2, imageName: "person", name: "Fahim", review: "All products are good" },
  { id: 3, imageName: "person", name: "Faisal", review: "Excellent" },
  { id: 4, imageName: "person", name: "Faria", review: "long lasting products" },
  { id: 5, imageName: "person", name: "Digonto", review: "products are cheap" },
];

const Testimonial = () => {
  return (
    <div>
      <h1 className="text-[#07484A] text-4xl text-center font-playFairDisplay font-bold pt-14">
        Testimonials
      </h1>
      <p className="text-[#07484A] text-xl text-center font-roboto mt-4">
        Over 15,000 happy customers.
      </p>
      <div className="w-full mt-12 px-8 md:px-16 lg:px-24 2xl:px-32">
        <Swiper
          modules={[Navigation, Scrollbar]}
          spaceBetween={1}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          scrollbar={{ draggable: true }}
          className="mt-8"
        >
          {reviews.map((item) => (
            <SwiperSlide
              key={item.id}
              className="pb-9 !flex !items-center !justify-center"
            >
              <TestimonialCard
                imageName={item.imageName}
                review={item.review}
                name={item.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
