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
  ShieldIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CrownIcon,
  FileTextIcon,
  InboxIcon,
  LogOutIcon,
  MailIcon,
  PaletteIcon,
  SendIcon,
  SettingsIcon,
  StarIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Avatar } from "@heroui/avatar";

import { ThemeSwitch } from "@/components/theme-switch";
import { useEmailContext } from "@/components/email-context";
import { siteConfig } from "@/config/site";
import { spamEmails as mockSpamEmails } from "@/data/spamEmails";
import { EMAIL_CATEGORIES } from "@/utils/emailClassification";
import { mockEmails } from "@/data/mockEmails";

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
  const {
    starredEmails,
    deletedEmails,
    archivedEmails,
    spamEmails,
    isEmailRead,
    sentEmails,
    isInboxOrganized,
    getEmailsByCategory,
    newEmails,
  } = useEmailContext();

  // Check if we're on settings page
  const isSettingsPage = pathname.startsWith("/dashboard/settings");
  const activeSection = searchParams.get("section") || "general";

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
  const sentCount = sentEmails.length;
  // Calculate spam count: includes both mock spam emails and emails marked as spam
  const spamCount =
    mockSpamEmails.length +
    spamEmails.filter(
      (id) => !mockSpamEmails.some((spamEmail) => spamEmail.id === id)
    ).length;

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
              activeSection === "general" || activeSection === "profile"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<UserIcon size={16} />}
            variant={
              activeSection === "general" || activeSection === "profile"
                ? "solid"
                : "light"
            }
            onPress={() => router.push("/dashboard/settings?section=general")}
          >
            General
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
              activeSection === "privacy"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<ShieldIcon size={16} />}
            variant={activeSection === "privacy" ? "solid" : "light"}
            onPress={() => router.push("/dashboard/settings?section=privacy")}
          >
            Privacy
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "connections"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<MailIcon size={16} />}
            variant={activeSection === "connections" ? "solid" : "light"}
            onPress={() =>
              router.push("/dashboard/settings?section=connections")
            }
          >
            Connections
          </Button>
          <Button
            className={`w-full justify-start ${
              activeSection === "delete-account"
                ? "bg-red-600 text-white border-red-600 border hover:bg-red-700"
                : ""
            }`}
            size="sm"
            startContent={<Trash2Icon size={16} />}
            variant={activeSection === "delete-account" ? "solid" : "light"}
            onPress={() =>
              router.push("/dashboard/settings?section=delete-account")
            }
          >
            Delete Account
          </Button>
        </nav>

        {/* Spacer to push cards to bottom */}
        <div className="flex-1" />

        {/* Upgrade Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 border-[0.5px] border-blue-200 dark:border-blue-800">
          <CardBody className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <CrownIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Upgrade to Pro
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                    Unlock premium features
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                <span>Advanced AI features</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                <span>Priority support</span>
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              size="sm"
              variant="solid"
            >
              Upgrade Now
            </Button>
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
          className={`w-full justify-start ${
            pathname === "/dashboard/sent"
              ? "bg-green-600 text-white border-green-600 border hover:bg-green-700"
              : ""
          }`}
          size="sm"
          startContent={<SendIcon size={16} />}
          variant={pathname === "/dashboard/sent" ? "solid" : "light"}
          onClick={() => router.push("/dashboard/sent")}
        >
          Sent
          {sentCount > 0 && (
            <span
              className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                pathname === "/dashboard/sent"
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-neutral-700"
              }`}
            >
              {sentCount}
            </span>
          )}
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
          className={`w-full justify-start ${
            pathname === "/dashboard/spam"
              ? "bg-orange-600 text-white border-orange-600 border hover:bg-orange-700"
              : ""
          }`}
          size="sm"
          startContent={<AlertOctagonIcon size={16} />}
          variant={pathname === "/dashboard/spam" ? "solid" : "light"}
          onClick={() => router.push("/dashboard/spam")}
        >
          Spam
          {spamCount > 0 && (
            <span
              className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                pathname === "/dashboard/spam"
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-neutral-700"
              }`}
            >
              {spamCount}
            </span>
          )}
        </Button>
      </nav>

      {/* Categories Section - Only show when inbox is organized */}
      {isInboxOrganized && (
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase tracking-wider px-2 mb-2">
            Categories
          </h3>

          <Button
            className={`w-full justify-start ${
              pathname === "/dashboard/work"
                ? "bg-blue-600 text-white border-blue-600 border hover:bg-blue-700"
                : ""
            }`}
            size="sm"
            startContent={<span className="text-sm">💼</span>}
            variant={pathname === "/dashboard/work" ? "solid" : "light"}
            onClick={() => router.push("/dashboard/work")}
          >
            Work
            {(() => {
              const allEmails = [...newEmails, ...mockEmails].filter(
                (email) =>
                  !deletedEmails.includes(email.id) &&
                  !archivedEmails.includes(email.id)
              );
              const workEmails = getEmailsByCategory("work", allEmails);
              return (
                workEmails.length > 0 && (
                  <span
                    className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                      pathname === "/dashboard/work"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-neutral-700"
                    }`}
                  >
                    {workEmails.length}
                  </span>
                )
              );
            })()}
          </Button>

          <Button
            className={`w-full justify-start ${
              pathname === "/dashboard/promotions"
                ? "bg-orange-600 text-white border-orange-600 border hover:bg-orange-700"
                : ""
            }`}
            size="sm"
            startContent={<span className="text-sm">🏷️</span>}
            variant={pathname === "/dashboard/promotions" ? "solid" : "light"}
            onClick={() => router.push("/dashboard/promotions")}
          >
            Promotions
            {(() => {
              const allEmails = [...newEmails, ...mockEmails].filter(
                (email) =>
                  !deletedEmails.includes(email.id) &&
                  !archivedEmails.includes(email.id)
              );
              const promotionEmails = getEmailsByCategory(
                "promotions",
                allEmails
              );
              return (
                promotionEmails.length > 0 && (
                  <span
                    className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                      pathname === "/dashboard/promotions"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-neutral-700"
                    }`}
                  >
                    {promotionEmails.length}
                  </span>
                )
              );
            })()}
          </Button>

          <Button
            className={`w-full justify-start ${
              pathname === "/dashboard/bills"
                ? "bg-yellow-600 text-white border-yellow-600 border hover:bg-yellow-700"
                : ""
            }`}
            size="sm"
            startContent={<span className="text-sm">💳</span>}
            variant={pathname === "/dashboard/bills" ? "solid" : "light"}
            onClick={() => router.push("/dashboard/bills")}
          >
            Bills
            {(() => {
              const allEmails = [...newEmails, ...mockEmails].filter(
                (email) =>
                  !deletedEmails.includes(email.id) &&
                  !archivedEmails.includes(email.id)
              );
              const billsEmails = getEmailsByCategory("bills", allEmails);
              return (
                billsEmails.length > 0 && (
                  <span
                    className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                      pathname === "/dashboard/bills"
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-neutral-700"
                    }`}
                  >
                    {billsEmails.length}
                  </span>
                )
              );
            })()}
          </Button>
        </div>
      )}

      {/* Spacer to push cards to bottom */}
      <div className="flex-1" />

      {/* Upgrade Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 border-[0.5px] border-blue-200 dark:border-blue-800">
        <CardBody className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <CrownIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Upgrade to Pro
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                  Unlock premium features
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <span>Advanced AI features</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <span>Priority support</span>
            </div>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            size="sm"
            variant="solid"
          >
            Upgrade Now
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
