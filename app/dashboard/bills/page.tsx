"use client";

import React from "react";
import { CreditCardIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const BillsPage = () => {
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
    getEmailsByCategory,
    isInboxOrganized,
  } = useEmailContext();

  // Get bills emails that are not archived or deleted
  const allEmails = [...newEmails, ...mockEmails].filter(
    (email) => !isEmailArchived(email.id) && !isEmailDeleted(email.id)
  );

  const billsEmails = getEmailsByCategory("bills", allEmails);

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
      emails={billsEmails}
      title="Bills"
      searchPlaceholder="Search bills and invoices..."
      emptyIcon={<CreditCardIcon className="mb-4" size={48} />}
      emptyTitle="No bills"
      emptyDescription="Bills and invoices will appear here"
      showComposeButton={true}
      showAiButton={true}
      showFilterButtons={false}
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

export default BillsPage;
