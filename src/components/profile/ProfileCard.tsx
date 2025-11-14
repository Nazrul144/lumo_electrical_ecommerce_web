"use client";
import React, {  } from "react";
import { custom } from "zod";

interface ProfileCardProps {
  name: string;
  email: string;
  accountType: "Trade account" | "Other"; // You can add more account types as needed
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  // name,
  // email,
  // accountType,
}) => {


  const customerData = {
    id: "88a7ecc1-30fe-47db-981f-c04d12feca8f",
    customer_type: "Retail",
    first_name: "John",
    last_name: "Doe",
    full_name: "John Doe",
    email: "nifeca8627@agenra.com",
    phone_number: "+27123456789",
    is_verified: true,

    billing_addresses: [
      {
        id: "a7fa254c-8a4c-4547-9214-6eb04ddf6d3b",
        company_name: "ABC Company",
        vat_number: "4123456789",
        company_registration: "2021/123456/07",
        po_number: "PO-2025-001",
        address_line_1: "123 Main Street",
        address_line_2: "Suite 100",
        city: "Johannesburg",
        postal_code: "2000",
        province: "Gauteng",
        created_at: "2025-11-13T23:59:35.959869Z",
        updated_at: "2025-11-13T23:59:35.959884Z",
      },
    ],

    delivery_addresses: [
      {
        id: "7809f742-a4f6-412c-8189-db9a1dd78e0c",
        company_name: "ABC Company",
        vat_number: null,
        company_registration: null,
        po_number: null,
        address_line_1: "456 Business Park",
        address_line_2: "Building B",
        city: "Pretoria",
        postal_code: "0001",
        province: "Gauteng",
        created_at: "2025-11-14T00:00:14.741207Z",
        updated_at: "2025-11-14T00:00:14.741224Z",
      },
    ],

    trade_information: null,
    created_at: "2025-11-13T23:57:57.824455Z",
    updated_at: "2025-11-14T00:01:14.171641Z",
  };

  const { first_name, last_name , email ,phone_number,customer_type} = customerData;


  return (
    <div className="max-w-md rounded-lg bg-white px-20 py-5 border border-[#0000001A]">
      <div className="flex flex-col items-center gap-10">
        <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {first_name[0]} {last_name[0]}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-3 ">
          <h2 className="text-xl font-semibold">{customerData.first_name} {customerData.last_name}</h2>
          <p className="text-[#4A5565] text-sm">{email}</p>
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="mt-4">
        <div className="flex justify-center items-center gap-2 bg-[#C6E8241F] p-2 rounded-full">
          <p className="w-2 h-2 bg-[#088347] rounded-full"></p>
          <p className="text-sm text-[#088347]">
            {customer_type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
