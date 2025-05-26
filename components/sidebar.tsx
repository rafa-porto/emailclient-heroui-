import React from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  AlertOctagonIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  DollarSignIcon,
  FileTextIcon,
  InboxIcon,
  LogOutIcon,
  NewspaperIcon,
  PlusIcon,
  SendIcon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/avatar";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

interface SidebarProps {
  userEmail?: string;
  loginProvider?: "gmail" | "outlook" | "apple" | "microsoft";
}

const Sidebar = ({
  userEmail = "user@example.com",
  loginProvider: _loginProvider,
}: SidebarProps) => {
  const userName = userEmail ? userEmail.split("@")[0] : "User";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-50 dark:bg-neutral-900 p-3 space-y-3 overflow-hidden flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between">
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
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-neutral-700">
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
      <nav className="space-y-0.5">
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<InboxIcon size={16} />}
          variant="flat"
        >
          Inbox
          <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
            12
          </span>
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<FileTextIcon size={16} />}
          variant="light"
        >
          Todos
        </Button>
        <Button
          className="w-full justify-start"
          size="sm"
          startContent={<StarIcon size={16} />}
          variant="light"
        >
          Starred
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
        >
          Trash
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

      {/* Labels */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-neutral-400">
            Labels
          </h3>
          <Button isIconOnly size="sm" variant="light">
            <PlusIcon size={16} />
          </Button>
        </div>
        <nav className="space-y-0.5">
          <Button
            className="w-full justify-start"
            size="sm"
            startContent={<CalendarIcon size={16} />}
            variant="light"
          >
            Calendar
          </Button>
          <Button
            className="w-full justify-start"
            size="sm"
            startContent={<DollarSignIcon size={16} />}
            variant="light"
          >
            Finance
          </Button>
          <Button
            className="w-full justify-start"
            size="sm"
            startContent={<UsersIcon size={16} />}
            variant="light"
          >
            Forums
          </Button>
          <Button
            className="w-full justify-start"
            size="sm"
            startContent={<NewspaperIcon size={16} />}
            variant="light"
          >
            Newsletters
          </Button>
          <Button
            className="w-full justify-start"
            size="sm"
            startContent={<TagIcon size={16} />}
            variant="light"
          >
            Promotions
          </Button>
          <Button
            className="w-full justify-start"
            size="sm"
            startContent={<ShoppingCartIcon size={16} />}
            variant="light"
          >
            Purchases
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
