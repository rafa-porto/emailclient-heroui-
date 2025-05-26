"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/sidebar";
import EmailPanel from "@/components/email-panel";
import AiPanel from "@/components/ai-panel";
import ComposeModal from "@/components/compose-modal";
import { EmailProvider, useEmailContext } from "@/components/email-context";

function DashboardContent({
  children,
  userEmail,
  loginProvider,
}: {
  children: React.ReactNode;
  userEmail: string;
  loginProvider: "gmail" | "outlook" | "apple" | "microsoft" | undefined;
}) {
  const {
    selectedEmail,
    isAiPanelOpen,
    setSelectedEmail,
    setIsAiPanelOpen,
    isComposeModalOpen,
    setIsComposeModalOpen,
  } = useEmailContext();

  const handleCloseEmailView = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-neutral-900 flex">
      <Sidebar loginProvider={loginProvider} userEmail={userEmail} />

      {/* Main Content Area */}
      <div className="flex-1 p-2 flex gap-2 h-full">
        {/* Inbox Container */}
        <div
          className={`bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden transition-width duration-300 ease-in-out h-full ${
            selectedEmail || isAiPanelOpen // Simplified condition
              ? "flex-1"
              : "w-full"
          }`}
        >
          {children}
        </div>

        {/* Email Panel */}
        {selectedEmail && (
          <div
            className={`${
              isAiPanelOpen ? "w-80" : "w-96"
            } transition-width duration-300 ease-in-out bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden h-full flex-shrink-0`}
          >
            <EmailPanel
              selectedEmail={selectedEmail}
              onClose={handleCloseEmailView}
            />
          </div>
        )}

        {/* AI Panel */}
        {isAiPanelOpen && (
          <div
            className={`${
              selectedEmail ? "w-80" : "w-96"
            } transition-width duration-300 ease-in-out bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden h-full flex-shrink-0`}
          >
            <AiPanel onClose={() => setIsAiPanelOpen(false)} />
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <ComposeModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
      />
    </div>
  );
}

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
    <EmailProvider>
      <DashboardContent loginProvider={loginProvider} userEmail={userEmail}>
        {children}
      </DashboardContent>
    </EmailProvider>
  );
}
