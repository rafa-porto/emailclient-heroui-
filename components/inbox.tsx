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
    markAsSpam,
    isEmailArchived,
    isEmailDeleted,
    newEmails,
    animatingEmails,
    classifyEmailAutomatically,
    isInboxOrganized,
  } = useEmailContext();

  // Filter emails based on organization state
  const visibleEmails = [...newEmails, ...mockEmails]
    .filter((email) => !isEmailArchived(email.id) && !isEmailDeleted(email.id))
    .map(classifyEmailAutomatically)
    .filter((email) => {
      // If inbox is organized, only show uncategorized emails or emails without specific categories
      if (isInboxOrganized) {
        return !email.category || email.category === "general";
      }
      // If inbox is not organized, show all emails (default behavior)
      return true;
    });

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

  const handleMarkAsSpam = (id: string) => {
    markAsSpam(id);
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
      isInboxOrganized={isInboxOrganized}
      onEmailClick={handleEmailClick}
      onStar={handleStarEmail}
      onArchive={handleArchiveEmail}
      onDelete={handleDeleteEmail}
      onMarkAsSpam={handleMarkAsSpam}
      animatingEmails={animatingEmails}
    />
  );
};

export default Inbox;
