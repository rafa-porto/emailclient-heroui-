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
}

const Sidebar = ({ userEmail = "user@example.com" }: SidebarProps) => {
  const userName = userEmail ? userEmail.split("@")[0] : "User";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-50 dark:bg-neutral-900 p-4 space-y-6 border-r border-gray-200 dark:border-neutral-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Updated logo with better styling */}
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
            D
          </div>
          <span className="font-semibold text-lg">{siteConfig.name}</span>
        </div>
        <ThemeSwitch />
      </div>

      {/* User Info with Enhanced Dropdown */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-700">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="w-full justify-start p-2 h-auto data-[hover=true]:bg-gray-50 dark:data-[hover=true]:bg-neutral-700/50 rounded-lg transition-colors"
              variant="light"
            >
              <div className="flex items-center space-x-3 w-full">
                <Avatar
                  name={userName}
                  size="md"
                  src={`https://i.pravatar.cc/150?u=${userEmail}`}
                  className="ring-2 ring-primary/20"
                />
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {userName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-neutral-400 truncate w-full">
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
          <DropdownMenu aria-label="User Actions" className="w-56">
            <DropdownItem
              key="profile"
              description="View and edit your profile"
              startContent={
                <Avatar
                  name={userName}
                  size="sm"
                  src={`https://i.pravatar.cc/150?u=${userEmail}`}
                />
              }
              className="h-14 gap-2"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-gray-500">{userEmail}</span>
              </div>
            </DropdownItem>
            <DropdownItem
              key="logout"
              startContent={<LogOutIcon size={16} />}
              onPress={handleLogout}
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Main Navigation */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-700">
        <nav className="space-y-1">
          <Button
            className="w-full justify-start rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
            size="sm"
            startContent={<InboxIcon size={16} />}
            variant="flat"
          >
            Inbox
            <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
              12
            </span>
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<FileTextIcon size={16} />}
            variant="light"
          >
            Todos
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<StarIcon size={16} />}
            variant="light"
          >
            Starred
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<ClockIcon size={16} />}
            variant="light"
          >
            Snoozed
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<CheckIcon size={16} />}
            variant="light"
          >
            Done
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<FileTextIcon size={16} />}
            variant="light"
          >
            Drafts
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<SendIcon size={16} />}
            variant="light"
          >
            Sent
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<Trash2Icon size={16} />}
            variant="light"
          >
            Trash
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<AlertOctagonIcon size={16} />}
            variant="light"
          >
            Spam
          </Button>
        </nav>
      </div>

      {/* Labels */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-700 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-neutral-400 tracking-wider">
            Labels
          </h3>
          <Button isIconOnly className="rounded-lg" size="sm" variant="light">
            <PlusIcon size={16} />
          </Button>
        </div>
        <nav className="space-y-1">
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<CalendarIcon size={16} />}
            variant="light"
          >
            Calendar
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<DollarSignIcon size={16} />}
            variant="light"
          >
            Finance
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<UsersIcon size={16} />}
            variant="light"
          >
            Forums
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<NewspaperIcon size={16} />}
            variant="light"
          >
            Newsletters
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
            size="sm"
            startContent={<TagIcon size={16} />}
            variant="light"
          >
            Promotions
          </Button>
          <Button
            className="w-full justify-start rounded-lg"
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
