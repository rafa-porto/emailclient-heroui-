"use client";

import React from "react";

import EmailView from "@/components/email-view";
import { EmailData } from "@/types";

interface EmailPanelProps {
  selectedEmail: EmailData | null;
  onClose: () => void;
  isLoading?: boolean;
  className?: string;
}

const EmailPanel: React.FC<EmailPanelProps> = ({
  selectedEmail,
  onClose,
  isLoading = false,
  className = "",
}) => {
  if (!selectedEmail) {
    return null;
  }

  return (
    <div className={`h-full transition-all duration-300 ${className}`}>
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
