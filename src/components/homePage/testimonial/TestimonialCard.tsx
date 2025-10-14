import Image from "next/image";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface ITestimonial {
    imageName: string,
    review: string,
    name: string
}

const TestimonialCard = ({ imageName, review, name }: ITestimonial) => {
  return (
    <div>
      <div className="w-full flex flex-col sm:flex-row sm:gap-x-12">
        <div className="relative w-full max-w-[400px] sm:w-1/4 h-[300px] sm:h-[400px]">
          <Image
            src={`/testimonial/${imageName}.jpg`}
            alt="person"
            fill
            className="object-cover object-top rounded-2xl"
          />
          <Image
            src="/testimonial/quatation.png"
            alt="person"
            width={100}
            height={100}
            className="absolute top-0 left-0
                -translate-y-1/2"
          />
        </div>
        <div className="w-full sm:w-2/4 h-[300px] sm:h-[400px] py-0 sm:py-6 flex flex-col justify-center">
          <p className="text-[#07484A] text-xl font-openSans">{review}</p>
          <p className="text-[#07484A] text-xl font-roboto font-medium mt-6">
            {name}
          </p>
        </div>
        {/* Arrow button for navigation */}
        <div className="w-full sm:w-1/4 h-[300px] sm:h-[400px] flex flex-row sm:flex-col justify-center items-center gap-6">
          <button
            className="custom-prev w-10 h-10 rounded-full flex items-center justify-center bg-[#C6E824] 
                transition cursor-pointer"
          >
            <FaArrowLeft className="text-[#07484A]" />
          </button>
          <button
            className="custom-next w-10 h-10 rounded-full flex items-center justify-center bg-[#088347] 
                transition cursor-pointer"
          >
            <FaArrowRight className="text-[#FFFFFF]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
