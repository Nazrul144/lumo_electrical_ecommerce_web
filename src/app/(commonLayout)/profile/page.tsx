import PersonalInfo from "@/components/profile/PersonalDetails";
import ProfileCard from "@/components/profile/ProfileCard";
import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-32">
      <div>
        <ProfileCard
          name="Piyas Mojumder"
          email="prayasmazumder150@gmail.com"
          accountType="Trade account"
        />
      </div>
      <div className="flex gap-5 my-5">
        <button className=" text-white p-3 rounded-lg bg-[#00C464]">
          Personal
        </button>
        <button className=" text-white p-3 rounded-lg bg-[#00C464]">
          Billing
        </button>
        <button className=" text-white p-3 rounded-lg bg-[#00C464]">
          Security
        </button>
      </div>
      <div>
        <PersonalInfo
          firstName="Prayas"
          lastName="Mojumder"
          email="prayasmazumder150@gmail.com"
          phone="12487953683"
        />
      </div>
    </div>
  );
};

export default Profile;
