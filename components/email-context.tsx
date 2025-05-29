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
  // New email management functions
  starredEmails: string[];
  toggleStarEmail: (emailId: string) => void;
  isEmailStarred: (emailId: string) => boolean;
  archivedEmails: string[];
  archiveEmail: (emailId: string) => void;
  unarchiveEmail: (emailId: string) => void;
  isEmailArchived: (emailId: string) => boolean;
  deletedEmails: string[];
  deleteEmail: (emailId: string) => void;
  restoreEmail: (emailId: string) => void;
  permanentlyDeleteEmail: (emailId: string) => void;
  isEmailDeleted: (emailId: string) => boolean;
  readEmails: string[];
  markAsRead: (emailId: string) => void;
  markAsUnread: (emailId: string) => void;
  isEmailRead: (emailId: string) => boolean;
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

  // Email management states with localStorage
  const [starredEmails, setStarredEmails] = usePersistentState({
    key: "starredEmails",
    defaultValue: [] as string[],
  });

  const [archivedEmails, setArchivedEmails] = usePersistentState({
    key: "archivedEmails",
    defaultValue: [] as string[],
  });

  const [deletedEmails, setDeletedEmails] = usePersistentState({
    key: "deletedEmails",
    defaultValue: [] as string[],
  });

  const [readEmails, setReadEmails] = usePersistentState({
    key: "readEmails",
    defaultValue: [] as string[],
  });

  // Star functionality
  const toggleStarEmail = (emailId: string) => {
    setStarredEmails((prev: string[]) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const isEmailStarred = (emailId: string) => starredEmails.includes(emailId);

  // Archive functionality
  const archiveEmail = (emailId: string) => {
    setArchivedEmails((prev: string[]) => [...prev, emailId]);
  };

  const unarchiveEmail = (emailId: string) => {
    setArchivedEmails((prev: string[]) => prev.filter((id) => id !== emailId));
  };

  const isEmailArchived = (emailId: string) => archivedEmails.includes(emailId);

  // Delete functionality
  const deleteEmail = (emailId: string) => {
    setDeletedEmails((prev: string[]) => [...prev, emailId]);
  };

  const restoreEmail = (emailId: string) => {
    setDeletedEmails((prev: string[]) => prev.filter((id) => id !== emailId));
  };

  const permanentlyDeleteEmail = (emailId: string) => {
    setDeletedEmails((prev: string[]) => prev.filter((id) => id !== emailId));
    setStarredEmails((prev: string[]) => prev.filter((id) => id !== emailId));
    setArchivedEmails((prev: string[]) => prev.filter((id) => id !== emailId));
    setReadEmails((prev: string[]) => prev.filter((id) => id !== emailId));
  };

  const isEmailDeleted = (emailId: string) => deletedEmails.includes(emailId);

  // Read/Unread functionality
  const markAsRead = (emailId: string) => {
    setReadEmails((prev: string[]) => [
      ...prev.filter((id) => id !== emailId),
      emailId,
    ]);
  };

  const markAsUnread = (emailId: string) => {
    setReadEmails((prev: string[]) => prev.filter((id) => id !== emailId));
  };

  const isEmailRead = (emailId: string) => readEmails.includes(emailId);

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
        starredEmails,
        toggleStarEmail,
        isEmailStarred,
        archivedEmails,
        archiveEmail,
        unarchiveEmail,
        isEmailArchived,
        deletedEmails,
        deleteEmail,
        restoreEmail,
        permanentlyDeleteEmail,
        isEmailDeleted,
        readEmails,
        markAsRead,
        markAsUnread,
        isEmailRead,
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
