"use client";
import api from "@/lib/api";
import { AxiosResponse } from "axios";
import React, { createContext, useContext, ReactNode } from "react";

type SignUpData = {
  customer_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
  confirm_password?: string;
};

type BillingData = {
  email?: string;
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

type AuthContextType = {
  handleSignUp: (data: SignUpData) => Promise<AxiosResponse<any>>;
  handleBilling: (data: BillingData) => Promise<AxiosResponse<any>>;
  handleDelivery: (
    data: Omit<BillingData, "email">
  ) => Promise<AxiosResponse<any>>;
  handleTradeOnly: (data: FormData) => Promise<AxiosResponse<any>>;
  handleVerifyEmail: (data: {
    email: string;
    otp: string;
  }) => Promise<AxiosResponse<any>>;
  handleVerifyOtp: (data: {
    email: string;
    otp: string;
  }) => Promise<AxiosResponse<any>>;
  // handleVerifyOtpWhenForgot: (data: {
  //   email: string;
  //   otp: string;
  // }) => Promise<AxiosResponse<any>>;
  handleLogin: (data: any) => Promise<AxiosResponse<any>>;
  handleLogout: (data: any) => Promise<AxiosResponse<any>>;
  handleForgotPassword: (data: any) => Promise<AxiosResponse<any>>;
  handleChangePassword: (data: any) => Promise<AxiosResponse<any>>;
  tradeOnly: boolean;
  setTradeOnly: React.Dispatch<React.SetStateAction<boolean>>;
  resendOtp: () => Promise<AxiosResponse<any>>;
  handleToggle: () => void;
  handleGetUser: () => Promise<AxiosResponse<any>>;
  handleSetNewPassword: (data: any) => Promise<AxiosResponse<any>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type CustomerInfo = {
  email: string;
  customer_type: string;
};

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  //handeling all singup method
  const [tradeOnly, setTradeOnly] = React.useState(false);

  const handleToggle = () => {
    setTradeOnly(!tradeOnly);
  };

  const handleSignUp = async (data: SignUpData) => {
    try {
      const res = await api.post("/accounts/register/", data);
      if (res.status === 201) {
        const customerInfo: CustomerInfo = {
          email: res?.data?.data?.email,
          customer_type: res?.data?.data?.customer_type,
        };
        localStorage.setItem("customer_info", JSON.stringify(customerInfo));
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleBilling = async (data: BillingData) => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    if (email) {
      const payload = { ...data, email };
      try {
        const res = await api.post(
          "/accounts/register/billing-address/",
          payload
        );
        if (res.status === 201 || res.status === 200) {
          localStorage.setItem(
            "billing address",
            JSON.stringify(res?.data?.data)
          );
        }
        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };

  const handleDelivery = async (data: Omit<BillingData, "email">) => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    if (email) {
      const payload = { ...data, email };
      try {
        const res = await api.post(
          "/accounts/register/delivery-address/",
          payload
        );

        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };

  const handleTradeOnly = async (data: FormData) => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    if (email) {
      data.append("email", email);
      try {
        const res = await api.post("/accounts/register/trade-info/", data);

        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };

  //verify email when signup

  const handleVerifyEmail = async (data: { email: string; otp: string }) => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    const payload = { otp: data.otp, email };
    if (email) {
      try {
        const res = await api.post("/accounts/verify-email/", payload);
        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };

  const handleVerifyOtp = async (data: { email: string; otp: string }) => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    const payload = { otp: data.otp, email };
    if (email) {
      try {
        const res = await api.post("/accounts/verify-reset-otp/", payload);
        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };


  const resendOtp = async () => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    if (email) {
      try {
        const res = await api.post("/accounts/resend-otp/", { email });
        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };

  const handleLogin = async (data: any) => {
    try {
      const res = await api.post("/accounts/login/", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async (data: any) => {
    try {
      const res = await api.post("/accounts/logout/", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleForgotPassword = async (data: { email: string }) => {
    const reserveEmail = data.email;
    try {
      const res = await api.post("/accounts/forgot-password/", data);
      const customerInfo: CustomerInfo = {
        email: reserveEmail,
        customer_type: "customer",
      };
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("checking", "true");
        localStorage.setItem("customer_info", JSON.stringify(customerInfo));
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleChangePassword = async (data: any) => {
    try {
      const res = await api.post("/accounts/change-password/", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleSetNewPassword = async (data: any) => {
    const { email } = JSON.parse(localStorage.getItem("customer_info") || "{}");
    const otpData = JSON.parse(localStorage.getItem("otp") || "{}");
    if (otpData && email) {
      const payload = {
        email: email,
        new_password: data.createPassword,
        confirm_password: data.reEnterPassword,
        otp: otpData.otp,
      };
      console.log("checking payload", payload);
      try {
        const res = await api.post("/accounts/reset-password/", payload);
        return res;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Email is required");
    }
  };

  const handleGetUser = async () => {
    try {
      const res = await api.get("/accounts/profile/");
      return res;
    } catch (error) {
      throw error;
    }
  };

  const methodObj = {
    handleSignUp,
    handleBilling,
    handleDelivery,
    handleTradeOnly,
    handleVerifyEmail,
    handleVerifyOtp,
    handleLogin,
    handleLogout,
    handleForgotPassword,
    handleChangePassword,
    tradeOnly,
    handleToggle,
    setTradeOnly,
    resendOtp,
    handleGetUser,
    handleSetNewPassword,
    // handleVerifyOtpWhenForgot
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
