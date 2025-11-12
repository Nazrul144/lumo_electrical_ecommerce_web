"use client";
import api from "@/lib/api";
import React, { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);


type CustomerInfo = {
  email: string;
  customer_type: string;
}

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {

  //handeling all singup method
  const handleSignUp = async (data: any) => {
    try {
      // Simulate API call
      console.log("checking handle",data);
      const res = await api.post("/accounts/register/", data);
      if(res.data?.statusCode === 200){
        const customerInfo:CustomerInfo = {
          email: res?.data?.data?.email,
          customer_type: res?.data?.data?.customer_type,
        }
        localStorage.setItem("customer_info", JSON.stringify(customerInfo));
      }
      return res;
    } catch (error) {
      console.log("checking error", error);
      return error;
    }
  };

  const handleBilling = async (data: any) => {
    const {email} = JSON.parse(localStorage.getItem("customer_info") || "{}");
    console.log("checking email", email);
    if (email) {
        data.email = email;
      try {
        const res = await api.post("/accounts/register/billing-address/", data);
        return res;
      } catch (error) {
        return error;
      }
    }else{
        throw new Error("Email is required");
    }
  };

  const handleDelivery = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleTradeOnly = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleVerify = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleLogin = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleLogout = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleForgotPassword = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleChangePassword = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const methodObj = {
    handleSignUp,
    handleBilling,
    handleDelivery,
    handleTradeOnly,
    handleVerify,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleChangePassword,
  };

  return (
    <AuthContext.Provider value={methodObj}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
