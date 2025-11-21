import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen  py-12 px-4 md:px-10 lg:px-20 mt-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          <p className="text-gray-700 leading-relaxed text-lg">
            Lumo Electrical is a South African online store dedicated to providing
            reliable, high-quality electrical products for both professionals and
            homeowners. Our mission is to make electrical supplies more
            accessible with fast delivery, competitive pricing, and trusted
            customer service.
          </p>
        </div>
      </div>
    </div>
  );
}