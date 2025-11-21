"use client";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import BtnLink from "./BtnLink";
import SearchPopup from "./SearchPopUp";
import { useAuth } from "@/context/AuthProviders";
import Swal from "sweetalert2";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you want
  display: "swap",
});

type UserData = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout, handleGetUser } = useAuth();

  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Products",
      path: "/products",
    },
    {
      title: "Categories",
      path: "/categories",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  useEffect(() => {
    const handleUser = async () => {
      const user = await handleGetUser();
      if (user) {
        setUserData(user?.data?.data);
      } else {
        setUserData(null);
      }
    };
    handleUser();
  }, [handleGetUser]);

  const handleSignOut = async () => {
    const user = localStorage.getItem("user");
    try {
      if (user) {
        const userObj = JSON.parse(user);
        const res = await handleLogout({ refresh: userObj.refresh_token });
        if (res.status === 200) {
          localStorage.removeItem("user");
          setUserData(null);
          Swal.fire({
            icon: "success",
            title: "Logout successfull",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "User is not found",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Logout failed !",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div>
      <header
        className="top-0 w-10/12  md:w-11/12 left-[4%]  xl:left-16 md:right-auto bg-white  backdrop-blur-md border-b
        border-gray-200  rounded-full fixed z-50 mt-6 shadow-xl"
      >
        <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center md:justify-between">
            {/* Logo Section */}
            <div className="hidden md:flex">
              <div className="flex-shrink-0">
                <Link className="hidden lg:block" href="/">
                  <Image
                    src="/logo/logo.png"
                    alt="logo"
                    height={60}
                    width={80}
                  />
                </Link>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks?.map((navLink) => (
                <Link
                  className={` ${
                    pathName === navLink.path
                      ? "text-[#C6E824] underline playfair.className"
                      : ""
                  } ${playfair.className} font-bold text-[#088347] text-xl
                        dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300`}
                  href={navLink.path}
                  key={navLink.path}
                >
                  {navLink.title}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-5">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full text-green-600 cursor-pointer dark:text-gray-300 hover:bg-gray-100  transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>
              {userData ? (
                <div className="flex items-center space-x-5">
                  <Link
                    href="/profile"
                    className="rounded-full cursor-pointer shadow-sm text-green-600"
                  >
                    <FaCircleUser className="h-7 w-7" />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-lg active:scale-95 text-white cursor-pointer transition-colors duration-300 bg-green-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-5">
                  {/* <BtnLink
                    text="Sign Up"
                    className="border-[2px] border-solid [border-image-source:linear-gradient(90deg,#088347_0%,#C6E824_100%)] [border-image-slice:1] bg-[linear-gradient(90deg,#088347_0%,#C6E824_100%)] bg-clip-text text-transparent rounded-md"
                    link="/signup"
                  /> */}
                  <BtnLink text="Log in" link="/login" />
                </div>
              )}
            </div>
            <div className="w-full justify-between md:hidden flex">
              {/* -------------------------------------------------Mobile Menu Button -----------------------------*/}
              <div className=" ">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100  rounded-md"
                  aria-label="Toggle menu"
                >
                  <Menu
                    className={`h-6 w-6 transition-transform duration-300 ${
                      isMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                    }`}
                  />
                  {/* <X
                  className={`h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                    isMenuOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                  }`}
                /> */}
                </button>
              </div>
              {/* sign up, logout button for mobile  */}
              <div className="flex justify-center items-center space-x-5">
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2 rounded-full text-green-600 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Search className="h-6 w-6" />
                </button>
                {userData ? (
                  <div className="flex items-center space-x-5">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="p-2 rounded-full text-green-600 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Search className="h-6 w-6" />
                    </button>
                    <Link
                      href="/profile"
                      className="rounded-full cursor-pointer shadow-sm text-green-600"
                    >
                      <FaCircleUser className="h-7 w-7" />
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="px-3 py-2 rounded-lg active:scale-95 text-white cursor-pointer transition-colors duration-300 bg-green-700"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-5">
                    {/* <BtnLink
                      text="Sign Up"
                      className="border-[2px] border-solid [border-image-source:linear-gradient(90deg,#088347_0%,#C6E824_100%)] [border-image-slice:1] bg-[linear-gradient(90deg,#088347_0%,#C6E824_100%)] bg-clip-text text-transparent rounded-md"
                      link="/signup"
                    /> */}
                    <BtnLink text="Log in" link="/login" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 bg-opacity-50 transition-opacity md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <a href="#">
                <Image
                  src="/logo/logo.png"
                  alt="logo"
                  height={100}
                  width={100}
                />
              </a>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500  rounded-md hover:bg-gray-100 "
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-grow p-4">
            <div className="flex flex-col space-y-2">
              {navLinks?.map((navLink) => (
                <Link
                  className={` ${
                    pathName === navLink.path ? "text-[#C6E824] underline" : ""
                  } px-3 py-2 text-base font-medium text-[#088347]  rounded-md `}
                  href={navLink.path}
                  key={navLink.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navLink.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-gray-200 ">
            <a href="#" className="rounded-full shadow-sm text-green-600">
              {userData && (
                <FaCircleUser
                  title={userData.first_name}
                  className="h-10 w-10"
                />
              )}
            </a>
          </div>
        </div>
      </div>
      <SearchPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
