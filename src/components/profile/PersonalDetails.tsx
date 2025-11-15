"use client";
import React, { useState } from "react";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const PersonalDetails: React.FC<PersonalDetails> = ({
  firstName,
  lastName,
  email,
  phone,
}) => {


  const [isEditing, setIsEditing] = useState(false);


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
 
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
              value={firstName}
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
              value={lastName}
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
            value={email}
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
            value={phone}
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
