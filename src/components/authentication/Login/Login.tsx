"use client";
import Image from "next/image";
import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProviders";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { handleLogin } = useAuth();
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    data.remember_me = rememberMe;
    try {
      const res = await handleLogin(data);
      if (res.status === 200 || res.status === 201) {
        localStorage.clear();
        const userData = {
          access_token: res?.data?.data?.access,
          refresh_token: res?.data?.data?.refresh,
          user: res?.data?.data?.user,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        Swal.fire({
          title: "Login successfull!",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to Login!",
        text: error.response.data.message,
        icon: "error",
        draggable: true,
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#FFFFFF]">
      <div className="lg:flex justify-center items-center gap-10 mt-20 ">
        <div className="flex flex-col items-center justify-center md:border-1 border-gray-100 rounded-lg md:shadow-lg w-full mx-auto xl:mx-0  md:w-[686px] px-5 py-10 md:px-20 h-full xl:h-[850px]">
          <div className="w-full flex justify-end lg:pr-16">
            <Link href={"/"}>
              <Image src="/logo/logo.png" alt="logo" height={100} width={100} />
            </Link>
          </div>
          <form className="w-full mt-16" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-[#313131] font-poppins font-semibold text-4xl">
              Log in
            </h1>
            <p className="text-[#313131] font-poppins mt-5">
              Login to access your travelwise account.
            </p>
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="group relative mt-8 w-full">
                <label
                  htmlFor={emailId}
                  className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                >
                  Email <span className="text-red-500 ">*</span>
                </label>
                <Input
                  id={emailId}
                  className="h-10 text-[#1C1B1F] font-poppins"
                  placeholder="abc@gmail.com"
                  type="email"
                  required={true}
                  {...register("email")}
                />
              </div>
            </div>
            <div className="group relative mt-8 w-full">
              <label
                htmlFor={passwordId}
                className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
              >
                Password <span className="text-red-500 ">*</span>
              </label>
              <div className="relative w-full">
                <Input
                  id={passwordId}
                  className="h-10 text-[#1C1B1F] font-poppins"
                  placeholder="password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-1 top-1/2 
                            -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-6 w-6" />
                  ) : (
                    <FiEye className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <label
                  htmlFor={rememberId} // Linking label with checkbox
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    id={rememberId}
                    checked={rememberMe}
                    onClick={() => setRememberMe(!rememberMe)}
                    className="cursor-pointer"
                  />
                  <p>Remember password</p>
                </label>
              </div>
              <Link
                href="/forgotpassword"
                className="text-[#FF8682] cursor-pointer items-center"
              >
                Forgot Password
              </Link>
            </div>
            <div className="w-full mt-4">
              <button
                type="submit"
                className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
              >
                Log in
              </button>
            </div>
            <p className="mt-4 text-center font-poppins">
              Don&apos;t have an account?{"  "}
              <Link href="/signup" className="text-[#FF8682] font-bold">
                Signup
              </Link>
            </p>
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
  );
};

export default Login;
