"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../../lib/constants";
import { fetchAuthStatus } from "../../../services/auth";

const GoogleRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we have a token in localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
          // Fetch user data from backend
          const authStatus = await fetchAuthStatus(token);
          if (authStatus.success && authStatus.user) {
            // Update localStorage with fresh user data
            localStorage.setItem("authUser", JSON.stringify(authStatus.user));
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data from backend:', error);
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = BASE_URL;
      }, 1500);
    };

    initializeAuth();
  }, []);

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


