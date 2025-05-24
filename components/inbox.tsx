"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { SearchIcon, Edit3Icon, ChevronDownIcon, BotIcon } from "lucide-react";

import EmailView from "@/components/email-view";
import AiPanel from "@/components/ai-panel";

// Mock data for emails - we'll refine this later
const mockEmails = [
  {
    id: "1",
    sender: "Emma Rooney",
    avatarUrl: "https://i.pravatar.cc/150?u=emma.rooney",
    subject:
      "Appointment booked: Call Emma <> Emilie Lemaire @ Fri Apr 25, 2025 12:30pm - 1pm (GMT-7)",
    snippet: "Hi Emilie, how are you?...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>It was lovely to meet you. I have great news to share! The team absolutely adored you and they are willing to move forward with an offer!</p>
      <br/>
      <p>Would you be available for a 15 min call to go over compensation and benefits?</p>
      <p>Let me know,</p>
      <p>Emma</p>
    `,
    timestamp: "9:59AM",
    read: false,
  },
  {
    id: "2",
    sender: "Sarah Connor",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah.connor",
    subject: "Next interview",
    snippet: "Hi Emilie, I wanted to share with you the good news that...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>I wanted to share with you the good news that you've been selected for the next round of interviews!</p>
      <br/>
      <p>Please let me know your availability for next week, and I'll schedule the interviews accordingly.</p>
      <br/>
      <p>Best regards,</p>
      <p>Sarah</p>
    `,
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "3",
    sender: "Christina Correa",
    avatarUrl: "https://i.pravatar.cc/150?u=christina.correa",
    subject: "Document shared with you",
    snippet: "I totally understand. I wanted to clarify that we...",
    content: `
      <p>Hello Emilie,</p>
      <br/>
      <p>I totally understand. I wanted to clarify that we are looking for someone who can start immediately.</p>
      <br/>
      <p>I've shared a document with more details about the position. Please take a look and let me know if you have any questions.</p>
      <br/>
      <p>Regards,</p>
      <p>Christina</p>
    `,
    timestamp: "Wednesday",
    read: true,
  },
  {
    id: "4",
    sender: "Slack",
    avatarUrl: "https://i.pravatar.cc/150?u=slack", // Replace with actual Slack icon if available
    isBrand: true, // To handle brand icons differently if needed
    subject: "You've got 5 unread messages",
    snippet: "Your teams has sent you new messages...",
    content: `
      <p>You've got 5 unread messages in your Slack workspace.</p>
      <br/>
      <p>Click here to view them.</p>
    `,
    timestamp: "Wednesday",
    read: false,
  },
];

interface EmailItemProps {
  id: string;
  sender: string;
  avatarUrl: string;
  subject: string;
  snippet: string;
  content: string;
  timestamp: string;
  read: boolean;
  isBrand?: boolean;
  onClick: (email: Omit<EmailItemProps, "onClick">) => void;
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
  onClick,
}) => {
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
    });
  };

  return (
    <div
      aria-label={`Email from ${sender}: ${subject}`}
      className={`flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/80 cursor-pointer ${!read ? "bg-gray-100 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"}`}
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
      <Avatar
        className="mr-3 flex-shrink-0"
        name={sender}
        size="md"
        src={avatarUrl}
      />
      <div className="flex-grow truncate">
        <div className="flex justify-between items-center">
          <span
            className={`font-medium ${!read ? "text-black dark:text-white" : "text-gray-700 dark:text-neutral-400"}`}
          >
            {sender}
          </span>
          <span className="text-xs text-gray-500 dark:text-neutral-500">
            {timestamp}
          </span>
        </div>
        <p
          className={`text-sm truncate ${!read ? "text-black dark:text-white font-semibold" : "text-gray-600 dark:text-neutral-500"}`}
        >
          {subject}
        </p>
        <p className="text-xs text-gray-500 dark:text-neutral-600 truncate">
          {snippet}
        </p>
      </div>
    </div>
  );
};

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<Omit<
    EmailItemProps,
    "onClick"
  > | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  const handleEmailClick = (email: Omit<EmailItemProps, "onClick">) => {
    setSelectedEmail(email);
  };

  const handleCloseEmailView = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950 text-black dark:text-white">
      {/* Header - Fixed at the top */}
      <div className="sticky top-0 z-10 flex items-center justify-between pt-2 pb-2 px-4 mb-4 backdrop-blur-sm bg-white/90 dark:bg-neutral-950/90">
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
                  "h-10 bg-gray-50 dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm",
              }}
              placeholder="Search emails, contacts, labels"
              radius="lg"
              size="sm"
              startContent={
                <div className="ml-3">
                  <SearchIcon
                    className="text-gray-400 dark:text-neutral-500"
                    size={18}
                  />
                </div>
              }
              type="search"
              variant="flat"
            />
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2">
          <Button
            className="bg-gray-100 dark:bg-neutral-800/60 text-black dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
            radius="lg"
            size="sm"
            startContent={<Edit3Icon size={16} />}
            variant="flat"
          >
            Compose
          </Button>
          <Button
            className={`${
              isAiPanelOpen
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                : "bg-gray-100 dark:bg-neutral-800/60 text-black dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-800"
            } transition-colors`}
            radius="lg"
            size="sm"
            startContent={<BotIcon size={16} />}
            variant="flat"
            onPress={() => setIsAiPanelOpen(!isAiPanelOpen)}
          >
            AI
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Email List Section */}
        <div
          className={`flex flex-col ${
            selectedEmail && isAiPanelOpen
              ? "w-1/3"
              : selectedEmail || isAiPanelOpen
                ? "w-1/2"
                : "w-full"
          } transition-all duration-300`}
        >
          <div className="flex-grow overflow-y-auto px-1">
            {mockEmails.map((email) => (
              <EmailItem key={email.id} {...email} onClick={handleEmailClick} />
            ))}
          </div>
        </div>

        {/* Email View Section */}
        {selectedEmail && (
          <div
            className={`${isAiPanelOpen ? "w-1/3" : "w-1/2"} transition-all duration-300`}
          >
            <EmailView email={selectedEmail} onClose={handleCloseEmailView} />
          </div>
        )}

        {/* AI Panel */}
        {isAiPanelOpen && (
          <div
            className={`${selectedEmail ? "w-1/3" : "w-1/2"} transition-all duration-300`}
          >
            <AiPanel onClose={() => setIsAiPanelOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
