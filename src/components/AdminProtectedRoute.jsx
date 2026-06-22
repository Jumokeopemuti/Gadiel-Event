"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({
  children,
}) {

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

 useEffect(() => {
  console.log("Protected Route Running");

  const email =
    localStorage.getItem("adminEmail");

  console.log("Email:", email);

  if (!email) {
    console.log("No admin email found");

    router.replace("/admin-login");

    setLoading(false);
    return;
  }

  console.log("Authorized");

  setAuthorized(true);
  setLoading(false);
}, [router]);



  /* Prevent flash */

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-white
      ">

        <div className="
          w-12
          h-12
          border-4
          border-gray-200
          border-t-[#572649]
          rounded-full
          animate-spin
        " />

      </div>

    );

  }

  if (!authorized) {

    return null;

  }

  return children;
}