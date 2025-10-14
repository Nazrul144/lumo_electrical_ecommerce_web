/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { useId, useState } from "react";

import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "antd";
import { CheckCircle2, CircleUserRoundIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";

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

const Trade = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneNumberId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const id = useId();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
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

  //Top Progress Bar:
  const steps = [
    { id: 1, label: "Registration" },
    { id: 2, label: "Billing" },
    { id: 3, label: "Delivery" },
    { id: 4, label: "Trade Only" },
    { id: 5, label: "Verify" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  //File Upload:
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  return (
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
              <Image src="/logo/logo.png" alt="logo" height={100} width={100} />
            </div>
            {/*Progress Bar top*/}
            <div className="flex items-center justify-center gap-6 mt-6">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                  <div key={`step-${step.id}`} className="flex items-center">
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
                            : "border-gray-300 text-gray-400"
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
                            currentStep > step.id
                              ? "bg-green-500"
                              : "bg-gray-300"
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
              <p className="text-gray-600 font-poppins  text-xl font-bold">
                Trade only from
              </p>

              <div className="flex flex-col w-full">
                <div className="group relative mt-8 w-full">
                  <label
                    htmlFor="customerType"
                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
      block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                  >
                    Business Type <span className="text-red-500 ">*</span>
                  </label>
                  <select
                    id="customerType"
                    className="h-10 w-full text-[#1C1B1F] font-poppins border border-gray-300 rounded-md px-3 focus:outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="retail">Electrician</option>
                    <option value="customer">Vendor</option>
                  </select>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={firstNameId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Monthly Statement Preference
                    </label>
                    <Input
                      id={firstNameId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="000 0000 0000"
                      type="text"
                    />
                  </div>

                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={lastNameId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Procurement Contact
                    </label>
                    <Input
                      id={lastNameId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="doe@gmail.com"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/*Upload Doc*/}
              <div className="group relative mt-8 w-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-flex items-center gap-2 align-top">
                    <div
                      className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
                      aria-label={
                        previewUrl
                          ? "Preview of uploaded image"
                          : "Default user avatar"
                      }
                    >
                      {previewUrl ? (
                        <Image
                          className="size-full object-cover"
                          src={previewUrl}
                          alt="Preview of uploaded image"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div aria-hidden="true">
                          <CircleUserRoundIcon
                            className="opacity-60"
                            size={16}
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative inline-block">
                      <Button
                        variant={"secondary"}
                        onClick={openFileDialog}
                        aria-haspopup="dialog"
                        className="cursor-pointer"
                      >
                        {fileName ? "Change image" : "Upload Trade Doces "}
                      </Button>
                      <input
                        {...getInputProps()}
                        className="sr-only"
                        aria-label="Upload Trade Docs"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                  {fileName && (
                    <div className="inline-flex gap-2 text-xs">
                      <p
                        className="truncate text-muted-foreground"
                        aria-live="polite"
                      >
                        {fileName}
                      </p>{" "}
                      <button
                        onClick={() => removeFile(files[0]?.id)}
                        className="font-medium text-destructive hover:underline"
                        aria-label={`Remove ${fileName}`}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p
                    aria-live="polite"
                    role="region"
                    className="mt-2 text-xs text-muted-foreground"
                  >


                    {/*Checkmark*/}
                    <div className="flex items-center gap-2 font-poppins">
                      <div className="flex items-center gap-2 text-lg">
                        <Checkbox id={id} />
                        <Label htmlFor={id}>
                          Apply for <span className="text-red-600 font-semibold">Credit</span> Terms?
                        </Label>
                      </div>
                    </div>


                  </p>
                </div>
              </div>

              <div className="w-full mt-4">
                <Link href="signup/billing">
                  <Button
                    onClick={handleNext}
                    type="submit"
                    className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
                  >
                    Next
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-center font-poppins">
                Already have an account?{"  "}
                <Link href="/login" className="text-[#FF8682] font-bold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
