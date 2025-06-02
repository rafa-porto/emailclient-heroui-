"use client";

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { AlertOctagonIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import { spamEmails } from "@/data/spamEmails";
import EmailList from "@/components/email-list";

const SpamPage = () => {
  const {
    setSelectedEmail,
    markAsNotSpam,
    permanentlyDeleteEmail,
    markAsRead,
    spamEmails: markedSpamEmails,
    isEmailDeleted,
    isEmailArchived,
    isInboxOrganized,
  } = useEmailContext();

  // Combine spam emails with any emails marked as spam from regular emails
  const allEmails = [...mockEmails, ...spamEmails];
  const spamEmailsData = allEmails.filter(
    (email) =>
      (spamEmails.some((spamEmail) => spamEmail.id === email.id) ||
        markedSpamEmails.includes(email.id)) &&
      !isEmailDeleted(email.id) &&
      !isEmailArchived(email.id)
  );

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
    // Mark email as read when clicked
    markAsRead(email.id);
  };

  const handleNotSpam = (id: string) => {
    markAsNotSpam(id);
  };

  const handleDeleteForever = (id: string) => {
    permanentlyDeleteEmail(id);
  };

  return (
    <Suspense fallback={null}>
      <EmailList
        emails={spamEmailsData}
        title="Spam"
        searchPlaceholder="Search spam emails..."
        emptyIcon={<AlertOctagonIcon className="mb-4" size={48} />}
        emptyTitle="No spam emails"
        emptyDescription="Spam emails will appear here"
        showComposeButton={false}
        showAiButton={false}
        showFilterButtons={false}
        isInboxOrganized={isInboxOrganized}
        isSpamPage={true}
        onEmailClick={handleEmailClick}
        onNotSpam={handleNotSpam}
        onDelete={handleDeleteForever}
      />
    </Suspense>
  );
};

export default SpamPage;
