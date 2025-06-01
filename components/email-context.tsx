"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  // Spam email functionality
  spamEmails: string[];
  markAsSpam: (emailId: string) => void;
  markAsNotSpam: (emailId: string) => void;
  isEmailSpam: (emailId: string) => boolean;
  readEmails: string[];
  markAsRead: (emailId: string) => void;
  markAsUnread: (emailId: string) => void;
  isEmailRead: (emailId: string) => boolean;
  // New email functionality
  newEmails: EmailData[];
  addNewEmail: (email: EmailData) => void;
  animatingEmails: string[];
  removeAnimatingEmail: (emailId: string) => void;
  // Sent emails functionality
  sentEmails: EmailData[];
  addSentEmail: (email: EmailData) => void;
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

  const [spamEmails, setSpamEmails] = usePersistentState({
    key: "spamEmails",
    defaultValue: [] as string[],
  });

  const [readEmails, setReadEmails] = usePersistentState({
    key: "readEmails",
    defaultValue: [] as string[],
  });

  // New email functionality
  const [newEmails, setNewEmails] = useState<EmailData[]>([]);
  const [animatingEmails, setAnimatingEmails] = useState<string[]>([]);

  // Sent emails functionality
  const [sentEmails, setSentEmails] = usePersistentState({
    key: "sentEmails",
    defaultValue: [] as EmailData[],
  });

  // Track emails that have already been animated to prevent repeating animations
  const [animatedEmails, setAnimatedEmails] = usePersistentState({
    key: "animatedEmails",
    defaultValue: [] as string[],
  });

  // Add new email with animation
  const addNewEmail = (email: EmailData) => {
    setNewEmails((prev) => [email, ...prev]);

    // Only animate if this email hasn't been animated before
    if (!animatedEmails.includes(email.id)) {
      setAnimatingEmails((prev) => [...prev, email.id]);
      setAnimatedEmails((prev) => [...prev, email.id]);

      // Remove animation after 3 seconds
      setTimeout(() => {
        setAnimatingEmails((prev) => prev.filter((id) => id !== email.id));
      }, 3000);
    }
  };

  const removeAnimatingEmail = (emailId: string) => {
    setAnimatingEmails((prev) => prev.filter((id) => id !== emailId));
  };

  // Add sent email functionality
  const addSentEmail = (email: EmailData) => {
    setSentEmails((prev) => [email, ...prev]);
  };

  // Auto-add new email after 5 seconds on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const emailId = `new-${Date.now()}`;

      // Only add and animate if this email hasn't been created before
      // (This prevents animation on every page refresh)
      if (!animatedEmails.some((id) => id.startsWith("new-"))) {
        const newEmail: EmailData = {
          id: emailId,
          sender: "GitHub",
          avatarUrl: "/github.svg",
          subject: "🎉 Your pull request has been merged!",
          snippet:
            "Congratulations! Your contribution to the project has been successfully merged...",
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">🎉 Pull Request Merged Successfully!</h2>
              <p>Hi there,</p>
              <p>Great news! Your pull request <strong>#1234 - Add new email notification feature</strong> has been successfully merged into the main branch.</p>
              <p>Your contribution helps make our project better. Thank you for your hard work!</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
              <p><strong>Changed files:</strong></p>
              <ul>
                <li>components/email-context.tsx</li>
                <li>app/dashboard/all/page.tsx</li>
              </ul>
              <p>Best regards,<br>The GitHub Team</p>
            </div>
          `,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          read: false,
          isBrand: true,
          isAIGenerated: false,
          isImportant: true,
        };

        addNewEmail(newEmail);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [animatedEmails]);

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

  // Spam functionality
  const markAsSpam = (emailId: string) => {
    setSpamEmails((prev: string[]) => [...prev, emailId]);
  };

  const markAsNotSpam = (emailId: string) => {
    setSpamEmails((prev: string[]) => prev.filter((id) => id !== emailId));
  };

  const isEmailSpam = (emailId: string) => spamEmails.includes(emailId);

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
        spamEmails,
        markAsSpam,
        markAsNotSpam,
        isEmailSpam,
        readEmails,
        markAsRead,
        markAsUnread,
        isEmailRead,
        newEmails,
        addNewEmail,
        animatingEmails,
        removeAnimatingEmail,
        sentEmails,
        addSentEmail,
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
