"use client";

import React from "react";

import EmailList from "@/components/email-list";
import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";

export default function SentPage() {
  const { sentEmails, setSelectedEmail } = useEmailContext();

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
  };

  return (
    <div className="h-full w-full">
      <EmailList
        emails={sentEmails}
        title="Sent"
        emptyTitle="No sent emails"
        emptyDescription="No sent emails yet. Compose and send your first email!"
        emptyIcon="📤"
        onEmailClick={handleEmailClick}
        showFilterButtons={false}
      />
    </div>
  );
}
