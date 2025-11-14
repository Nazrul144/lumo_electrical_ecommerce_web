/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoChevronBackOutline } from "react-icons/io5";
import Steps from "../shared/Steps";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthProviders";

const Verify = () => {
  const otpId = useId();
  const router = useRouter();
  const {handleVerify, resendOtp} = useAuth();


  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await handleVerify(data);
      console.log("checking response.....",res);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Verify successfull!",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1000,
        });
        localStorage.removeItem("billing address");
        localStorage.removeItem("customer_info");
        router.push("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to verify!",
        icon: "error",
        draggable: true,
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(error);
    }
  };

  const handleReset = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await resendOtp();
    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Successfull",
        text: "code has been sent to your email",
        showConfirmButton: false,
        timer: 1000,
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to send code",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

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
            <div className="w-full  flex justify-between lg:pr-16">
              <div className="flex items-center ml-6 font-semibold">
                <IoChevronBackOutline />
                <Link href={"/login"}>Back to login</Link>
              </div>
              <Link href={"/"}>
                <Image
                  src="/logo/logo.png"
                  alt="logo"
                  height={100}
                  width={100}
                />
              </Link>
            </div>
            {/*Back to login*/}

            <Steps currentStep={5} />

            <form
              className="w-full max-w-[612px] mt-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-[#313131] font-poppins font-semibold text-4xl">
                Verify Code
              </h1>
              <p className="text-[#313131] font-poppins mt-5">
                An authentication code has been sent to your email.
              </p>

              <div className="group relative mt-8 w-full">
                <label
                  htmlFor={otpId}
                  className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                >
                  Enter Code
                </label>
                <div className="relative w-full">
                  <Input
                    id={otpId}
                    className="h-10 text-[#1C1B1F] font-poppins"
                    placeholder="000000"
                    type="text"
                    {...register("otp")}
                  />
                </div>
              </div>

              <div className="mt-3">
                <span>
                  <p>Didn&apos;t receive a code?</p>
                  <button onClick={handleReset} className="text-red-500 cursor-pointer">
                    Resend
                  </button>
                </span>
              </div>
              <div className="w-full mt-4">
                <Button
                  type="submit"
                  className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
                >
                  Next
                </Button>
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

export default Verify;
