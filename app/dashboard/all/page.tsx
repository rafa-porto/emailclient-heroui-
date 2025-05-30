"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import Image from "next/image";
import {
  SearchIcon,
  Edit3Icon,
  ChevronDownIcon,
  MailIcon,
  ArchiveIcon,
  Trash2Icon,
  StarIcon,
  MoreVerticalIcon,
  PaperclipIcon,
  SparklesIcon,
} from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";

const AllPage = () => {
  const {
    setSelectedEmail,
    archivedEmails,
    deletedEmails,
    archiveEmail,
    deleteEmail,
    isEmailRead,
    isEmailStarred,
    toggleStarEmail,
  } = useEmailContext();

  // Show all emails regardless of status
  const allEmailsData = mockEmails;

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
  };

  const handleArchiveEmail = (id: string) => {
    archiveEmail(id);
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
            All Mail
          </Button>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <Input
            classNames={{
              inputWrapper: "bg-gray-100 dark:bg-neutral-800",
            }}
            placeholder="Search all emails..."
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
        {allEmailsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-neutral-400">
            <MailIcon className="mb-4" size={48} />
            <h3 className="text-lg font-medium mb-2">No emails</h3>
            <p className="text-sm">All emails will appear here</p>
          </div>
        ) : (
          allEmailsData.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              isArchived={archivedEmails.includes(email.id)}
              isDeleted={deletedEmails.includes(email.id)}
              isRead={isEmailRead(email.id)}
              isStarred={isEmailStarred(email.id)}
              onArchive={handleArchiveEmail}
              onClick={handleEmailClick}
              onDelete={handleDeleteEmail}
              onStar={handleToggleStarEmail}
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
  isArchived: boolean;
  isDeleted: boolean;
  onClick: (email: EmailData) => void;
  onStar: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmailItem: React.FC<EmailItemProps> = ({
  email,
  isRead,
  isStarred,
  isArchived,
  isDeleted,
  onClick,
  onStar,
  onArchive,
  onDelete,
}) => {
  const [showActionPopup, setShowActionPopup] = React.useState(false);

  const getStatusIcon = () => {
    if (isDeleted) return <Trash2Icon className="text-red-500" size={14} />;
    if (isArchived) return <ArchiveIcon className="text-gray-500" size={14} />;
    if (isStarred)
      return <StarIcon className="text-yellow-500 fill-yellow-500" size={14} />;

    return null;
  };

  const getEmailOpacity = () => {
    if (isDeleted) return "opacity-50";
    if (isArchived) return "opacity-75";

    return "";
  };

  return (
    <div
      className={`group relative flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/80 cursor-pointer ${
        !isRead
          ? "bg-gray-100 dark:bg-neutral-800"
          : "bg-white dark:bg-neutral-900"
      } ${getEmailOpacity()}`}
      onClick={() => !isDeleted && onClick(email)}
    >
      {email.isBrand ? (
        <div className="mr-3 flex-shrink-0 w-9 h-9 flex items-center justify-center">
          <Image
            alt={email.sender}
            className={`w-full h-full object-contain ${
              // Apply theme-aware filters for black/white icons
              email.avatarUrl.includes("github.svg")
                ? "dark:invert dark:brightness-0 dark:contrast-100"
                : email.avatarUrl.includes("apple.svg")
                  ? "brightness-0 dark:brightness-100 dark:invert-0"
                  : email.avatarUrl.includes("uber.svg")
                    ? "dark:invert dark:brightness-0 dark:contrast-100"
                    : email.avatarUrl.includes("aws.svg")
                      ? "dark:invert dark:brightness-0 dark:contrast-100"
                      : ""
            }`}
            height={36}
            src={email.avatarUrl}
            width={36}
          />
        </div>
      ) : (
        <Avatar
          className="mr-3 flex-shrink-0"
          classNames={{
            base: "bg-transparent",
          }}
          name={email.sender}
          size="md"
          src={email.avatarUrl}
        />
      )}

      <div className="flex-grow truncate">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${
                !isRead
                  ? "text-black dark:text-white"
                  : "text-gray-700 dark:text-neutral-400"
              }`}
            >
              {email.sender}
            </span>
            {isStarred && (
              <StarIcon className="text-yellow-500 fill-yellow-500" size={14} />
            )}
            {email.isAIGenerated && !email.isImportant && (
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium">
                <SparklesIcon size={8} />
                AI
              </div>
            )}
            {getStatusIcon()}
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
            {!isDeleted && (
              <div
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition-opacity cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActionPopup(!showActionPopup);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowActionPopup(!showActionPopup);
                  }
                }}
              >
                <MoreVerticalIcon
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  size={16}
                />
              </div>
            )}
          </div>
        </div>
        <p
          className={`text-sm truncate ${
            !isRead
              ? "text-black dark:text-white font-semibold"
              : "text-gray-600 dark:text-neutral-500"
          }`}
        >
          {email.subject}
        </p>
        <p className="text-xs text-gray-500 dark:text-neutral-600 truncate">
          {email.snippet}
        </p>
      </div>

      {/* Action Popup */}
      {showActionPopup && !isDeleted && (
        <div className="absolute right-2 top-12 z-50 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg p-1 min-w-[140px]">
          <div
            className={`flex items-center gap-2 w-full p-2 text-sm hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded cursor-pointer ${
              isStarred
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onStar(email.id);
              setShowActionPopup(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onStar(email.id);
                setShowActionPopup(false);
              }
            }}
          >
            <StarIcon className={isStarred ? "fill-current" : ""} size={16} />
            {isStarred ? "Unstar" : "Star"}
          </div>
          {!isArchived && (
            <div
              className="flex items-center gap-2 w-full p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 rounded cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onArchive(email.id);
                setShowActionPopup(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onArchive(email.id);
                  setShowActionPopup(false);
                }
              }}
            >
              <ArchiveIcon size={16} />
              Archive
            </div>
          )}
          <div
            className="flex items-center gap-2 w-full p-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(email.id);
              setShowActionPopup(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onDelete(email.id);
                setShowActionPopup(false);
              }
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

export default AllPage;
