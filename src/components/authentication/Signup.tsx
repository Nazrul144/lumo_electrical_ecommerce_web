/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import Image from "next/image";
import { useId, useState } from "react"


import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { z } from "zod"

import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod validation schema
const signUpSchema = z.object({
    firstName: z.string()
        .min(2, "First Name must be at least 2 characters")
        .max(50, "First Name must be less than 50 characters"),
    lastName: z.string()
        .min(2, "Last Name must be at least 2 characters")
        .max(50, "Last Name must be less than 50 characters"),
    email: z.string()
        .email("Invalid email address"),
    phoneNumber: z.string().min(4, "Phone number must be at least 4 digits"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean()
        .refine((val) => val === true, "You must agree to the terms and policy")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Signup = () => {

  const firstNameId = useId();
    const lastNameId = useId();
    const emailId = useId();
    const phoneNumberId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();
    const termsOfServiceId = useId();

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch
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
            agreeToTerms: false
        }
    });

    const agreeToTerms = watch("agreeToTerms");

    const onSubmit = async (data: any) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Form submitted:", data);
            router.push("/sign-in");
            // Handle successful submission here
        } catch (error) {
            console.error("Submission error:", error);
        }
    };


  return (
    <div className='lg:w-7xl mx-auto mt-10'>
      <div>
            <div className="lg:flex gap-8 items-center">
                <div className="hidden lg:w-[686px] h-[855px] lg:flex flex-col items-center justify-center relative ">
                    <Image src="/authentication/signup.png" alt="sign-up-image" fill className="rounded-3xl object-cover" />
                </div>

                <div className=" flex flex-col items-center justify-center lg:w-[940px] border-1 border-gray-100 rounded-lg shadow-lg py-6">
                    <div className="w-full  flex justify-end lg:pr-16">
                        <Image src="/logo/logo.png" alt="logo" height={100} width={100} />
                    </div>
                    <form className="w-full max-w-[612px] mt-16" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-[#313131] font-poppins font-semibold text-4xl">Sign up</h1>
                        <p className="text-[#313131] font-poppins mt-5">Let’s get you all set up so you can access your personal
                            account.</p>

                        <div className="flex flex-col lg:flex-row gap-4 w-full">
                            <div className="group relative mt-8 w-full">
                                <label
                                    htmlFor={firstNameId}
                                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                                >
                                    First Name
                                </label>
                                <Input id={firstNameId} className="h-10 text-[#1C1B1F] font-poppins" placeholder="john"
                                    type="text" {...register("firstName")} />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div className="group relative mt-8 w-full">
                                <label
                                    htmlFor={lastNameId}
                                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                                >
                                    Last Name
                                </label>
                                <Input id={lastNameId} className="h-10 text-[#1C1B1F] font-poppins" placeholder="doe"
                                    type="text" {...register("lastName")} />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4 w-full">
                            <div className="group relative mt-8 w-full">
                                <label
                                    htmlFor={emailId}
                                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                                >
                                    Email
                                </label>
                                <Input id={emailId} className="h-10 text-[#1C1B1F] font-poppins" placeholder="john.doe@gmail.com"
                                    type="email" {...register("email")} />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="group relative mt-8 w-full">
                                <label
                                    htmlFor={phoneNumberId}
                                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                                >
                                    Phone Number
                                </label>
                                <Input id={phoneNumberId} className="h-10 text-[#1C1B1F] font-poppins" placeholder=""
                                    type="number" {...register("phoneNumber")} />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="group relative mt-8 w-full">
                            <label
                                htmlFor={passwordId}
                                className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                            >
                                Password
                            </label>
                            <div className="relative w-full">
                                <Input id={passwordId} className="h-10 text-[#1C1B1F] font-poppins" placeholder="..............."
                                    type={showPassword1 ? "text" : "password"} {...register("password")} />
                                <Button type="button" variant="ghost" className="absolute right-1 top-1/2 
                            -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword1(!showPassword1)}>
                                    {showPassword1 ? (
                                        <FiEyeOff className="h-6 w-6" />
                                    ) : (
                                        <FiEye className="h-6 w-6" />
                                    )}
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="group relative mt-8 w-full">
                            <label
                                htmlFor={confirmPasswordId}
                                className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                            >
                                Confirm Password
                            </label>
                            <div className="relative w-full">
                                <Input id={confirmPasswordId} className="h-10 text-[#1C1B1F] font-poppins" placeholder="..............."
                                    type={showPassword2 ? "text" : "password"} {...register("confirmPassword")} />
                                <Button type="button" variant="ghost" className="absolute right-1 top-1/2 
                            -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword2(!showPassword2)}>
                                    {showPassword2 ? (
                                        <FiEyeOff className="h-6 w-6" />
                                    ) : (
                                        <FiEye className="h-6 w-6" />
                                    )}
                                </Button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 font-poppins mt-8">
                            <Checkbox id={termsOfServiceId} checked={agreeToTerms}
                                onCheckedChange={(checked: boolean | "indeterminate") => setValue("agreeToTerms", Boolean(checked))} />
                            <Label htmlFor={termsOfServiceId}>
                                I agree to all the{" "}
                                <Link className="text-[#FF8682]" href="" target="_blank">
                                    Terms{" "}
                                </Link>
                                and{" "}
                                <Link className="text-[#FF8682]" href="" target="_blank">
                                    Privacy Policies
                                </Link>
                            </Label>
                        </div>
                        {errors.agreeToTerms && (
                            <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms.message}</p>
                        )}

                        <div className="w-full mt-8">
                            <Button type="submit" className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins" disabled={isSubmitting}>
                                {isSubmitting ? "Creating Account..." : "Create Account"}
                            </Button>
                        </div>

                        <p className="mt-8 text-center font-poppins">Already have an account?{"  "}<Link href="/login"
                            className="text-[#FF8682]">Login</Link></p>

                        <div className="w-full flex gap-1 mt-12">
                            <div className="w-full max-w-[250px] h-[1px] bg-[gray]" />
                            <p className="text-[gray] font-poppins -translate-y-1/2 text-sm">Or</p>
                            <div className="w-full max-w-[250px] h-[1px] bg-[gray]" />
                        </div>

                        <div className="w-full flex gap-4 mt-6">
                            <div className="w-full h-[50px] border border-[#515DEF] rounded-md flex items-center justify-center
                            cursor-pointer">
                                <Image src={"/sign-up-images/facebook-logo.svg"} alt="fb-logo" width={30} height={30} />
                            </div>
                            <div className="w-full h-[50px] border border-[#515DEF] rounded-md flex items-center justify-center
                            cursor-pointer">
                                <Image src={"/sign-up-images/Google_Icon.svg"} alt="google-logo" width={20} height={20} />
                            </div>
                            <div className="w-full h-[50px] border border-[#515DEF] rounded-md flex items-center justify-center
                            cursor-pointer">
                                <Image src={"/sign-up-images/Apple_Icon.svg"} alt="apple-logo" width={23} height={23} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
