"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import api from "@/lib/api";

const Security = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "New password and confirm password do not match!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!formData.currentPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Current Password",
        text: "Please enter your current password!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "New password must be at least 8 characters long!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const res = await api.post("/accounts/change-password/", formData);
      if (res?.status === 200 || res?.status === 201) {
        Swal.fire({
          title: "Password updated successfully!",
          icon: "success",
          draggable: true,
        });
        setIsEditing(false); // Reset edit mode after successful save
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="w-full xl:w-4xl mx-auto bg-white border p-6 rounded-lg mb-5">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Security Settings
      </h2>
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current password
          </label>
          <div className="relative">
            <input
              type={showPasswords.currentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter current password"
              className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.currentPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New password
          </label>
          <div className="relative">
            <input
              type={showPasswords.newPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter new password (min 8 characters)"
              className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.newPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Re-enter new password"
              className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#00C464] text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                toggleEdit();
              }}
              className="px-6 py-2 text-white rounded-lg bg-[#00C464] hover:bg-green-600 transition-colors cursor-pointer"
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;
