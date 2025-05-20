"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";

import { subtitle, title } from "@/components/primitives";
import { AppleIcon, GmailIcon, OutlookIcon } from "@/components/icons"; // Importando os ícones

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailConnect = (service: string) => {
    setIsLoading(service);

    // Simulate connection process
    setTimeout(() => {
      setIsLoading(null);
      // Redirect to the specific success page based on the provider
      switch (service) {
        case "gmail":
          router.push("/login-success/gmail");
          break;
        case "outlook":
          router.push("/login-success/outlook");
          break;
        case "apple":
          router.push("/login-success/apple");
          break;
        default:
          router.push("/login-success");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={title({ color: "blue" })}>Login</h1>
          <p className={subtitle({ class: "mt-2" })}>
            Connect with your email provider
          </p>
        </div>

        <Card className="border-none shadow-md bg-background/60 dark:bg-background/60 backdrop-blur-md backdrop-saturate-150">
          <CardHeader className="flex flex-col items-center justify-center text-center p-6 border-b-1 border-default-100">
            <h2 className="text-xl font-semibold text-default-700">
              Choose your provider
            </h2>
          </CardHeader>
          <CardBody className="px-6 py-8 gap-4">
            <Button
              className="w-full font-semibold text-default-700 dark:text-default-200"
              isLoading={isLoading === "gmail"}
              radius="sm"
              size="lg"
              startContent={<GmailIcon className="h-5 w-5" />}
              variant="flat"
              onClick={() => handleEmailConnect("gmail")}
            >
              Connect with Gmail
            </Button>
            <Button
              className="w-full font-semibold text-default-700 dark:text-default-200"
              isLoading={isLoading === "outlook"}
              radius="sm"
              size="lg"
              startContent={<OutlookIcon className="h-5 w-5" />}
              variant="flat"
              onClick={() => handleEmailConnect("outlook")}
            >
              Connect with Outlook
            </Button>
            <Button
              className="w-full font-semibold text-default-700 dark:text-default-200"
              isLoading={isLoading === "apple"}
              radius="sm"
              size="lg"
              startContent={<AppleIcon className="h-5 w-5" />}
              variant="flat"
              onClick={() => handleEmailConnect("apple")}
            >
              Connect with Apple Mail
            </Button>
          </CardBody>
          <CardFooter className="px-6 py-4 flex flex-col items-center justify-center border-t-1 border-default-100">
            <p className="text-default-600 text-sm mb-2">
              Using a different provider?
            </p>
            <Link
              as={NextLink}
              className="font-medium text-sm"
              color="primary"
              href="/login-form" // You might want to create a separate page for traditional login
            >
              Login with Email and Password
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
