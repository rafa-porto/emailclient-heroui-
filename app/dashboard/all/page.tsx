"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { MailIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const AllPage = () => {
  const {
    setSelectedEmail,
    toggleStarEmail,
    archiveEmail,
    deleteEmail,
    markAsRead,
    newEmails,
    animatingEmails,
    isInboxOrganized,
  } = useEmailContext();

  // Show all emails including new ones
  const allEmailsData = [...newEmails, ...mockEmails];

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
    // Mark email as read when clicked
    markAsRead(email.id);
  };

  const handleStarEmail = (id: string) => {
    toggleStarEmail(id);
  };

  const handleArchiveEmail = (id: string) => {
    archiveEmail(id);
  };

  const handleDeleteEmail = (id: string) => {
    deleteEmail(id);
  };

  return (
    <EmailList
      emails={allEmailsData}
      title="All Mail"
      searchPlaceholder="Search all emails..."
      emptyIcon={<MailIcon className="mb-4" size={48} />}
      emptyTitle="No emails"
      emptyDescription="All emails will appear here"
      showComposeButton={true}
      showAiButton={true}
      showFilterButtons={false}
      isInboxOrganized={isInboxOrganized}
      onEmailClick={handleEmailClick}
      onStar={handleStarEmail}
      onArchive={handleArchiveEmail}
      onDelete={handleDeleteEmail}
      animatingEmails={animatingEmails}
    />
  );
};

export default AllPage;
