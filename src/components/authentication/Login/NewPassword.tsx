"use client";
import Image from "next/image";
import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthProviders";
import Swal from "sweetalert2";

// Zod validation schema
const changePasswordSchema = z
  .object({
    createPassword: z
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
    reEnterPassword: z.string(),
  })
  .refine((data) => data.createPassword === data.reEnterPassword, {
    message: "Passwords don't match",
    path: ["reEnterPassword"],
  });

const NewPassword = () => {
  const createPasswordId = useId();
  const reEnterPasswordId = useId();
  const { handleSetNewPassword } = useAuth();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange", // Add this for immediate validation
  });

  const onSubmit = async (data) => {
    const res = await handleSetNewPassword(data);
    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        title: "successfull!",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/login");
    }else{
      Swal.fire({
        title: "Failed !",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    
  };

  return (
    <div>
      <div className="w-full h-screen bg-[#FFFFFF]">
        <div className="lg:flex justify-center items-center gap-10 mt-5">
          <div className="lg:w-1/2 flex flex-col items-center justify-center border-1 border-gray-100 rounded-lg shadow-lg w-[686px] px-20 h-[850px]">
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
              <h1 className="text-[#313131] font-poppins font-semibold text-4xl mt-4">
                Set a password
              </h1>
              <p className="text-[#313131] font-poppins mt-5">
                Your previous password has been reseted. Please set a new
                password for your account.
              </p>

              <div className="group relative mt-12 w-full">
                <label
                  htmlFor={createPasswordId}
                  className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                >
                  Create Password
                </label>
                <div className="relative w-full">
                  <Input
                    id={createPasswordId}
                    className="h-10 text-[#1C1B1F] font-poppins"
                    placeholder="..............."
                    type={showPassword1 ? "text" : "password"}
                    {...register("createPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-1 top-1/2 
                                -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 ? (
                      <FiEyeOff className="h-6 w-6" />
                    ) : (
                      <FiEye className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                {errors.createPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.createPassword.message}
                  </p>
                )}
              </div>

              <div className="group relative mt-11 w-full">
                <label
                  htmlFor={reEnterPasswordId}
                  className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                >
                  Re-enter Password
                </label>
                <div className="relative w-full">
                  <Input
                    id={reEnterPasswordId}
                    className="h-10 text-[#1C1B1F] font-poppins"
                    placeholder="..............."
                    type={showPassword2 ? "text" : "password"}
                    {...register("reEnterPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-1 top-1/2 
                                -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? (
                      <FiEyeOff className="h-6 w-6" />
                    ) : (
                      <FiEye className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                {errors.reEnterPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reEnterPassword.message}
                  </p>
                )}
              </div>

              <div className="w-full mt-11">
                <Button
                  type="submit"
                  className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Setting Password..." : "Set Password"}
                </Button>
              </div>
            </form>
          </div>

          <div className="hidden lg:w-[686px] h-[855px] lg:flex flex-col items-center justify-center relative ">
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

export default NewPassword;
