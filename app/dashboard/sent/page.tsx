"use client";

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";

import EmailList from "@/components/email-list";
import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";

export default function SentPage() {
  const { sentEmails, setSelectedEmail, isInboxOrganized } = useEmailContext();

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
  };

  return (
    <Suspense fallback={null}>
      <div className="h-full w-full">
        <EmailList
          emails={sentEmails}
          title="Sent"
          emptyTitle="No sent emails"
          emptyDescription="No sent emails yet. Compose and send your first email!"
          emptyIcon="📤"
          isInboxOrganized={isInboxOrganized}
          onEmailClick={handleEmailClick}
          showFilterButtons={false}
        />
      </div>
    </Suspense>
  );
}
