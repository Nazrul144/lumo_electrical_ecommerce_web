"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.3,
        type: "keyframes",
        stiffness: 60,
        duration: 2,
      }}
      className="bg-gradient-to-r from-[#088347]/30 to-[#C6E824]/30  text-gray-900 py-5"
    >
      <footer className="footer sm:footer-horizontal justify-around items-center xl:items-start p-10">
        <aside>
          <Image src="/logo/logo.png" alt="logo" height={100} width={100} />
          <p className="footer-title">Lumo electrical Ltd.</p>
          <p className="footer-title"><Link href={"https://wa.me/+123654987877?text=Hello"} className="cursor-pointer">+ 123 654 987 877,</Link><br/>The Bronx, NY 14568, USA</p>
        </aside>
        <nav className="flex flex-col items-center">
          <h6 className="footer-title text-center text-xl">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link className="" href={"www.facebook.com/"}>
              <FaFacebook className="text-3xl" />
            </Link>
            <Link className="" href={"www.twitter.com/"}>
              <FaTwitter className="text-3xl" />
            </Link>
            <Link className="" href={"www.instagram.com/"}>
              <FaInstagram className="text-3xl" />
            </Link>
            <Link className="" href={"www.linkedin.com/"}>
              <FaLinkedin className="text-3xl" />
            </Link>
          </div>
        </nav>
        <nav className="flex flex-col items-center">
          <h6 className="footer-title text-center text-xl">Quick Links</h6>
          <div className="grid grid-cols-3 gap-x-5">
            <Link className=" footer-title " href={"/login"}>
              Login
            </Link>
            <Link className="footer-title text-md" href={"/signup"}>
              Sign up
            </Link>
            <Link className="footer-title text-md" href={"/products"}>
              Products
            </Link>
            <Link className="footer-title text-md" href={"/faqs"}>
              Faq&apos;s
            </Link>
            <Link className="footer-title text-md" href={"/about-us"}>
              About us
            </Link>
            <Link className="footer-title text-md" href={"/policies"}>
              Policies
            </Link>
          </div>
        </nav>
      </footer>
      <p className="text-center font-openSans text-red-400 font-semibold">
        Copyright &copy; {new Date().getFullYear()} Lumo electrical Ltd. All
        Rights Reserved
      </p>
    </motion.footer>
  );
}
