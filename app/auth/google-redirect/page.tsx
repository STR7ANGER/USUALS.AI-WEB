"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="animate-spin inline-block h-6 w-6 rounded-full border-2 border-current border-r-transparent align-[-0.125em] text-yellow-400 motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="text-sm text-white">Finalizing sign-in...</p>
      </div>
    </div>
  );
};

export default GoogleRedirectPage;


