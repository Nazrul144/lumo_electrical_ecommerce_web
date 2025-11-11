"use client";
import api from "@/lib/api";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");

  //handeling all singup method
  const handleSignUp = async (data: any) => {
    try {
      // Simulate API call
      const res = await api.post("/accounts/register/", data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleBilling = async (data: any) => {
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
