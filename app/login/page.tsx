"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={title({ color: "blue" })}>Login</h1>
          <p className={subtitle({ class: "mt-2" })}>
            Sign in to access your account
          </p>
        </div>

        <Card className="border-none shadow-md bg-background/60 dark:bg-background/60 backdrop-blur-md backdrop-saturate-150">
          <CardBody className="px-6 py-8 gap-6">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-default-700 text-sm"
                  >
                    Password
                  </label>
                  <Link
                    as={NextLink}
                    href="/forgot-password"
                    className="text-sm"
                    color="primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="flat"
                  radius="sm"
                  size="lg"
                  autoComplete="current-password"
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
                Sign In
              </Button>
            </form>
          </CardBody>
          <CardFooter className="px-6 py-4 flex justify-center border-t-1 border-default-100">
            <p className="text-default-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                as={NextLink}
                href="/signup"
                color="primary"
                className="font-medium"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
