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
    <div className="flex h-screen w-full">
      <Sidebar loginProvider={loginProvider} userEmail={userEmail} />
      <main className="flex-1 bg-white dark:bg-black w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
