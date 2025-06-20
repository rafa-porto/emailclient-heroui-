"use client";

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { StarIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const StarredPage = () => {
  const {
    setSelectedEmail,
    starredEmails,
    deletedEmails,
    archivedEmails,
    toggleStarEmail,
    archiveEmail,
    deleteEmail,
    markAsRead,
    newEmails,
    isInboxOrganized,
  } = useEmailContext();

  // Filter starred emails that are not deleted or archived from both mockEmails and newEmails
  const allEmails = [...newEmails, ...mockEmails];
  const starredEmailsData = allEmails.filter(
    (email) =>
      starredEmails.includes(email.id) &&
      !deletedEmails.includes(email.id) &&
      !archivedEmails.includes(email.id)
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
    <Suspense fallback={null}>
      <EmailList
        emails={starredEmailsData}
        title="Starred"
        searchPlaceholder="Search starred emails..."
        emptyIcon={<StarIcon className="mb-4" size={48} />}
        emptyTitle="No starred emails"
        emptyDescription="Star emails to see them here"
        showComposeButton={true}
        showAiButton={true}
        showFilterButtons={false}
        isInboxOrganized={isInboxOrganized}
        onEmailClick={handleEmailClick}
        onStar={handleStarEmail}
        onArchive={handleArchiveEmail}
        onDelete={handleDeleteEmail}
      />
    </Suspense>
  );
};

export default StarredPage;
