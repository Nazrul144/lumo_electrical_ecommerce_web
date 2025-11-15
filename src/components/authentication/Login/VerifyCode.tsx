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

const VerifyCode = () => {
  const { handleVerifyOtpWhenForgot, resendOtp } = useAuth();
  const otpId = useId();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await handleVerifyOtpWhenForgot(data);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "successfull!",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1000,
        });
        localStorage.removeItem("billing address");
        localStorage.removeItem("customer_info");
        router.push("/newpassword");
      }
    } catch (error) {
      Swal.fire({
        title: "Failed !",
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
    } else {
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
    <div>
      <div className="w-full h-screen bg-[#FFFFFF]">
        <div className="lg:flex justify-center items-center gap-10 mt-5">
          <div className=" lg:w-1/2 flex flex-col items-center justify-center border-1 border-gray-100 rounded-lg shadow-lg w-[686px] px-20 h-[850px]">
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
                Verify code
              </h1>
              <p className="text-[#313131] font-poppins mt-5">
                An authentication code has been sent to your email.
              </p>

              <div className="group relative mt-12 w-full">
                <label
                  htmlFor={otpId}
                  className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                >
                  Enter Code
                </label>
                <Input
                  id={otpId}
                  className="h-10 text-[#1C1B1F] font-poppins"
                  placeholder="7789BM6X"
                  type="text"
                  {...register("otp")}
                />
              </div>

              <p className="mt-8 font-poppins">
                Didn&apos;t receive a code?{" "}
                <button
                  onClick={handleReset}
                  className="text-[#FF8682] cursor-pointer"
                >
                  Resend
                </button>
              </p>

              <div className="w-full mt-8">
                <Button
                  type="submit"
                  className="w-full h-10 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
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

export default VerifyCode;
