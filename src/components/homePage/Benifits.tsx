'use client'
import Image from "next/image";
import React from "react";

const Benifits = () => {
  return (
    <div
    >
      <div className="bg-[#C6E8244D] mt-16 pb-16">
        <h1 className="text-center text-[#07484A] text-4xl font-playFairDisplay font-bold pt-16">
          Benefits for your expediency
        </h1>

        <div className="flex flex-col lg:flex-row gap-y-10 justify-around items-center pt-16">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Image
              src="/logo/icon/payment.png"
              alt="hand"
              width={80}
              height={80}
            />
            <h1 className="text-[#07484A] text-xl font-playFairDisplay font-semibold">
              Payment Method
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#07484A] font-openSans">
                We offer flexible payment
              </p>
              <p className="text-[#07484A] font-openSans">
                options, to make easier.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center justify-center">
            <Image
              src="/logo/icon/return.png"
              alt="hand"
              width={80}
              height={80}
            />
            <h1 className="text-[#07484A] text-xl font-playFairDisplay font-semibold">
              Return policy
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#07484A] font-openSans">
                You can return a product
              </p>
              <p className="text-[#07484A] font-openSans">within 30 days.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center justify-center">
            <Image
              src="/logo/icon/customer.png"
              alt="hand"
              width={80}
              height={80}
            />
            <h1 className="text-[#07484A] text-xl font-playFairDisplay font-semibold">
              Customer Support
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#07484A] font-openSans">
                Our customer support
              </p>
              <p className="text-[#07484A] font-openSans">is 24/7.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benifits;
