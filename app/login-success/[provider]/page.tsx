"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody } from "@heroui/card";
import { CheckCircle } from "lucide-react";

// Define loading messages for each provider
const loadingMessages = {
  gmail: [
    "Connecting to Gmail...",
    "Synchronizing your messages...",
    "Almost there! Organizing your inbox...",
  ],
  outlook: [
    "Connecting to Outlook...",
    "Synchronizing your emails...",
    "Almost there! Organizing your inbox...",
  ],
  apple: [
    "Connecting to iCloud...",
    "Synchronizing your messages...",
    "Almost there! Organizing your inbox...",
  ],
  default: [
    "Connecting to your account...",
    "Synchronizing your data...",
    "Almost there! Getting everything ready for you...",
  ],
} as const;

export default function LoginSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Get provider from URL or use 'default' if not defined
  const provider = 
    (params?.provider as keyof typeof loadingMessages) || "default";
  const messages = loadingMessages[provider] || loadingMessages.default;

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (currentMessageIndex === messages.length - 1) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages.length, router]);

  const getProviderName = () => {
    switch (provider) {
      case "gmail":
        return "Gmail";
      case "outlook":
        return "Outlook";
      case "apple":
        return "iCloud";
      default:
        return "your account";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardBody className="p-6 text-center space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-success-50 dark:bg-success-900/30 mx-auto">
            <CheckCircle className="w-12 h-12 text-success-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Successfully Connected!
            </h1>
            <p className="text-default-500">
              Your {getProviderName()} account has been successfully connected.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="h-2 w-full max-w-xs mx-auto bg-default-100 dark:bg-default-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentMessageIndex + 1) / messages.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-default-500 text-center">
              {messages[currentMessageIndex]}
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <Spinner color="primary" size="sm" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
