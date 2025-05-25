"use client";

import React from "react";

import EmailView from "@/components/email-view";
import { EmailData } from "@/types";

interface EmailPanelProps {
  selectedEmail: EmailData | null;
  isAiPanelOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  className?: string;
}

const EmailPanel: React.FC<EmailPanelProps> = ({
  selectedEmail,
  isAiPanelOpen,
  onClose,
  isLoading = false,
  className = "",
}) => {
  if (!selectedEmail) {
    return null;
  }

  return (
    <div
      className={`${
        isAiPanelOpen ? "w-1/3" : "w-1/2"
      } transition-all duration-300 border-l border-gray-200 dark:border-neutral-800 rounded-xl ${className}`}
    >
      <div className="h-full flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : (
          <EmailView email={selectedEmail} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default EmailPanel;
