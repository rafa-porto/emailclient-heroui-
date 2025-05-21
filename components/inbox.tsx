import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { SearchIcon, Edit3Icon, ChevronDownIcon } from "lucide-react";

// Mock data for emails - we'll refine this later
const mockEmails = [
  {
    id: "1",
    sender: "Emma Rooney",
    avatarUrl: "https://i.pravatar.cc/150?u=emma.rooney",
    subject: "Updated invitation: Product Designer interview...",
    snippet: "Hi Emilie, how are you?...",
    timestamp: "12:24PM",
    read: false,
  },
  {
    id: "2",
    sender: "Sarah Connor",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah.connor",
    subject: "Next interview",
    snippet: "Hi Emilie, I wanted to share with you the good news that...",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "3",
    sender: "Christina Correa",
    avatarUrl: "https://i.pravatar.cc/150?u=christina.correa",
    subject: "Document shared with you",
    snippet: "I totally understand. I wanted to clarify that we...",
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
  timestamp: string;
  read: boolean;
  isBrand?: boolean;
}

const EmailItem: React.FC<EmailItemProps> = ({
  sender,
  avatarUrl,
  subject,
  snippet,
  timestamp,
  read,
  isBrand,
}) => {
  return (
    <div
      className={`flex items-center p-3 border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer ${!read ? "bg-gray-100 dark:bg-neutral-850" : ""}`}
    >
      <Avatar
        src={avatarUrl}
        name={sender}
        size="md"
        className="mr-3 flex-shrink-0"
      />
      <div className="flex-grow truncate">
        <div className="flex justify-between items-center">
          <span
            className={`font-medium ${!read ? "text-black dark:text-white" : "text-gray-700 dark:text-neutral-300"}`}
          >
            {sender}
          </span>
          <span className="text-xs text-gray-500 dark:text-neutral-400">
            {timestamp}
          </span>
        </div>
        <p
          className={`text-sm truncate ${!read ? "text-black dark:text-white font-semibold" : "text-gray-600 dark:text-neutral-400"}`}
        >
          {subject}
        </p>
        <p className="text-xs text-gray-500 dark:text-neutral-500 truncate">
          {snippet}
        </p>
      </div>
    </div>
  );
};

const Inbox = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between pt-0 pr-1 pb-1 pl-4 mb-4">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="light"
            className="dark:text-neutral-300"
            endContent={<ChevronDownIcon size={16} />}
          >
            Recent
          </Button>
          <Button
            size="sm"
            variant="light"
            className="dark:text-neutral-300"
            endContent={<ChevronDownIcon size={16} />}
          >
            Todos
          </Button>
        </div>
        <div className="flex-grow max-w-xl mx-2">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper:
                "bg-gray-100 dark:bg-neutral-800 border-transparent hover:border-gray-300 dark:hover:border-neutral-700",
              input: "text-sm",
            }}
            labelPlacement="outside"
            placeholder="Search emails, contacts, labels"
            startContent={
              <SearchIcon
                className="text-base text-gray-500 dark:text-neutral-400 pointer-events-none flex-shrink-0"
                size={18}
              />
            }
            type="search"
          />
        </div>
        <Button
          color="primary"
          size="sm"
          startContent={<Edit3Icon size={16} />}
        >
          Compose
        </Button>
      </div>

      {/* Email List */}
      <div className="flex-grow overflow-y-auto">
        {mockEmails.map((email) => (
          <EmailItem key={email.id} {...email} />
        ))}
      </div>
    </div>
  );
};

export default Inbox;
