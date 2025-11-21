
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthProviders";
import { Switch } from "@/components/ui/switch";
import { Loader } from "../shared/Loader";
import Steps from "../shared/Steps";

type SaveData = {
  company_name: string;
  vat_number: string;
  company_registration: string;
  po_number: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  province: string;
};

const Delivery = () => {
  const [isSameAs, setSameAs] = useState(false);
  const [seveData, setSaveData] = useState<SaveData | null>();
  const {tradeOnly} = useAuth();
  const companyNameId = useId();
  const vatNumberId = useId();
  const registrationId = useId();
  const poNumberId = useId();
  const billingAddressLine1Id = useId();
  const billingAddressLine2Id = useId();
  const cityId = useId();
  const postalCodeId = useId();
  const provinceId = useId();
  const router = useRouter();
  const { handleDelivery } = useAuth();

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const handleGetData = () => {
      const dataJson = localStorage.getItem("billing address");
      if (dataJson) {
        const data = JSON.parse(dataJson);
        setSaveData(data);
        reset(data);
      }
    };
    handleGetData();
  }, [reset]);

  

  const onSubmit = async (data: any) => {
    const response = await handleDelivery(data);
    
    if (response.status === 201 || response.status === 200) {
      Swal.fire({
        title: "Successfully submited!",
        icon: "success",
        draggable: false,
      });
      if(tradeOnly){
        router.push("/signup/billing/delivery/trade");
      }else{
        router.push("/signup/billing/delivery/trade/verify");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
          timer: 500
      });
    }
  };




  //options
  const options = [
    {
      title: "Eastern Cape",
      value: "Eastern Cape"
    },
    {
      title: "Free State",
      value: "Free State"
    },
    {
      title: "Gauteng",
      value: "Gauteng"
    },
    {
      title: "KwaZulu-Natal",
      value: "KwaZulu-Natal"
    },
    {
      title: "Limpopo",
      value: "Limpopo"
    },
    {
      title: "Mpumalanga",
      value: "Mpumalanga"
    },
    {
      title: "Northern Cape",
      value: "Northern Cape"
    },
    {
      title: "North West",
      value: "North West"
    },
    {
      title: "Western Cape",
      value: "Western Cape"
    }
  ]



  if(seveData){
    <Loader/>
  }

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
            <div className=" flex flex-col items-center justify-center w-full lg:w-[940px] md:border-1 border-gray-100 md:rounded-lg md:shadow-lg py-6">
              <div className="w-full  flex justify-end lg:pr-16 pe-5 md:pr-0">
                <Link href={"/"}>
                  <Image
                    src="/logo/logo.png"
                    alt="logo"
                    height={100}
                    width={100}
                  />
                </Link>
              </div>
              {/*Progress Bar top*/}
              <Steps currentStep={3} />
              <form
                className="w-full max-w-[612px] md:mt-16 px-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[#313131]">Same as Billing Address</h1>
                    <Switch
                      id="airplane-mode"
                      onCheckedChange={() => setSameAs(!isSameAs)}
                      checked={isSameAs}
                      className=""
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={companyNameId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
                                    block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Company Name
                    </label>
                    <Input
                      id={companyNameId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="example"
                      disabled={isSameAs}
                      type="text"
                      {...register("company_name")}
                      required={true}
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={vatNumberId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      VAT Number
                    </label>
                    <Input
                      id={vatNumberId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="000 000 00000"
                      disabled={isSameAs}
                      type="text"
                      {...register("vat_number")}
                      required={true}
                    />
                  </div>

                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={registrationId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Company Registration (CIPC){" "}
                      <span className="text-red-500 ">*</span>
                    </label>
                    <Input
                      id={registrationId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="Select CIPC document"
                      disabled={isSameAs}
                      type="file"
                      {...register("company_registration")}
                      required={true}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                  </div>
                </div>

                <div className="group relative mt-8 w-full">
                  <label
                    htmlFor={poNumberId}
                    className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
                                  block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                  >
                    PO Number
                  </label>
                  <Input
                    id={poNumberId}
                    className="h-10 text-[#1C1B1F] font-poppins"
                    placeholder="000 0000 0000"
                    disabled={isSameAs}
                    type="text"
                    {...register("po_number")}
                    required={true}
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={billingAddressLine1Id}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Billing Address Line 1{" "}
                      <span className="text-red-500 ">*</span>
                    </label>
                    <Input
                      id={billingAddressLine1Id}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="example: 123/A, Green Stree"
                      disabled={isSameAs}
                      type="text"
                      {...register("address_line_1")}
                      required={true}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <div className="group relative mt-8 w-full">
                      <label
                        htmlFor={billingAddressLine2Id}
                        className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                      >
                        Billing Address Line 2
                      </label>
                      <Input
                        id={billingAddressLine2Id}
                        className="h-10 text-[#1C1B1F] font-poppins"
                        placeholder="example: 123/A, Green Stree"
                        disabled={isSameAs}
                        type="text"
                        {...register("address_line_2")}
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={cityId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      City/Suburb <span className="text-red-500 ">*</span>
                    </label>
                    <div className="relative w-full">
                      <Input
                        id={cityId}
                        className="h-10 text-[#1C1B1F] font-poppins"
                        placeholder="New York"
                        disabled={isSameAs}
                        type="text"
                        {...register("city")}
                        required={true}
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
                      htmlFor={postalCodeId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F] block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Postal Code
                    </label>
                    <Input
                      id={postalCodeId}
                      className="h-10 text-[#1C1B1F] font-poppins"
                      placeholder="0000"
                      disabled={isSameAs}
                      type="text"
                      required={true}
                      {...register("postal_code")}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="group relative mt-8 w-full">
                    <label
                      htmlFor={provinceId}
                      className="bg-background absolute start-1 top-0 z-10 font-poppins text-[#1C1B1F]
                                    block -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                    >
                      Province <span className="text-red-500 ">*</span>
                    </label>
                    <select
                      id={provinceId}
                      disabled={isSameAs}
                      {...register("province")}
                      className="h-10 w-full text-[#1C1B1F] font-poppins border border-gray-300 rounded-md px-3 focus:outline-none"
                    >
                      {options.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          defaultValue={seveData?.province}
                        >
                          {option.title}
                        </option>
                      ))}
                    </select>
                  </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
