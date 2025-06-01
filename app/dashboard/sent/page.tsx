"use client";

import React from "react";

import EmailList from "@/components/email-list";
import { useEmailContext } from "@/components/email-context";

export default function SentPage() {
  const { sentEmails } = useEmailContext();

  return (
    <div className="h-full w-full">
      <EmailList
        emails={sentEmails}
        title="Sent"
        emptyMessage="No sent emails yet. Compose and send your first email!"
        emptyIcon="📤"
      />
    </div>
  );
}
