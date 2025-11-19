"use client";
import BillingDetails from "@/components/profile/BillingDetails";
import PersonalDetails from "@/components/profile/PersonalDetails";
import ProfileCard from "@/components/profile/ProfileCard";
import Security from "@/components/profile/Security";
import { useAuth } from "@/context/AuthProviders";
import PrivateRoute from "@/context/PrivateRoute";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [option, setoption] = useState("personal");
  const [userData, setUserData] = useState(null);
  const { handleGetUser } = useAuth();

  useEffect(() => {
    const handleUser = async () => {
      const user = await handleGetUser();
      if (user) {
        setUserData(user?.data?.data);
      } else {
        setUserData(null);
      }
    };
    handleUser();
  }, [handleGetUser]);



  return (
    <PrivateRoute>
      <div className="flex flex-col justify-center items-center w-full mt-32">
        <div>
          <ProfileCard
            firstName={userData?.first_name}
            lastName={userData?.last_name}
            email={userData?.email}
            accountType={userData?.customer_type}
          />
        </div>
        <div className="flex gap-5 my-5">
          <button
            className={`p-3 rounded-lg cursor-pointer ${
              option === "personal" ? " bg-[#00C464] text-white" : "text-black"
            }`}
            onClick={() => setoption("personal")}
          >
            Personal
          </button>
          <button
            className={`p-3 rounded-lg cursor-pointer ${
              option === "billing" ? "bg-[#00C464] text-white" : "text-black"
            }`}
            onClick={() => setoption("billing")}
          >
            Billing
          </button>
          <button
            className={`p-3 rounded-lg cursor-pointer ${
              option === "security" ? "bg-[#00C464] text-white" : "text-black"
            }`}
            onClick={() => setoption("security")}
          >
            Security
          </button>
        </div>
        <div>
          {option === "personal" && (
            <PersonalDetails
              first_name={userData?.first_name}
              last_name={userData?.last_name}
              email={userData?.email}
              phone_number={userData?.phone_number}
            />
          )}
          {option === "billing" && (
            <BillingDetails
              company_name={userData?.billing_addresses[0]?.company_name}
              vat_number={userData?.billing_addresses[0]?.vat_number}
              company_registration={
                userData?.billing_addresses[0]?.company_registration
              }
              city={userData?.billing_addresses[0]?.city}
              province={userData?.billing_addresses[0]?.province}
              postal_code={userData?.billing_addresses[0]?.postal_code}
              address_line_1={userData?.billing_addresses[0]?.address_line_1}
            />
          )}
          {option === "security" && <Security />}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
