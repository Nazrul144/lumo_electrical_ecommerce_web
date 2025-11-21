"use client";
import Image from "next/image";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthProviders";

const ForgotPassword = () => {
  const emailId = useId();
  const router = useRouter();
  const { handleForgotPassword } = useAuth();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await handleForgotPassword(data);
     
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Verify successfull!",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/verifycode");
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

  return (
    <div>
      <div className="w-full h-screen bg-[#FFFFFF]">
        <div className="lg:flex justify-center items-center gap-5 md:gap-10 mt-20">
          <div className=" lg:w-1/2 flex flex-col items-center justify-center mx-auto xl:mx-0 border-1 border-gray-100 rounded-lg shadow-lg w-full md:w-[686px] px-5 md:px-20 h-[850px]">
            <div className="w-full max-w-[512px]">
              <Link href={"/"}>
                <Image
                  src="/logo/logo.png"
                  alt="logo"
                  height={100}
                  width={100}
                />
              </Link>
            </div>
            <form
              className="w-full max-w-[512px] mt-24"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Link href="/login" className="flex items-center gap-1">
                <MdOutlineArrowBackIos />
                <p className="font-poppins text-[#313131]">Back to login</p>
              </Link>
              <h1 className="text-[#313131] font-poppins font-semibold text-4xl mt-4">
                Forgot your password?
              </h1>
              <p className="text-[#313131] font-poppins mt-5">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>

              <div className="group relative mt-12 w-full">
                <label
                  htmlFor={emailId}
                  className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                >
                  Email
                </label>
                <Input
                  id={emailId}
                  className="h-10 text-[#1C1B1F] font-poppins"
                  placeholder="john.doe@gmail.com"
                  type="email"
                  {...register("email")}
                />
              </div>

              <div className="w-full mt-12">
                <Button
                  type="submit"
                  className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>

          <div className="hidden xl:w-[686px] h-[855px] lg:flex flex-col items-center justify-center relative ">
            <Image
              src="/authentication/signup.png"
              alt="sign-up-image"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
