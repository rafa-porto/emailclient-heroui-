import React from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  AlertOctagonIcon,
  ArchiveIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CrownIcon,
  DatabaseIcon,
  FileTextIcon,
  HardDriveIcon,
  InboxIcon,
  LogOutIcon,
  MailIcon,
  SendIcon,
  StarIcon,
  Trash2Icon,
  ZapIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/avatar";

import { ThemeSwitch } from "@/components/theme-switch";
import { useEmailContext } from "@/components/email-context";
import { siteConfig } from "@/config/site";

interface SidebarProps {
  userEmail?: string;
  loginProvider?: "gmail" | "outlook" | "apple" | "microsoft";
  mockEmails?: any[]; // Add mockEmails prop to get email counts
}

const Sidebar = ({
  userEmail = "user@example.com",
  loginProvider: _loginProvider,
  mockEmails = [],
}: SidebarProps) => {
  const userName = userEmail ? userEmail.split("@")[0] : "User";
  const router = useRouter();
  const { starredEmails, deletedEmails, archivedEmails } = useEmailContext();

  // Calculate email counts
  const activeEmails = mockEmails.filter(
    (email) =>
      !deletedEmails.includes(email.id) && !archivedEmails.includes(email.id)
  );
  const starredCount = starredEmails.filter(
    (id) => !deletedEmails.includes(id) && !archivedEmails.includes(id)
  ).length;
  const trashCount = deletedEmails.length;
  const archivedCount = archivedEmails.length;
  const inboxCount = activeEmails.length;
  const allCount = mockEmails.length;

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-50 dark:bg-neutral-900 p-3 space-y-3 overflow-y-auto flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          {/* Updated logo to match navbar */}
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="font-semibold text-md">{siteConfig.name}</span>
        </div>
        <ThemeSwitch />
      </div>

      {/* User Info with Enhanced Dropdown */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-neutral-700 flex-shrink-0">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="w-full justify-start p-1.5 h-auto data-[hover=true]:bg-gray-50 dark:data-[hover=true]:bg-neutral-700/50 rounded-lg transition-colors"
              variant="light"
            >
              <div className="flex items-center space-x-2 w-full">
                <Avatar
                  className="ring-1 ring-primary/20"
                  name={userName}
                  size="sm"
                  src={`https://i.pravatar.cc/150?u=${userEmail}`}
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white truncate text-left">
                    {userName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-neutral-400 truncate text-left">
                    {userEmail}
                  </span>
                </div>
                <ChevronDownIcon
                  className="ml-2 flex-shrink-0 text-gray-400"
                  size={16}
                />
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" className="w-48">
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              startContent={<LogOutIcon size={16} />}
              onPress={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-0.5 flex-shrink-0">
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<InboxIcon size={16} />}
          variant="flat"
          onClick={() => router.push("/dashboard")}
        >
          Inbox
          <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
            {inboxCount}
          </span>
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<MailIcon size={16} />}
          variant="light"
        >
          All
          <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
            {allCount}
          </span>
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<StarIcon size={16} />}
          variant="light"
          onClick={() => router.push("/dashboard/starred")}
        >
          Starred
          {starredCount > 0 && (
            <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
              {starredCount}
            </span>
          )}
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<ArchiveIcon size={16} />}
          variant="light"
          onClick={() => router.push("/dashboard/archived")}
        >
          Archive
          {archivedCount > 0 && (
            <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
              {archivedCount}
            </span>
          )}
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<ClockIcon size={16} />}
          variant="light"
        >
          Snoozed
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<CheckIcon size={16} />}
          variant="light"
        >
          Done
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<FileTextIcon size={16} />}
          variant="light"
        >
          Drafts
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<SendIcon size={16} />}
          variant="light"
        >
          Sent
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<Trash2Icon size={16} />}
          variant="light"
          onClick={() => router.push("/dashboard/trash")}
        >
          Trash
          {trashCount > 0 && (
            <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
              {trashCount}
            </span>
          )}
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<AlertOctagonIcon size={16} />}
          variant="light"
        >
          Spam
        </Button>
      </nav>

      {/* Spacer to push cards to bottom */}
      <div className="flex-1" />

      {/* Upgrade Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-200/50 dark:border-purple-800/50">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10 rounded-lg">
                <CrownIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                  Upgrade
                </h3>
                <p className="text-xs text-purple-600 dark:text-purple-300">
                  Get Pro features
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-xs text-purple-700 dark:text-purple-200">
              <ZapIcon className="w-3 h-3" />
              <span>AI-powered organization</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-purple-700 dark:text-purple-200">
              <DatabaseIcon className="w-3 h-3" />
              <span>100 GB storage</span>
            </div>
            <Button
              className="w-full mt-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-purple-700 dark:text-purple-300 border-0"
              size="sm"
              variant="flat"
            >
              Upgrade Now
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Storage Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200/50 dark:border-blue-800/50">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg">
                <HardDriveIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Storage
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  4.2 GB used
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-blue-700 dark:text-blue-200">
              <span>4.2 GB of 15 GB used</span>
              <span>28%</span>
            </div>
            <div className="w-full bg-blue-200/50 dark:bg-blue-800/30 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: "28%" }}
              />
            </div>
            <Button
              className="w-full mt-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-0"
              size="sm"
              variant="flat"
            >
              Manage Storage
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
