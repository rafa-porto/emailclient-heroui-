"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner"; // Assuming you have a Spinner component

import { title, subtitle } from "@/components/primitives";

const loadingMessages = [
  "Connecting to your account...",
  "Fetching your messages...",
  "Loading your favorites...",
  "Syncing your settings...",
  "Finalizing setup...",
  "Almost there...",
];

export default function LoginSuccessPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (currentMessageIndex < loadingMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 1500); // Adjust delay as needed

      return () => clearTimeout(timer);
    } else {
      // All messages shown, redirect to home
      const redirectTimer = setTimeout(() => {
        router.push("/");
      }, 2000); // Adjust delay before redirect

      return () => clearTimeout(redirectTimer);
    }
  }, [currentMessageIndex, router]);

  return (
    <div className="w-full max-w-md mx-auto h-full">
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-default-50/50 shadow-xl rounded-lg w-full">
        <Spinner color="success" size="lg" />
        <h1 className={title({ color: "green", class: "mt-6 mb-4 leading-snug" })}>
          Login Successful!
        </h1>
        <p className={subtitle({ class: "mb-8 text-default-600 dark:text-default-400" })}>
          {loadingMessages[currentMessageIndex] || "Redirecting..."}
        </p>
        <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-success h-2.5 rounded-full transition-all duration-1500 ease-linear"
            style={{
              width: `${(currentMessageIndex / loadingMessages.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
