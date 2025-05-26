"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { EmailData } from "@/types";

interface EmailContextType {
  selectedEmail: EmailData | null;
  setSelectedEmail: (email: EmailData | null) => void;
  isAiPanelOpen: boolean;
  setIsAiPanelOpen: (open: boolean) => void;
  isComposeModalOpen: boolean;
  setIsComposeModalOpen: (open: boolean) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  return (
    <EmailContext.Provider
      value={{
        selectedEmail,
        setSelectedEmail,
        isAiPanelOpen,
        setIsAiPanelOpen,
        isComposeModalOpen,
        setIsComposeModalOpen,
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
