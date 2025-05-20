"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home page after successful signup
      router.push("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={title({ color: "blue" })}>Sign Up</h1>
          <p className={subtitle({ class: "mt-2" })}>
            Create your account and get started
          </p>
        </div>

        <Card className="border-none shadow-md bg-background/60 dark:bg-background/60 backdrop-blur-md backdrop-saturate-150">
          <CardBody className="px-6 py-8 gap-6">
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-default-700 text-sm">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="flat"
                  radius="sm"
                  size="lg"
                  autoComplete="name"
                  required
                  className="w-full"
                />
              </div>

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
                <label htmlFor="password" className="text-default-700 text-sm">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="flat"
                  radius="sm"
                  size="lg"
                  autoComplete="new-password"
                  required
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-default-700 text-sm"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="flat"
                  radius="sm"
                  size="lg"
                  autoComplete="new-password"
                  required
                  className="w-full"
                />
              </div>

              {error && <p className="text-danger text-sm mt-1">{error}</p>}

              <div className="mt-2">
                <Button
                  type="submit"
                  color="primary"
                  variant="shadow"
                  radius="sm"
                  size="lg"
                  className="w-full font-semibold"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="px-6 py-4 flex justify-center border-t-1 border-default-100">
            <p className="text-default-600 text-sm">
              Already have an account?{" "}
              <Link
                as={NextLink}
                href="/login"
                color="primary"
                className="font-medium"
              >
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
