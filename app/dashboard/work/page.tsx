"use client";

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { BriefcaseIcon } from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const WorkPage = () => {
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

  // Get work emails that are not archived or deleted
  const allEmails = [...newEmails, ...mockEmails].filter(
    (email) => !isEmailArchived(email.id) && !isEmailDeleted(email.id)
  );

  const workEmails = getEmailsByCategory("work", allEmails);

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
    <Suspense fallback={null}>
      <EmailList
        emails={workEmails}
        title="Work"
        searchPlaceholder="Search work emails..."
        emptyIcon={<BriefcaseIcon className="mb-4" size={48} />}
        emptyTitle="No work emails"
        emptyDescription="Work-related emails will appear here"
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
    </Suspense>
  );
};

export default WorkPage;
