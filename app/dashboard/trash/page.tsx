"use client";

import React from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@heroui/button";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";
import EmailList from "@/components/email-list";

const TrashPage = () => {
  const {
    setSelectedEmail,
    deletedEmails,
    restoreEmail,
    permanentlyDeleteEmail,
    markAsRead,
    newEmails,
  } = useEmailContext();

  // Filter deleted emails from both mockEmails and newEmails
  const allEmails = [...newEmails, ...mockEmails];
  const deletedEmailsData = allEmails.filter((email) =>
    deletedEmails.includes(email.id)
  );

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
    // Mark email as read when clicked
    markAsRead(email.id);
  };

  const handleRestoreEmail = (id: string) => {
    restoreEmail(id);
  };

  const handlePermanentlyDeleteEmail = (id: string) => {
    permanentlyDeleteEmail(id);
  };

  const handleEmptyTrash = () => {
    deletedEmails.forEach((id) => {
      permanentlyDeleteEmail(id);
    });
  };

  return (
    <EmailList
      emails={deletedEmailsData}
      title="Trash"
      searchPlaceholder="Search trash..."
      emptyIcon={<Trash2Icon className="mb-4" size={48} />}
      emptyTitle="Trash is empty"
      emptyDescription="Deleted emails will appear here"
      showComposeButton={true}
      showAiButton={true}
      showFilterButtons={false}
      additionalHeaderButtons={
        deletedEmailsData.length > 0 && (
          <Button
            className="text-red-600 dark:text-red-400"
            size="sm"
            variant="light"
            onPress={handleEmptyTrash}
          >
            Empty Trash
          </Button>
        )
      }
      onEmailClick={handleEmailClick}
      onRestore={handleRestoreEmail}
      onPermanentDelete={handlePermanentlyDeleteEmail}
    />
  );
};

export default TrashPage;
