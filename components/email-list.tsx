"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import Image from "next/image";
import {
  SearchIcon,
  Edit3Icon,
  ChevronDownIcon,
  StarIcon,
  ArchiveIcon,
  TrashIcon,
  PaperclipIcon,
} from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { AIIcon } from "@/components/icons";
import { EmailData } from "@/types";

interface EmailItemProps extends EmailData {
  onClick: (email: EmailData) => void;
  onStar?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
  isAnimating?: boolean;
}

const EmailItem: React.FC<EmailItemProps> = ({
  id,
  sender,
  avatarUrl,
  subject,
  snippet,
  content,
  timestamp,
  read,
  isBrand,
  isAIGenerated,
  isImportant,
  attachments,
  onClick,
  onStar,
  onArchive,
  onDelete,
  onUnarchive,
  onRestore,
  onPermanentDelete,
  isAnimating,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPermanentDeleting, setIsPermanentDeleting] = useState(false);
  const { isEmailStarred, isEmailRead, isEmailArchived, isEmailDeleted } =
    useEmailContext();

  // Use context state to determine read status
  const isReadFromContext = isEmailRead(id);
  const isStarredFromContext = isEmailStarred(id);
  const isArchivedFromContext = isEmailArchived(id);
  const isDeletedFromContext = isEmailDeleted(id);

  const handleClick = () => {
    onClick({
      id,
      sender,
      avatarUrl,
      subject,
      snippet,
      content,
      timestamp,
      read,
      isBrand,
      isAIGenerated,
      isImportant,
      attachments,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    
    // Start delete animation
    setTimeout(() => {
      onDelete?.(id);
    }, 300); // Wait for animation to complete
  };

  const handlePermanentDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPermanentDeleting(true);
    
    // Start permanent delete animation (fade out and scale)
    setTimeout(() => {
      onPermanentDelete?.(id);
    }, 300); // Wait for animation to complete
  };

  const getOpacity = () => {
    if (isDeletedFromContext) return "opacity-50";
    if (isArchivedFromContext) return "opacity-75";

    return "";
  };

  const getAnimationClass = () => {
    if (isDeleting) return "animate-[slideOutRight_0.3s_ease-in-out_forwards]";
    if (isPermanentDeleting) return "animate-[fadeOutScale_0.3s_ease-in-out_forwards]";

    return "";
  };

  return (
    <div
      aria-label={`Email from ${sender}: ${subject}`}
      className={`group relative flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/80 cursor-pointer transition-all duration-300 ${
        !isReadFromContext
          ? "bg-gray-100 dark:bg-neutral-800"
          : "bg-white dark:bg-neutral-900"
      } ${getOpacity()} ${getAnimationClass()}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ping animation for new emails */}
      {isAnimating && (
        <div className="absolute -top-1 -left-1 w-4 h-4">
          <div className="absolute w-full h-full bg-blue-400 rounded-full animate-ping" />
          <div className="relative w-full h-full bg-blue-500 rounded-full" />
        </div>
      )}

      {/* Avatar */}
      <div className="mr-3 flex-shrink-0">
        {avatarUrl ? (
          isBrand ? (
            <div className="w-9 h-9 flex items-center justify-center">
              <Image
                alt={sender}
                className={`w-full h-full object-contain ${
                  // Apply theme-aware filters for black/white icons
                  avatarUrl.includes("github.svg")
                    ? "dark:invert dark:brightness-0 dark:contrast-100"
                    : avatarUrl.includes("apple.svg")
                      ? "brightness-0 dark:brightness-100 dark:invert-0"
                      : avatarUrl.includes("uber.svg")
                        ? "dark:invert dark:brightness-0 dark:contrast-100"
                        : avatarUrl.includes("aws.svg")
                          ? "dark:invert dark:brightness-0 dark:contrast-100"
                          : ""
                }`}
                height={36}
                src={avatarUrl}
                width={36}
              />
            </div>
          ) : (
            <Avatar
              className="ring-1 ring-gray-200 dark:ring-neutral-700"
              size="sm"
              src={avatarUrl}
            />
          )
        ) : (
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {sender.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Email Content */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span
              className={`font-medium truncate ${
                !isReadFromContext
                  ? "text-gray-900 dark:text-neutral-100"
                  : "text-gray-700 dark:text-neutral-300"
              }`}
            >
              {sender}
            </span>

            {/* Status indicators */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {isDeletedFromContext && (
                <TrashIcon className="text-red-500" size={12} />
              )}
              {isArchivedFromContext && (
                <ArchiveIcon className="text-gray-500" size={12} />
              )}
              {isStarredFromContext && (
                <StarIcon
                  className="text-yellow-500 fill-yellow-500"
                  size={12}
                />
              )}
              {isBrand && (
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  title="Brand"
                />
              )}
              {isImportant && (
                <div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  title="Important"
                />
              )}
              {attachments && attachments.length > 0 && (
                <div title={`${attachments.length} attachment(s)`}>
                  <PaperclipIcon
                    className="text-gray-400 dark:text-neutral-500"
                    size={12}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-xs text-gray-500 dark:text-neutral-400">
              {timestamp}
            </span>
          </div>
        </div>

        <div className="mb-1">
          <span
            className={`text-sm truncate block ${
              !isReadFromContext
                ? "font-medium text-gray-900 dark:text-neutral-100"
                : "text-gray-700 dark:text-neutral-300"
            }`}
          >
            {subject}
          </span>
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-400 truncate">
          {snippet}
        </div>
      </div>

      {/* Horizontal Action Popup on Hover */}
      {isHovered && (
        <div className="absolute right-3 -top-2 z-50 flex items-center gap-0.5 bg-white dark:bg-neutral-800 border border-gray-200/80 dark:border-neutral-700/80 rounded-xl px-1.5 py-1 shadow-xl backdrop-blur-sm transition-all duration-200 ease-in-out">
          {onStar && (
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${
                isStarredFromContext
                  ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 shadow-sm"
                  : "text-gray-600 dark:text-neutral-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onStar(id);
              }}
              title={isStarredFromContext ? "Unstar" : "Star"}
            >
              <StarIcon
                className={isStarredFromContext ? "fill-current" : ""}
                size={14}
              />
            </button>
          )}

          {onArchive && !isArchivedFromContext && (
            <button
              className="p-2 rounded-lg text-gray-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onArchive(id);
              }}
              title="Archive"
            >
              <ArchiveIcon size={14} />
            </button>
          )}

          {onUnarchive && isArchivedFromContext && (
            <button
              className="p-2 rounded-lg text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onUnarchive(id);
              }}
              title="Unarchive"
            >
              <ArchiveIcon size={14} />
            </button>
          )}

          {onRestore && isDeletedFromContext && (
            <button
              className="p-2 rounded-lg text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 shadow-sm transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onRestore(id);
              }}
              title="Restore"
            >
              <ArchiveIcon size={14} />
            </button>
          )}

          {onDelete && !isDeletedFromContext && (
            <button
              className="p-2 rounded-lg text-gray-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              onClick={handleDelete}
              title="Delete"
            >
              <TrashIcon size={14} />
            </button>
          )}

          {onPermanentDelete && isDeletedFromContext && (
            <button
              className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-sm transition-all duration-200"
              onClick={handlePermanentDelete}
              title="Delete Forever"
            >
              <TrashIcon size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface EmailListProps {
  emails: EmailData[];
  title: string;
  searchPlaceholder?: string;
  emptyIcon?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  showComposeButton?: boolean;
  showAiButton?: boolean;
  showFilterButtons?: boolean;
  additionalHeaderButtons?: React.ReactNode;
  onEmailClick: (email: EmailData) => void;
  onStar?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
  animatingEmails?: string[];
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  title,
  searchPlaceholder = "Search...",
  emptyIcon,
  emptyTitle = "No emails",
  emptyDescription = "No emails found",
  showComposeButton = true,
  showAiButton = true,
  showFilterButtons = true,
  additionalHeaderButtons,
  onEmailClick,
  onStar,
  onArchive,
  onDelete,
  onUnarchive,
  onRestore,
  onPermanentDelete,
  animatingEmails = [],
}) => {
  const {
    isAiPanelOpen,
    setIsAiPanelOpen,
    setIsComposeModalOpen,
    removeAnimatingEmail,
  } = useEmailContext();

  useEffect(() => {
    animatingEmails.forEach((emailId) => {
      const timer = setTimeout(() => {
        removeAnimatingEmail(emailId);
      }, 3000);

      return () => clearTimeout(timer);
    });
  }, [animatingEmails, removeAnimatingEmail]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950 text-black dark:text-white p-4">
      {/* Header - Fixed at the top */}
      <div className="sticky top-0 z-10 flex items-center justify-between pt-2 pb-2 px-4 mb-4 backdrop-blur-sm bg-white/90 dark:bg-neutral-950/90 rounded-lg">
        {/* Left buttons */}
        <div className="flex items-center space-x-2">
          <Button
            className="dark:text-neutral-200 bg-gray-100 dark:bg-neutral-800/60 hover:dark:bg-neutral-800 transition-colors"
            endContent={<ChevronDownIcon size={16} />}
            size="sm"
            variant="light"
          >
            {title}
          </Button>
          {showFilterButtons && (
            <Button
              className="dark:text-neutral-200 bg-gray-100 dark:bg-neutral-800/60 hover:dark:bg-neutral-800 transition-colors"
              endContent={<ChevronDownIcon size={16} />}
              size="sm"
              variant="light"
            >
              Filter
            </Button>
          )}
          {additionalHeaderButtons}
        </div>

        {/* Search input centered */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Input
              classNames={{
                base: "h-10",
                mainWrapper: "h-10",
                input: "pl-10 text-sm",
                inputWrapper:
                  "bg-gray-100 dark:bg-neutral-800/60 hover:bg-gray-200 dark:hover:bg-neutral-800/80 border-0 focus-within:border-1 focus-within:border-blue-500",
              }}
              placeholder={searchPlaceholder}
              radius="lg"
              startContent={<SearchIcon className="text-gray-400" size={20} />}
              type="search"
              variant="flat"
            />
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center space-x-2">
          {showComposeButton && (
            <Button
              className="bg-gray-100 dark:bg-neutral-800/60 text-black dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
              radius="lg"
              size="sm"
              startContent={<Edit3Icon size={16} />}
              variant="flat"
              onPress={() => setIsComposeModalOpen(true)}
            >
              Compose
            </Button>
          )}
          {showAiButton && (
            <Button
              isIconOnly
              className={`${
                isAiPanelOpen
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  : "bg-gray-100 dark:bg-neutral-800/60 text-black dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-800"
              } transition-colors`}
              radius="lg"
              size="sm"
              variant="flat"
              onPress={() => setIsAiPanelOpen(!isAiPanelOpen)}
            >
              <AIIcon size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Email List - Full width */}
      <div className="flex-1 overflow-hidden px-2">
        <div className="h-full overflow-y-auto px-2">
          {emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-neutral-400">
              {emptyIcon}
              <h3 className="text-lg font-medium mb-2">{emptyTitle}</h3>
              <p className="text-sm">{emptyDescription}</p>
            </div>
          ) : (
            emails.map((email) => (
              <EmailItem
                key={email.id}
                {...email}
                isAnimating={animatingEmails.includes(email.id)}
                onClick={onEmailClick}
                onStar={onStar}
                onArchive={onArchive}
                onDelete={onDelete}
                onUnarchive={onUnarchive}
                onRestore={onRestore}
                onPermanentDelete={onPermanentDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailList;
