"use client"
import Image from "next/image";
import { FaSquareFacebook } from "react-icons/fa6";
import { TbBrandTwitter } from "react-icons/tb";
import { BsInstagram } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FiYoutube } from "react-icons/fi";
import { useId } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HiOutlineArrowRight } from "react-icons/hi2";

import { Textarea } from "../ui/textarea";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Label } from "@radix-ui/react-label";


// // Zod validation schema
// const contactFormSchema = z.object({
//     name: z.string()
//         .min(2, "Name must be at least 2 characters")
//         .max(50, "Name must be less than 50 characters"),
//     email: z.string()
//         .email("Invalid email address"),
//     phoneNumber: z.string().min(4, "Phone number must be at least 4 digits"),
//     company:z.string()
// });


const Contact = () => {


    const nameId = useId();
    const emailId = useId();
    const phoneId = useId();
    const companyId = useId();
    const messageId = useId();

    // const [markerLocation, setMarkerLocation] = useState({
    //     lat: 51.509865,
    //     lng: -0.118092,
    // });

  return (
    <div>
       <div>

            <div className="relative w-full h-[750px] bg-[url('/contact/banner.png')] bg-cover bg-center"
>
                <div className="absolute w-full h-full z-10 bg-gray-900/40" /> {/*Overlay*/}

                {/* Card */}
                <div className="absolute top-50 left-4 sm:left-32 max-w-[300px] w-full h-[400px] z-10 flex flex-col items-center 
                justify-center gap-6 bg-linear-to-b from-[#F8F8F8] to-[#088347] rounded-lg">
                    <Image src="/logo/logo.png" alt="logo" height={100} width={100} />
                    <h1 className="text-[#FFFDFB] font-garamond text-2xl">CONTACT US</h1>
                    <div className="bg-[#CAC9CF] max-w-[200px] w-full h-[1px]" />
                    <p className="text-[#FFFFFF] font-inter">Follow us on social media</p>
                    <div className="flex gap-5">

                        <a href="#"><FaSquareFacebook className="h-6 w-6"/></a>
                        <a href="#"><TbBrandTwitter className="h-6 w-6" /></a>
                        <a href="#"><BsInstagram className="h-6 w-6" /></a>
                        <a href="#"><SiLinkedin className="h-6 w-6" /></a>
                        <a href="#"><FiYoutube className="h-6 w-6"/></a>
                        
                        
                    
                    </div>
                </div>
            </div>

            {/* <div className="mt-12 flex flex-col items-center justify-center gap-3">
                <h1 className="text-[#3A3845] font-bold font-playFairDisplay text-3xl">Get in touch with us</h1>
                <p className="text-[#595667] font-openSans text-center">Lorem ipsum dolor sit amet consectetur adipiscing eli
                    mattis sit phasellus mollis sit aliquam sit nullam.</p>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#595667] font-openSans">Office Hours :</p>
                    <p className="text-[#088347] font-openSans">Monday - Friday  8:00 am to 5:00 pm</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#595667] font-openSans">Email:</p>
                    <p className="text-[#088347] font-openSans">dylan@plumsteadelec.co.za</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#595667] font-openSans">Phone :</p>
                    <p className="text-[#088347] font-openSans">(021) 7153151</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[#595667] font-openSans">Location :</p>
                    <p className="text-[#088347] font-openSans">Plumstead Electrical</p>
                    <p className="text-[#088347] font-openSans">Tramways Village, 89 Main road</p>
                    <p className="text-[#088347] font-openSans">Diep River</p>
                    <p className="text-[#088347] font-openSans">Cape Town</p>
                    <p className="text-[#088347] font-openSans">Cape Town</p>
                    <p className="text-[#088347] font-openSans">7800</p>
                    <p className="text-[#088347] font-openSans">South Africa</p>
                </div>
            </div> */}

            {/*Update Contact Us*/}
            <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <div className="text-center">
            <p className="font-medium text-blue-500 dark:text-blue-400">
              Contact us
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
              Get in touch
            </h1>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Our friendly team is always here to chat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Email
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-blue-500 dark:text-blue-400">
                 dylan@plumsteadelec.co.za
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Location
              </h2>
              <p className=" text-gray-500 dark:text-gray-400">
                Come say hello at our office HQ.
              </p>
              <p className="mt-2 text-blue-500 dark:text-blue-400">
                Plumstead Electrical. Tramways Village, 89 Main road
              </p>
              <p className="mt-2 text-blue-500 dark:text-blue-400">
                Diep River, Cape Town 7800, South Africa
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Phone
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Mon-Fri from 8:00 am to 5:00 pm.
              </p>
              <p className="mt-2 text-blue-500 dark:text-blue-400">
                (021) 7153151
              </p>
            </div>

            {/* <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Phone
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Mon-Fri from 8am to 5pm.
              </p>
              <p className="mt-2 text-blue-500 dark:text-blue-400">
                +1 (555) 000-0000
              </p>
            </div> */}

          </div>
        </div>
      </section>

            <div className="flex flex-col lg:flex-row gap-6 mt-12">
                {/* Form */}
                <div className="w-full lg:w-1/2 p-2 lg:p-6">
                    <div className="flex flex-col sm:flex-row gap-8 w-full mt-8">
                        <div className="group relative w-full">
                            <label
                                htmlFor={nameId}
                                className="bg-background absolute start-1 top-0 z-10 font-openSans text-[#1C1B1F] block 
                                -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                            >
                                Name
                            </label>
                            <Input id={nameId} className="h-10 text-[#1C1B1F] font-openSans" placeholder="Prayas Mazumder"
                                type="text" />
                        </div>

                        <div className="group relative w-full">
                            <label
                                htmlFor={emailId}
                                className="bg-background absolute start-1 top-0 z-10 font-openSans text-[#1C1B1F] block 
                                -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                            >
                                Email
                            </label>
                            <Input id={emailId} className="h-10 text-[#1C1B1F] font-openSans" placeholder="prayasmazumder150@gmail.com"
                                type="text" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 w-full mt-8">
                        <div className="group relative w-full">
                            <label
                                htmlFor={phoneId}
                                className="bg-background absolute start-1 top-0 z-10 font-openSans text-[#1C1B1F] block 
                                -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                            >
                                Phone
                            </label>
                            <Input id={phoneId} className="h-10 text-[#1C1B1F] font-openSans" placeholder="+00 00 000 000"
                                type="text" />
                        </div>

                        <div className="group relative w-full">
                            <label
                                htmlFor={companyId}
                                className="bg-background absolute start-1 top-0 z-10 font-openSans text-[#1C1B1F] block 
                                -translate-y-1/2 px-2 text-xs font-normal group-has-disabled:opacity-50"
                            >
                                Company
                            </label>
                            <Input id={companyId} className="h-10 text-[#1C1B1F] font-openSans" placeholder="Company.exe"
                                type="text" />
                        </div>
                    </div>

                    <div className="group relative mt-8">
                        <Label
                            htmlFor={messageId}
                            className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 
                            text-xs font-normal group-has-disabled:opacity-50"
                        >
                            Message
                        </Label>
                        <Textarea id={messageId} className="font-openSans h-[150px]" placeholder="Type message..." />
                    </div>

                    <div className="w-full mt-8">
                        <Button type="submit" className="w-full h-10 flex gap-1 text-[#F3F3F3] bg-linear-to-r from-[#088347]
                            to-[#C6E824] cursor-pointer font-poppins rounded-none" >
                            Send Message
                            <HiOutlineArrowRight />
                        </Button>
                    </div>
                </div>


                {/* Map */}
                <div className="w-full lg:w-1/2 p-2 h-[450px] lg:p-4">
                    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
                        <Map
                            style={{ borderRadius: "20px" }}
                            defaultZoom={13}
                            // defaultCenter={markerLocation}
                            gestureHandling={"greedy"}
                            disableDefaultUI
                        >
                            {/* <Marker position={markerLocation} /> */}
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact
