"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  SearchIcon,
  Edit3Icon,
  ChevronDownIcon,
  ArchiveIcon,
  Trash2Icon,
  StarIcon,
  MoreVerticalIcon,
  PaperclipIcon,
} from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";

const ArchivedPage = () => {
  const {
    setSelectedEmail,
    archivedEmails,
    unarchiveEmail,
    deleteEmail,
    isEmailRead,
    isEmailStarred,
    toggleStarEmail,
  } = useEmailContext();

  // Filter archived emails
  const archivedEmailsData = mockEmails.filter((email) =>
    archivedEmails.includes(email.id),
  );

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
  };

  const handleUnarchiveEmail = (id: string) => {
    unarchiveEmail(id);
  };

  const handleDeleteEmail = (id: string) => {
    deleteEmail(id);
  };

  const handleToggleStarEmail = (id: string) => {
    toggleStarEmail(id);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950 text-black dark:text-white p-4">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between pt-2 pb-2 px-4 mb-4 backdrop-blur-sm bg-white/90 dark:bg-neutral-950/90 rounded-lg">
        <div className="flex items-center space-x-2">
          <Button
            className="dark:text-neutral-200 bg-gray-100 dark:bg-neutral-800/60 hover:dark:bg-neutral-800 transition-colors"
            endContent={<ChevronDownIcon size={16} />}
            size="sm"
            variant="light"
          >
            Archive
          </Button>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <Input
            classNames={{
              inputWrapper: "bg-gray-100 dark:bg-neutral-800",
            }}
            placeholder="Search archived emails..."
            size="sm"
            startContent={<SearchIcon size={16} />}
            variant="flat"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="dark:text-neutral-200"
            size="sm"
            startContent={<Edit3Icon size={16} />}
            variant="light"
          >
            Compose
          </Button>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {archivedEmailsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-neutral-400">
            <ArchiveIcon className="mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">No archived emails</h3>
            <p className="text-sm">Archived emails will appear here</p>
          </div>
        ) : (
          archivedEmailsData.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              isRead={isEmailRead(email.id)}
              isStarred={isEmailStarred(email.id)}
              onClick={handleEmailClick}
              onDelete={handleDeleteEmail}
              onStar={handleToggleStarEmail}
              onUnarchive={handleUnarchiveEmail}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Email Item Component
interface EmailItemProps {
  email: EmailData;
  isRead: boolean;
  isStarred: boolean;
  onClick: (email: EmailData) => void;
  onUnarchive: (id: string) => void;
  onDelete: (id: string) => void;
  onStar: (id: string) => void;
}

const EmailItem: React.FC<EmailItemProps> = ({
  email,
  isRead,
  isStarred,
  onClick,
  onUnarchive,
  onDelete,
  onStar,
}) => {
  const [showActionPopup, setShowActionPopup] = React.useState(false);

  return (
    <div
      className={`group relative flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/80 cursor-pointer ${
        !isRead
          ? "bg-gray-100 dark:bg-neutral-800"
          : "bg-white dark:bg-neutral-900"
      }`}
      onClick={() => onClick(email)}
    >
      <div className="mr-3 flex-shrink-0">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {email.sender.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="flex-grow truncate">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-neutral-100">
              {email.sender}
            </span>
            <ArchiveIcon className="text-gray-500" size={14} />
          </div>
          <div className="flex items-center gap-2">
            {email.attachments && email.attachments.length > 0 && (
              <PaperclipIcon
                className="text-gray-400 dark:text-neutral-500"
                size={12}
              />
            )}
            <span className="text-xs text-gray-500 dark:text-neutral-500">
              {email.timestamp}
            </span>
            <div
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition-opacity cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowActionPopup(!showActionPopup);
              }}
            >
              <MoreVerticalIcon
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                size={16}
              />
            </div>
          </div>
        </div>
        <p className="text-sm font-medium truncate text-gray-900 dark:text-neutral-100">
          {email.subject}
        </p>
        <p className="text-xs text-gray-600 dark:text-neutral-400 truncate">
          {email.snippet}
        </p>
      </div>

      {/* Action Popup */}
      {showActionPopup && (
        <div className="absolute right-2 top-12 z-50 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg p-1 min-w-[140px]">
          <div
            className="flex items-center gap-2 w-full p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onUnarchive(email.id);
              setShowActionPopup(false);
            }}
          >
            <ArchiveIcon size={16} />
            Unarchive
          </div>
          <div
            className={`flex items-center gap-2 w-full p-2 text-sm hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded cursor-pointer ${
              isStarred
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onStar(email.id);
              setShowActionPopup(false);
            }}
          >
            <StarIcon className={isStarred ? "fill-current" : ""} size={16} />
            {isStarred ? "Unstar" : "Star"}
          </div>
          <div
            className="flex items-center gap-2 w-full p-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(email.id);
              setShowActionPopup(false);
            }}
          >
            <Trash2Icon size={16} />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivedPage;
