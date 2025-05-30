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
  ArrowLeftIcon,
  BellIcon,
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
  PaletteIcon,
  SendIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { starredEmails, deletedEmails, archivedEmails, isEmailRead } =
    useEmailContext();

  // Check if we're on settings page
  const isSettingsPage = pathname.startsWith("/dashboard/settings");
  const activeSection = searchParams.get("section") || "profile";

  // Calculate email counts
  const activeEmails = mockEmails.filter(
    (email) =>
      !deletedEmails.includes(email.id) && !archivedEmails.includes(email.id)
  );
  const unreadInboxCount = activeEmails.filter(
    (email) => !isEmailRead(email.id)
  ).length;
  const starredCount = starredEmails.filter(
    (id) => !deletedEmails.includes(id) && !archivedEmails.includes(id)
  ).length;
  const trashCount = deletedEmails.length;
  const archivedCount = archivedEmails.length;
  const allCount = mockEmails.length;

  const handleLogout = () => {
    router.push("/");
  };

  // If we're on settings page, show settings sidebar
  if (isSettingsPage) {
    return (
      <div className="flex flex-col h-full w-64 bg-gray-50 dark:bg-neutral-900 p-3 space-y-3 overflow-y-auto flex-shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="font-semibold text-md">{siteConfig.name}</span>
          </div>
          <ThemeSwitch />
        </div>

        {/* User Info with Enhanced Dropdown */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-sm border-[0.5px] border-gray-200 dark:border-neutral-700 flex-shrink-0">
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

        {/* Back Button */}
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<ArrowLeftIcon size={16} />}
          variant="light"
          onPress={() => router.push("/dashboard")}
        >
          Back to Inbox
        </Button>

        {/* Settings Navigation */}
        <nav className="space-y-0.5 flex-shrink-0">
          <Button
            className={`w-full justify-start ${
              activeSection === "profile"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<UserIcon size={16} />}
            variant={activeSection === "profile" ? "solid" : "light"}
            onPress={() => router.push("/dashboard/settings?section=profile")}
          >
            Profile
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "notifications"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<BellIcon size={16} />}
            variant={activeSection === "notifications" ? "solid" : "light"}
            onPress={() =>
              router.push("/dashboard/settings?section=notifications")
            }
          >
            Notifications
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "privacy"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<ShieldIcon size={16} />}
            variant={activeSection === "privacy" ? "solid" : "light"}
            onPress={() => router.push("/dashboard/settings?section=privacy")}
          >
            Privacy & Security
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "appearance"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<PaletteIcon size={16} />}
            variant={activeSection === "appearance" ? "solid" : "light"}
            onPress={() =>
              router.push("/dashboard/settings?section=appearance")
            }
          >
            Appearance
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "email"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<MailIcon size={16} />}
            variant={activeSection === "email" ? "solid" : "light"}
            onPress={() => router.push("/dashboard/settings?section=email")}
          >
            Email Settings
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "storage"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<DatabaseIcon size={16} />}
            variant={activeSection === "storage" ? "solid" : "light"}
            onPress={() => router.push("/dashboard/settings?section=storage")}
          >
            Storage & Data
          </Button>
        </nav>

        {/* Spacer to push cards to bottom */}
        <div className="flex-1" />

        {/* Upgrade Card */}
        <Card className="bg-white dark:bg-neutral-800 border-[0.5px] border-gray-200 dark:border-neutral-700">
          <CardBody className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CrownIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Upgrade
                  </h3>
                </div>
              </div>
              <Button
                className="text-xs h-6 px-2 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600"
                size="sm"
                variant="flat"
              >
                Pro
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Storage Card */}
        <Card className="bg-white dark:bg-neutral-800 border-[0.5px] border-gray-200 dark:border-neutral-700">
          <CardBody className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HardDriveIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Storage
                </h3>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                28%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-1.5">
              <div
                className="bg-gray-600 dark:bg-gray-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: "28%" }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              4.2 GB of 15 GB
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

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
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-sm border-[0.5px] border-gray-200 dark:border-neutral-700 flex-shrink-0">
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
              key="settings"
              startContent={<SettingsIcon size={16} />}
              onPress={() => router.push("/dashboard/settings")}
            >
              Settings
            </DropdownItem>
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
          className={`w-full justify-start ${
            pathname === "/dashboard"
              ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
              : ""
          }`}
          size="sm"
          startContent={<InboxIcon size={16} />}
          variant={pathname === "/dashboard" ? "solid" : "light"}
          onClick={() => router.push("/dashboard")}
        >
          Inbox
          {unreadInboxCount > 0 && (
            <span className="ml-auto text-xs bg-white/20 text-white px-1.5 py-0.5 rounded-full font-medium">
              {unreadInboxCount}
            </span>
          )}
        </Button>
        <Button
          className={`w-full justify-start ${
            pathname === "/dashboard/all"
              ? "bg-green-600 text-white border-green-600 border hover:bg-green-700"
              : ""
          }`}
          size="sm"
          startContent={<MailIcon size={16} />}
          variant={pathname === "/dashboard/all" ? "solid" : "light"}
          onClick={() => router.push("/dashboard/all")}
        >
          All
          <span
            className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
              pathname === "/dashboard/all"
                ? "bg-white/20 text-white"
                : "bg-gray-200 dark:bg-neutral-700"
            }`}
          >
            {allCount}
          </span>
        </Button>
        <Button
          className={`w-full justify-start ${
            pathname === "/dashboard/starred"
              ? "bg-yellow-600 text-white border-yellow-600 border hover:bg-yellow-700"
              : ""
          }`}
          size="sm"
          startContent={<StarIcon size={16} />}
          variant={pathname === "/dashboard/starred" ? "solid" : "light"}
          onClick={() => router.push("/dashboard/starred")}
        >
          Starred
          {starredCount > 0 && (
            <span
              className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                pathname === "/dashboard/starred"
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-neutral-700"
              }`}
            >
              {starredCount}
            </span>
          )}
        </Button>
        <Button
          className={`w-full justify-start ${
            pathname === "/dashboard/archived"
              ? "bg-purple-600 text-white border-purple-600 border hover:bg-purple-700"
              : ""
          }`}
          size="sm"
          startContent={<ArchiveIcon size={16} />}
          variant={pathname === "/dashboard/archived" ? "solid" : "light"}
          onClick={() => router.push("/dashboard/archived")}
        >
          Archive
          {archivedCount > 0 && (
            <span
              className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                pathname === "/dashboard/archived"
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-neutral-700"
              }`}
            >
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
          className={`w-full justify-start ${
            pathname === "/dashboard/trash"
              ? "bg-red-600 text-white border-red-600 border hover:bg-red-700"
              : ""
          }`}
          size="sm"
          startContent={<Trash2Icon size={16} />}
          variant={pathname === "/dashboard/trash" ? "solid" : "light"}
          onClick={() => router.push("/dashboard/trash")}
        >
          Trash
          {trashCount > 0 && (
            <span
              className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                pathname === "/dashboard/trash"
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-neutral-700"
              }`}
            >
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
      <Card className="bg-white dark:bg-neutral-800 border-[0.5px] border-gray-200 dark:border-neutral-700">
        <CardBody className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CrownIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Upgrade
                </h3>
              </div>
            </div>
            <Button
              className="text-xs h-6 px-2 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600"
              size="sm"
              variant="flat"
            >
              Pro
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Storage Card */}
      <Card className="bg-white dark:bg-neutral-800 border-[0.5px] border-gray-200 dark:border-neutral-700">
        <CardBody className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <HardDriveIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Storage
              </h3>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              28%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-1.5">
            <div
              className="bg-gray-600 dark:bg-gray-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: "28%" }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            4.2 GB of 15 GB
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
