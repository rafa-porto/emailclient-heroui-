"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import NextLink from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={title({ color: "blue" })}>Reset Password</h1>
          <p className={subtitle({ class: "mt-2" })}>
            Enter your email to receive password reset instructions
          </p>
        </div>

        <Card className="border-none shadow-md bg-background/60 dark:bg-background/60 backdrop-blur-md backdrop-saturate-150">
          <CardBody className="px-6 py-8 gap-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-default-700 text-sm">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="flat"
                    radius="sm"
                    size="lg"
                    autoComplete="email"
                    required
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  color="primary"
                  variant="shadow"
                  radius="sm"
                  size="lg"
                  className="w-full font-semibold mt-2"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-success mb-4">
                  Instructions sent to {email}
                </p>
                <p className="text-sm text-default-600 mb-4">
                  If an account exists with this email, you will receive
                  password reset instructions shortly.
                </p>
              </div>
            )}
          </CardBody>
          <CardFooter className="px-6 py-4 flex justify-center border-t-1 border-default-100">
            <p className="text-default-600 text-sm">
              <Link
                as={NextLink}
                href="/login"
                color="primary"
                className="font-medium"
              >
                Back to Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
