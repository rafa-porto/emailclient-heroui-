"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [loginProvider, setLoginProvider] = useState<
    "gmail" | "outlook" | "apple" | "microsoft" | undefined
  >(undefined);

  useEffect(() => {
    const providerFromUrl = searchParams.get("provider") as
      | "gmail"
      | "outlook"
      | "apple"
      | "microsoft"
      | null;

    if (providerFromUrl) {
      const baseUser = "user";
      let emailForProvider = `${baseUser}@example.com`;

      if (providerFromUrl === "gmail") {
        emailForProvider = `${baseUser}@gmail.com`;
      } else if (
        providerFromUrl === "outlook" ||
        providerFromUrl === "microsoft"
      ) {
        emailForProvider = `${baseUser}@outlook.com`;
      } else if (providerFromUrl === "apple") {
        emailForProvider = `${baseUser}@icloud.com`;
      }
      setLoginProvider(providerFromUrl);
      setUserEmail(emailForProvider);
    }
  }, [searchParams]);

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-neutral-900 flex">
      <Sidebar loginProvider={loginProvider} userEmail={userEmail} />
      <div className="flex-1 p-4">
        <main className="h-full w-full bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-neutral-800">
          {children}
        </main>
      </div>
    </div>
  );
}
