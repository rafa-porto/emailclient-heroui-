"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/sidebar";
import EmailPanel from "@/components/email-panel";
import AiPanel from "@/components/ai-panel";
import ComposeModal from "@/components/compose-modal";
import ResizableDivider from "@/components/resizable-divider";
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
    emailPanelWidth,
    setEmailPanelWidth,
    aiPanelWidth,
    setAiPanelWidth,
  } = useEmailContext();

  const handleCloseEmailView = () => {
    setSelectedEmail(null);
  };

  const handleEmailPanelResize = (deltaX: number) => {
    // Calcular largura mínima e máxima baseada no tamanho da tela
    const minWidth = Math.max(280, window.innerWidth * 0.2);
    const maxWidth = Math.min(600, window.innerWidth * 0.5);
    const newWidth = Math.max(
      minWidth,
      Math.min(maxWidth, emailPanelWidth - deltaX) // Invertido: arrastar para direita diminui o painel
    );

    setEmailPanelWidth(newWidth);
  };

  const handleAiPanelResize = (deltaX: number) => {
    // Calcular largura mínima e máxima baseada no tamanho da tela
    const minWidth = Math.max(280, window.innerWidth * 0.2);
    const maxWidth = Math.min(600, window.innerWidth * 0.5);
    const newWidth = Math.max(
      minWidth,
      Math.min(maxWidth, aiPanelWidth - deltaX)
    );

    setAiPanelWidth(newWidth);
  };

  const resetEmailPanelWidth = () => {
    setEmailPanelWidth(384); // Reset to default w-96
  };

  const resetAiPanelWidth = () => {
    setAiPanelWidth(320); // Reset to default w-80
  };

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-neutral-900 flex overflow-hidden">
      <Sidebar loginProvider={loginProvider} userEmail={userEmail} />

      {/* Main Content Area */}
      <div className="flex-1 p-2 flex gap-0 h-full min-w-0">
        {/* Inbox Container */}
        <div
          className={`bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden h-full min-w-0 ${
            selectedEmail || isAiPanelOpen // Simplified condition
              ? "flex-1"
              : "w-full"
          }`}
        >
          {children}
        </div>

        {/* Email Panel with Resizable Divider */}
        {selectedEmail && (
          <>
            <ResizableDivider
              onDoubleClick={resetEmailPanelWidth}
              onResize={handleEmailPanelResize}
            />
            <div
              className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden h-full flex-shrink-0 ml-2 min-w-0"
              style={{
                width: `${emailPanelWidth}px`,
                minWidth: `${Math.max(280, window.innerWidth * 0.2)}px`,
                maxWidth: `${Math.min(600, window.innerWidth * 0.5)}px`,
              }}
            >
              <EmailPanel
                selectedEmail={selectedEmail}
                onClose={handleCloseEmailView}
              />
            </div>
          </>
        )}

        {/* AI Panel with Resizable Divider */}
        {isAiPanelOpen && (
          <>
            <ResizableDivider
              onDoubleClick={resetAiPanelWidth}
              onResize={handleAiPanelResize}
            />
            <div
              className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden h-full flex-shrink-0 ml-2 min-w-0"
              style={{
                width: `${aiPanelWidth}px`,
                minWidth: `${Math.max(280, window.innerWidth * 0.2)}px`,
                maxWidth: `${Math.min(600, window.innerWidth * 0.5)}px`,
              }}
            >
              <AiPanel onClose={() => setIsAiPanelOpen(false)} />
            </div>
          </>
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
