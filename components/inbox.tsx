"use client";

import React, { useState, useEffect, useRef } from "react";
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
  MoreVerticalIcon,
  SparklesIcon,
  PaperclipIcon,
} from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { AIIcon } from "@/components/icons";
import { EmailData } from "@/types";
import { mockEmails } from "@/data/mockEmails";

interface EmailItemProps extends EmailData {
  onClick: (email: EmailData) => void;
  onStar?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
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
  isAnimating,
}) => {
  const [showActionPopup, setShowActionPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { isEmailStarred, isEmailRead } = useEmailContext();

  // Use context state to determine read status
  const isReadFromContext = isEmailRead(id);
  const isStarredFromContext = isEmailStarred(id);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowActionPopup(false);
      }
    };

    if (showActionPopup) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showActionPopup]);

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

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setShowActionPopup(false);
  };

  return (
    <div
      aria-label={`Email from ${sender}: ${subject}`}
      className={`group relative flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/80 cursor-pointer transition-all duration-300 ${
        !isReadFromContext
          ? "bg-gray-100 dark:bg-neutral-800"
          : "bg-white dark:bg-neutral-900"
      } ${
        isAnimating
          ? "animate-pulse bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-lg transform scale-[1.02]"
          : ""
      }`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {isBrand ? (
        <div className="mr-3 flex-shrink-0 w-9 h-9 flex items-center justify-center">
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
          className="mr-3 flex-shrink-0"
          classNames={{
            base: "bg-transparent",
          }}
          name={sender}
          size="md"
          src={avatarUrl}
        />
      )}
      <div className="flex-grow truncate">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${!isReadFromContext ? "text-black dark:text-white" : "text-gray-700 dark:text-neutral-400"}`}
            >
              {sender}
            </span>
            {isStarredFromContext && (
              <StarIcon className="text-yellow-500 fill-yellow-500" size={14} />
            )}
            {isAIGenerated && !isImportant && (
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium">
                <SparklesIcon size={8} />
                AI
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {attachments && attachments.length > 0 && (
              <PaperclipIcon
                className="text-gray-400 dark:text-neutral-500"
                size={12}
              />
            )}
            <span className="text-xs text-gray-500 dark:text-neutral-500">
              {timestamp}
            </span>
            {/* Action Button */}
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
          </div>
        </div>
        <p
          className={`text-sm truncate ${!isReadFromContext ? "text-black dark:text-white font-semibold" : "text-gray-600 dark:text-neutral-500"}`}
        >
          {subject}
        </p>
        <p className="text-xs text-gray-500 dark:text-neutral-600 truncate">
          {snippet}
        </p>
      </div>

      {/* Action Popup */}
      {showActionPopup && (
        <div
          ref={popupRef}
          className="absolute right-2 top-12 z-50 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg p-1 min-w-[120px]"
        >
          <div
            className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={(e) => handleActionClick(e, () => onStar?.(id))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleActionClick(e as any, () => onStar?.(id));
              }
            }}
          >
            <StarIcon
              className={`${isStarredFromContext ? "text-yellow-500 fill-yellow-500" : ""}`}
              size={16}
            />
            {isStarredFromContext ? "Unstar" : "Star"}
          </div>
          <div
            className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={(e) => handleActionClick(e, () => onArchive?.(id))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleActionClick(e as any, () => onArchive?.(id));
              }
            }}
          >
            <ArchiveIcon size={16} />
            Archive
          </div>
          <div
            className="flex items-center gap-2 w-full p-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={(e) => handleActionClick(e, () => onDelete?.(id))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleActionClick(e as any, () => onDelete?.(id));
              }
            }}
          >
            <TrashIcon size={16} />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

const Inbox = () => {
  const {
    setSelectedEmail,
    isAiPanelOpen,
    setIsAiPanelOpen,
    setIsComposeModalOpen,
    toggleStarEmail,
    archiveEmail,
    deleteEmail,
    markAsRead,
    isEmailArchived,
    isEmailDeleted,
    newEmails,
    animatingEmails,
    removeAnimatingEmail,
  } = useEmailContext();

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

  // Filter emails based on their state and include new emails
  const allEmailsData = [...newEmails, ...mockEmails];
  const visibleEmails = allEmailsData.filter(
    (email) => !isEmailDeleted(email.id) && !isEmailArchived(email.id)
  );

  // Add useEffect to handle animation cleanup
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
            All Mail
          </Button>
          <Button
            className="dark:text-neutral-200 bg-gray-100 dark:bg-neutral-800/60 hover:dark:bg-neutral-800 transition-colors"
            endContent={<ChevronDownIcon size={16} />}
            size="sm"
            variant="light"
          >
            Filter
          </Button>
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
              placeholder="Search..."
              radius="lg"
              startContent={<SearchIcon className="text-gray-400" size={20} />}
              type="search"
              variant="flat"
            />
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Email List - Full width */}
      <div className="flex-1 overflow-hidden px-2">
        <div className="h-full overflow-y-auto px-2">
          {visibleEmails.map((email) => (
            <EmailItem
              key={email.id}
              {...email}
              isAnimating={animatingEmails.includes(email.id)}
              onArchive={handleArchiveEmail}
              onClick={handleEmailClick}
              onDelete={handleDeleteEmail}
              onStar={handleStarEmail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
