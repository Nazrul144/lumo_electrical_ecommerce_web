"use client";
import api from "@/lib/api"; // Assuming 'api' is an axios instance
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface PersonalInfoProps {
  company_name?: string;
  vat_number: string;
  company_registration: string;
  address_line_1: string;
  city: string;
  province: string;
  postal_code: string;
}

const BillingDetails: React.FC<PersonalInfoProps> = ({
  company_name,
  vat_number,
  company_registration,
  address_line_1,
  city,
  province,
  postal_code,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const { register, handleSubmit, } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);

    const changedFields: any = {};

    // Check which fields were modified by comparing with default values
    if (data.company_name !== company_name) changedFields["company_name"] = data.company_name;
    if (data.vat_number !== vat_number) changedFields["vat_number"] = data.vat_number;
    if (data.company_registration !== company_registration) changedFields["company_registration"] = data.company_registration;
    if (data.address_line_1 !== address_line_1) changedFields["address_line_1"] = data.address_line_1;
    if (data.city !== city) changedFields["city"] = data.city;
    if (data.province !== province) changedFields["province"] = data.province;
    if (data.postal_code !== postal_code) changedFields["postal_code"] = data.postal_code;

    // If no field was changed, don't send the request
    if (Object.keys(changedFields).length === 0) {
      Swal.fire({
        title: "No changes made!",
        icon: "info",
        draggable: true,
      });
      return;
    }

    try {
      const res = await api.patch(
        "/accounts/profile/update/", 
        changedFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.status === 201 || res?.status === 200) {
        Swal.fire({
          title: "Successfully updated!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full xl:w-4xl mx-auto bg-white border p-6 rounded-lg mb-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <label className="block text-sm font-medium text-gray-700">
            Company name
          </label>
          <input
            type="text"
            name="company_name"
            defaultValue={company_name}
            {...register("company_name")}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-5">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Vat Number
            </label>
            <input
              type="text"
              name="vat_number"
              defaultValue={vat_number}
              {...register("vat_number")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Company Registration
            </label>
            <input
              type="text"
              name="company_registration"
              defaultValue={company_registration}
              {...register("company_registration")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address Line 1
          </label>
          <input
            type="text"
            name="address_line_1"
            defaultValue={address_line_1}
            {...register("address_line_1")}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            defaultValue={city}
            {...register("city")}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-5 items-center justify-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <input
              type="text"
              name="province"
              defaultValue={province}
              {...register("province")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postal_code"
              defaultValue={postal_code}
              {...register("postal_code")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        {isEditing ? (
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              toggleEdit();
            }}
            className="text-white p-3 rounded-lg bg-[#00C464] cursor-pointer"
          >
            Edit profile
          </button>
        )}
      </form>
    </div>
  );
};

export default BillingDetails;
