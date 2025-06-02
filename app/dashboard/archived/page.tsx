"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { ArchiveIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const ArchivedPage = () => {
  const {
    setSelectedEmail,
    archivedEmails,
    unarchiveEmail,
    deleteEmail,
    markAsRead,
    toggleStarEmail,
    newEmails,
    isInboxOrganized,
  } = useEmailContext();

  // Filter archived emails from both mockEmails and newEmails
  const allEmails = [...newEmails, ...mockEmails];
  const archivedEmailsData = allEmails.filter((email) =>
    archivedEmails.includes(email.id)
  );

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
    // Mark email as read when clicked
    markAsRead(email.id);
  };

  const handleUnarchiveEmail = (id: string) => {
    unarchiveEmail(id);
  };

  const handleDeleteEmail = (id: string) => {
    deleteEmail(id);
  };

  const handleStarEmail = (id: string) => {
    toggleStarEmail(id);
  };

  return (
    <EmailList
      emails={archivedEmailsData}
      title="Archive"
      searchPlaceholder="Search archived emails..."
      emptyIcon={<ArchiveIcon className="mb-4" size={48} />}
      emptyTitle="No archived emails"
      emptyDescription="Archived emails will appear here"
      showComposeButton={true}
      showAiButton={true}
      showFilterButtons={false}
      isInboxOrganized={isInboxOrganized}
      onEmailClick={handleEmailClick}
      onStar={handleStarEmail}
      onUnarchive={handleUnarchiveEmail}
      onDelete={handleDeleteEmail}
    />
  );
};

export default ArchivedPage;
