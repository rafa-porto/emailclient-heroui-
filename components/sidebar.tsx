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
import {
  AppleIcon,
  GmailIcon,
  MicrosoftIcon,
  // OutlookIcon, // Commented out as MicrosoftIcon is used for outlook
} from "@/components/icons";

interface SidebarProps {
  userEmail?: string;
  loginProvider?: "gmail" | "outlook" | "apple" | "microsoft";
}

const Sidebar = ({
  userEmail = "user@example.com",
  loginProvider,
}: SidebarProps) => {
  const userName = userEmail ? userEmail.split("@")[0] : "User";
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const renderProviderIcon = () => {
    if (!loginProvider) return null;
    const iconProps = { size: 16, className: "ml-2" };
    switch (loginProvider) {
      case "gmail":
        return <GmailIcon {...iconProps} />;
      case "outlook":
        return <MicrosoftIcon {...iconProps} />;
      case "apple":
        return <AppleIcon {...iconProps} />;
      case "microsoft":
        return <MicrosoftIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-100 dark:bg-neutral-900 p-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Replace with actual logo */}
          <div className="w-7 h-7 bg-black rounded flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="font-semibold text-md">{"Dove"}</span>
        </div>
        {/* Dropdown or similar for Dove */}
      </div>

      {/* User Info with Dropdown */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="flex items-center space-x-2 p-0 h-auto data-[hover=true]:bg-transparent"
            variant="light"
          >
            <Avatar
              name={userName}
              size="sm"
              src={`https://i.pravatar.cc/150?u=${userEmail}`}
            />
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <span className="text-xs font-medium">{userEmail}</span>
                {renderProviderIcon()}
              </div>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          <DropdownItem
            key="logout"
            startContent={<LogOutIcon size={16} />}
            onPress={handleLogout}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Main Navigation */}
      <nav className="space-y-0.5">
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<InboxIcon size={16} />} // Smaller icon
          variant="flat"
        >
          Inbox
          <span className="ml-auto text-xs bg-gray-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">
            12
          </span>
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<FileTextIcon size={16} />} // Smaller icon
          variant="light"
        >
          Todos
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<StarIcon size={16} />} // Smaller icon
          variant="light"
        >
          Starred
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<ClockIcon size={16} />} // Smaller icon
          variant="light"
        >
          Snoozed
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<CheckIcon size={16} />} // Smaller icon
          variant="light"
        >
          Done
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<FileTextIcon size={16} />} // Smaller icon
          variant="light"
        >
          Drafts
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<SendIcon size={16} />} // Smaller icon
          variant="light"
        >
          Sent
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<Trash2Icon size={16} />} // Smaller icon
          variant="light"
        >
          Trash
        </Button>
        <Button
          className="w-full justify-start"
          size="sm" // Smaller button
          startContent={<AlertOctagonIcon size={16} />} // Smaller icon
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
            size="sm" // Smaller button
            startContent={<CalendarIcon size={16} />} // Smaller icon
            variant="light"
          >
            Calendar
          </Button>
          <Button
            className="w-full justify-start"
            size="sm" // Smaller button
            startContent={<DollarSignIcon size={16} />} // Smaller icon
            variant="light"
          >
            Finance
          </Button>
          <Button
            className="w-full justify-start"
            size="sm" // Smaller button
            startContent={<UsersIcon size={16} />} // Smaller icon
            variant="light"
          >
            Forums
          </Button>
          <Button
            className="w-full justify-start"
            size="sm" // Smaller button
            startContent={<NewspaperIcon size={16} />} // Smaller icon
            variant="light"
          >
            Newsletters
          </Button>
          <Button
            className="w-full justify-start"
            size="sm" // Smaller button
            startContent={<TagIcon size={16} />} // Smaller icon
            variant="light"
          >
            Promotions
          </Button>
          <Button
            className="w-full justify-start"
            size="sm" // Smaller button
            startContent={<ShoppingCartIcon size={16} />} // Smaller icon
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
