"use client";
import React, { useState } from "react";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const PersonalDetails: React.FC<PersonalDetails> = ({
  // firstName,
  // lastName,
  // email,
  // phone,
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

    const { first_name, last_name, email, phone_number } =
      customerData;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: first_name,
    lastName: last_name,
    email,
    phone: phone_number,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save the changes (you can handle this by sending data to the backend or local storage)
    setIsEditing(false);
    console.log("Changes Saved:", formData);
  };

  return (
    <div className="w-4xl mx-auto bg-white border p-6 rounded-lg">
      <div className="space-y-4">
        <div className="flex gap-5">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={toggleEdit}
            className=" text-white p-3 rounded-lg bg-[#00C464] cursor-pointer"
          >
            Edit profile
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
