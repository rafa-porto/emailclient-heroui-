"use client";

import React from "react";
import { InboxIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const Inbox = () => {
  const {
    setSelectedEmail,
    toggleStarEmail,
    archiveEmail,
    deleteEmail,
    markAsRead,
    isEmailArchived,
    isEmailDeleted,
    newEmails,
    animatingEmails,
  } = useEmailContext();

  // Filter emails that are not archived or deleted
  const visibleEmails = [...newEmails, ...mockEmails].filter(
    (email) => !isEmailArchived(email.id) && !isEmailDeleted(email.id)
  );

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
      emails={visibleEmails}
      title="All Mail"
      searchPlaceholder="Search..."
      emptyIcon={<InboxIcon className="mb-4" size={48} />}
      emptyTitle="No emails"
      emptyDescription="Your inbox is empty"
      showComposeButton={true}
      showAiButton={true}
      showFilterButtons={true}
      onEmailClick={handleEmailClick}
      onStar={handleStarEmail}
      onArchive={handleArchiveEmail}
      onDelete={handleDeleteEmail}
      animatingEmails={animatingEmails}
    />
  );
};

export default Inbox;
