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
  // Email summaries functionality
  emailSummaries: Record<string, string>;
  generateEmailSummary: (emailId: string, content: string) => Promise<string>;
  getEmailSummary: (emailId: string) => string | null;
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

  const [emailSummaries, setEmailSummaries] = usePersistentState({
    key: "emailSummaries",
    defaultValue: {} as Record<string, string>,
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

  // Email summaries functionality
  const generateEmailSummary = async (
    emailId: string,
    content: string
  ): Promise<string> => {
    // Check if summary already exists
    if (emailSummaries[emailId]) {
      return emailSummaries[emailId];
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a smart summary based on content
    const summary = generateSmartSummary(content);

    // Store the summary
    setEmailSummaries((prev) => ({
      ...prev,
      [emailId]: summary,
    }));

    return summary;
  };

  const getEmailSummary = (emailId: string): string | null => {
    return emailSummaries[emailId] || null;
  };

  // Helper function to generate smart summaries
  const generateSmartSummary = (content: string): string => {
    // Remove HTML tags
    const cleanContent = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Extract key information patterns
    const patterns = {
      meeting: /(?:meeting|call|appointment|schedule|discuss)/i,
      deadline: /(?:deadline|due|urgent|asap|immediately)/i,
      action: /(?:please|need|require|request|action|complete)/i,
      offer: /(?:offer|opportunity|position|job|interview)/i,
      payment: /(?:payment|invoice|bill|receipt|charge)/i,
      security: /(?:security|verify|sign-in|password|account)/i,
      shipping: /(?:order|ship|delivery|tracking|package)/i,
      collaboration: /(?:project|team|collaboration|workspace)/i,
    };

    let summary = "";

    // Determine email type and generate appropriate summary
    if (patterns.offer.test(cleanContent)) {
      summary = "📋 Job/Business Opportunity: ";
      if (cleanContent.toLowerCase().includes("interview")) {
        summary += "Interview invitation or job opportunity discussion.";
      } else if (cleanContent.toLowerCase().includes("offer")) {
        summary += "Job offer or business proposal with compensation details.";
      } else {
        summary += "Professional opportunity requiring review and response.";
      }
    } else if (patterns.meeting.test(cleanContent)) {
      summary = "📅 Meeting/Appointment: ";
      if (patterns.deadline.test(cleanContent)) {
        summary += "Urgent meeting request requiring immediate response.";
      } else {
        summary += "Meeting invitation or scheduling request.";
      }
    } else if (patterns.payment.test(cleanContent)) {
      summary = "💳 Financial: ";
      if (cleanContent.toLowerCase().includes("receipt")) {
        summary += "Payment confirmation or receipt notification.";
      } else if (cleanContent.toLowerCase().includes("invoice")) {
        summary += "Invoice or billing statement requiring attention.";
      } else {
        summary += "Payment-related communication.";
      }
    } else if (patterns.security.test(cleanContent)) {
      summary = "🔒 Security: ";
      if (cleanContent.toLowerCase().includes("verify")) {
        summary += "Account verification or security confirmation required.";
      } else {
        summary += "Security notification or account-related alert.";
      }
    } else if (patterns.shipping.test(cleanContent)) {
      summary = "📦 Order/Shipping: ";
      if (cleanContent.toLowerCase().includes("tracking")) {
        summary += "Package tracking information and delivery updates.";
      } else {
        summary += "Order confirmation or shipping notification.";
      }
    } else if (patterns.collaboration.test(cleanContent)) {
      summary = "🤝 Collaboration: ";
      summary += "Team project or collaboration invitation.";
    } else if (
      patterns.action.test(cleanContent) ||
      patterns.deadline.test(cleanContent)
    ) {
      summary = "⚡ Action Required: ";
      if (patterns.deadline.test(cleanContent)) {
        summary += "Urgent action needed with time-sensitive deadline.";
      } else {
        summary += "Response or action requested from recipient.";
      }
    } else {
      summary = "📧 General: ";
      // Extract first meaningful sentence
      const sentences = cleanContent
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 10);
      if (sentences.length > 0) {
        const firstSentence = sentences[0].trim();
        summary +=
          firstSentence.length > 80
            ? firstSentence.substring(0, 80) + "..."
            : firstSentence + ".";
      } else {
        summary += "General communication requiring review.";
      }
    }

    return summary;
  };

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
        emailSummaries,
        generateEmailSummary,
        getEmailSummary,
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
