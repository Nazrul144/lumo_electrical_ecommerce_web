import api from "@/lib/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface PersonalDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const PersonalDetails: React.FC<PersonalDetails> = ({
  first_name,
  last_name,
  phone_number,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name,
      last_name,
      phone_number,
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);

    const changedFields: any = {};

    // Check which fields were modified by comparing with default values
    if (data.first_name !== first_name) changedFields["first_name"] = data.first_name;
    if (data.last_name !== last_name) changedFields["last_name"] = data.last_name;
    if (data.phone_number !== phone_number) changedFields["phone_number"] = data.phone_number;

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
      // Send a PATCH request with the modified fields
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
        <div className="flex flex-col xl:flex-row gap-5">
          <div className="flex-1">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              id="first_name"
              disabled={!isEditing}
              {...register("first_name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              disabled={!isEditing}
              {...register("last_name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="text"
            id="phone_number"
            disabled={!isEditing}
            {...register("phone_number")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              toggleEdit();
            }}
            type="button"
            className="text-white p-3 rounded-lg bg-[#00C464] cursor-pointer"
          >
            Edit profile
          </button>
        )}
      </form>
    </div>
  );
};

export default PersonalDetails;
