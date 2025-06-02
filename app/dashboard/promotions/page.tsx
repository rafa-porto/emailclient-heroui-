"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { TagIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const PromotionsPage = () => {
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

  // Get promotion emails that are not archived or deleted
  const allEmails = [...newEmails, ...mockEmails].filter(
    (email) => !isEmailArchived(email.id) && !isEmailDeleted(email.id)
  );

  const promotionEmails = getEmailsByCategory("promotions", allEmails);

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
      emails={promotionEmails}
      title="Promotions"
      searchPlaceholder="Search promotions..."
      emptyIcon={<TagIcon className="mb-4" size={48} />}
      emptyTitle="No promotions"
      emptyDescription="Offers and promotions will appear here"
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

export default PromotionsPage;
