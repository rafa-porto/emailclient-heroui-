"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody } from "@heroui/card";
import { CheckCircle } from "lucide-react";

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
    <Card className="border-none shadow-md bg-background/95 dark:bg-background/95 backdrop-blur-md backdrop-saturate-150 rounded-xl overflow-hidden">
      <CardBody className="p-8 text-center space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-success-50 dark:bg-success-900/30 mx-auto">
            <CheckCircle className="w-12 h-12 text-success-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Login Successful!
            </h1>
            <p className="text-default-600 text-sm">
              {loadingMessages[currentMessageIndex] || "Redirecting..."}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="h-2 w-full max-w-xs mx-auto bg-default-100 dark:bg-default-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-success-500 transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentMessageIndex + 1) / loadingMessages.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Spinner color="success" size="sm" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
