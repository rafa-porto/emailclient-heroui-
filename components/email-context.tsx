"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { EmailData } from "@/types";
import { usePersistentState } from "@/components/hooks/use-persistent-state";

interface EmailContextType {
  selectedEmail: EmailData | null;
  setSelectedEmail: (email: EmailData | null) => void;
  isAiPanelOpen: boolean;
  setIsAiPanelOpen: (open: boolean) => void;
  isComposeModalOpen: boolean;
  setIsComposeModalOpen: (open: boolean) => void;
  emailPanelWidth: number;
  setEmailPanelWidth: (width: number) => void;
  aiPanelWidth: number;
  setAiPanelWidth: (width: number) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [emailPanelWidth, setEmailPanelWidth] = usePersistentState({
    key: "emailPanelWidth",
    defaultValue: 384, // 24rem (w-96)
  });
  const [aiPanelWidth, setAiPanelWidth] = usePersistentState({
    key: "aiPanelWidth",
    defaultValue: 320, // 20rem (w-80)
  });

  return (
    <EmailContext.Provider
      value={{
        selectedEmail,
        setSelectedEmail,
        isAiPanelOpen,
        setIsAiPanelOpen,
        isComposeModalOpen,
        setIsComposeModalOpen,
        emailPanelWidth,
        setEmailPanelWidth,
        aiPanelWidth,
        setAiPanelWidth,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);

  if (context === undefined) {
    throw new Error("useEmailContext must be used within an EmailProvider");
  }

  return context;
};
