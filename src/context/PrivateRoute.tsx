"use client";

import { Loader } from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.access_token;

    console.log(token);


    if (!token) {
      router.replace("/login"); // Redirect to login
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  if (!isAllowed) return <Loader/>; 

  return <>{children}</>;
}
