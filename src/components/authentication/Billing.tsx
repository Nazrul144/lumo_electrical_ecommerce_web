/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { useId, useState } from "react";

import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { z } from "zod";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "antd";
import { CheckCircle2 } from "lucide-react";

// Zod validation schema
const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(4, "Phone number must be at least 4 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms and policy"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Billing = () => {
  // const [currentStep, setCurrentStep] = useState(1);

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const id = useId();

  const router = useRouter();

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // Add this for immediate validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: any) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      router.push("/sign-in");
      // Handle successful submission here
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const pathName = usePathname();

  const getCurrentPath = () => {
    if (pathName.includes("signup/verify")) return 5;
    if (pathName.includes("signup/trade-only")) return 4;
    if (pathName.includes("signup/delevery")) return 3;
    if (pathName.includes("signup/billing")) return 2;
    return 1;
  };

  //Top Progress Bar:
  const steps = [
    { id: 1, label: "Registration" },
    { id: 2, label: "Billing" },
    { id: 3, label: "Delivery" },
    { id: 3, label: "Trade Only" },
    { id: 4, label: "Verify" },
  ];

  const currentPath = getCurrentPath();

  return (
    <div>
      <div className="lg:w-7xl mx-auto mt-10">
        <div>
          <div className="lg:flex gap-8 items-center">
            <div className="hidden lg:w-[686px] h-[855px] lg:flex flex-col items-center justify-center relative ">
              <Image
                src="/authentication/signup.png"
                alt="sign-up-image"
                fill
                className="rounded-3xl object-cover"
              />
            </div>

            <div className=" flex flex-col items-center justify-center lg:w-[940px] border-1 border-gray-100 rounded-lg shadow-lg py-6">
              <div className="w-full  flex justify-end lg:pr-16">
                <Image
                  src="/logo/logo.png"
                  alt="logo"
                  height={100}
                  width={100}
                />
              </div>
              {/*Progress Bar top*/}
              <div className="flex items-center justify-center gap-6 mt-6">
                {steps.map((step, index) => {
                  const isCompleted = currentPath > step.id;
                  const isActive = currentPath === step.id;

                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex flex-col items-center relative ${
                          index !== steps.length - 1 ? "mr-6" : ""
                        }`}
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full border-8 transition-all duration-300 ${
                            isCompleted
                              ? "bg-green-500 border-green-500 text-white"
                              : isActive
                              ? "border-green-500 text-green-600"
                              : "border-green-500 text-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={22} />
                          ) : (
                            <span>{step.id}</span>
                          )}
                        </div>

                        <div
                          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                            isCompleted || isActive
                              ? "bg-gradient-to-r from-green-700 to-lime-400 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.label}
                        </div>

                        {/* connector line */}
                        {index < steps.length - 1 && (
                          <div
                            className={`absolute top-5 left-[calc(55%+0.75rem)] w-24 h-[4px] ${
                              currentPath > step.id
                                ? "bg-green-500"
                                : "bg-green-500"
                            }`}
                          ></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form
                className="w-full max-w-[612px] mt-16"
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className="text-[#313131] text-2xl font-poppins mt-5">
                  Billing / Invoicing
                </p>

                <div className="flex flex-col w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor="customerType"
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
      block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Company Name
                    </label>
                    <Input
                      id={firstNameId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="example"
                      type="text"
                      {...register("firstName")}
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={firstNameId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      VAT Number
                    </label>
                    <Input
                      id={firstNameId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="000 000 00000"
                      type="text"
                      {...register("firstName")}
                    />
                  </div>

                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={lastNameId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Company Registration (CIPC){" "}
                      <span className="text-red-500 ">*</span>
                    </label>
                    <Input
                      id={lastNameId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="000 000 0000"
                      type="text"
                      {...register("lastName")}
                    />
                  </div>
                </div>

                <div className="group relative mt-8 w-full">
                  <label
                    htmlFor="customerType"
                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
      block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                  >
                    PO Number
                  </label>
                  <Input
                    id={firstNameId}
                    className="h-10 text-[#1C1B1F] font-poppins"
                    placeholder="000 0000 0000"
                    type="text"
                    {...register("firstName")}
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={emailId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Billing Address Line 1{" "}
                      <span className="text-red-500 ">*</span>
                    </label>
                    <Input
                      id={emailId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="example: 123/A, Green Stree"
                      type="text"
                      {...register("email")}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <div className="group relative mt-8 w-full">
                      <label
                        htmlFor={emailId}
                        className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                      >
                        Billing Address Line 2
                      </label>
                      <Input
                        id={emailId}
                        className="h-10 text-[#1C1B1F] font-poppins"
                        placeholder="example: 123/A, Green Stree"
                        type="text"
                        {...register("email")}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={passwordId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      City/Suburb <span className="text-red-500 ">*</span>
                    </label>
                    <div className="relative w-full">
                      <Input
                        id={passwordId}
                        className="h-10 text-[#1C1B1F] font-poppins"
                        placeholder="New York"
                        type="text"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-1 top-1/2 
                            -translate-y-1/2 cursor-pointer"
                      ></Button>
                    </div>
                  </div>
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={emailId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Postal Code
                    </label>
                    <Input
                      id={emailId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="0000"
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor="customerType"
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
      block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Province <span className="text-red-500 ">*</span>
                    </label>
                    <select
                      id="customerType"
                      className="h-10 w-full text-[#1C1B1F] font-poppins border border-gray-300 rounded-md px-3 focus:outline-none"
                    >
                      <option value="">Select type</option>
                      <option value="retail">Retail</option>
                      <option value="customer">Vendor</option>
                      <option value="option1">Wholesale Buyer</option>
                      <option value="option2">Distributor</option>
                    </select>
                  </div>
                </div>

                <div className="w-full mt-4">
                  <Link href="/signup/billing/delivery">
                    <Button
                      type="submit"
                      className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
                    >
                      Next
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
