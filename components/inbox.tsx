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
} from "lucide-react";

import { useEmailContext } from "@/components/email-context";
import { AIIcon } from "@/components/icons";
import { EmailData } from "@/types";

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
    sender: "Netflix",
    avatarUrl: "/netflix.svg",
    isBrand: true,
    subject: "Your subscription expires in 3 days",
    snippet: "Don't lose access to your favorite shows...",
    content: `
      <p>Hi there,</p>
      <br/>
      <p>Your Netflix subscription will expire in 3 days. To continue watching your favorite shows and movies, please update your payment method.</p>
      <br/>
      <p>Click here to update your billing information and keep your subscription active.</p>
      <br/>
      <p>Thanks,</p>
      <p>The Netflix Team</p>
    `,
    timestamp: "10:15AM",
    read: false,
  },
  {
    id: "3",
    sender: "GitHub",
    avatarUrl: "/github.svg",
    isBrand: true,
    subject: "Security alert: New sign-in from San Francisco",
    snippet: "We detected a new sign-in to your account...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>We detected a new sign-in to your GitHub account from a device in San Francisco, CA.</p>
      <br/>
      <p><strong>Device:</strong> Chrome on macOS<br/>
      <strong>Time:</strong> May 28, 2025 at 9:42 AM PST<br/>
      <strong>Location:</strong> San Francisco, CA, US</p>
      <br/>
      <p>If this was you, you can safely ignore this email. If not, please secure your account immediately.</p>
      <br/>
      <p>GitHub Security Team</p>
    `,
    timestamp: "9:42AM",
    read: false,
  },
  {
    id: "4",
    sender: "Apple",
    avatarUrl: "/apple.svg",
    isBrand: true,
    subject: "Your order has been shipped",
    snippet: "Great news! Your order is on its way...",
    content: `
      <p>Thank you for your order!</p>
      <br/>
      <p>Great news! Your order #W123456789 has been shipped and is on its way to you.</p>
      <br/>
      <p><strong>Order Details:</strong><br/>
      iPhone 15 Pro - Natural Titanium - 256GB<br/>
      Estimated delivery: May 30, 2025</p>
      <br/>
      <p>Track your package: TR123456789</p>
      <br/>
      <p>Apple Store Team</p>
    `,
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "5",
    sender: "Dr. Sarah Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=dr.sarah",
    subject: "Appointment Reminder - Tomorrow at 2:00 PM",
    snippet: "This is a reminder for your upcoming appointment...",
    content: `
      <p>Dear Emilie,</p>
      <br/>
      <p>This is a reminder for your upcoming appointment:</p>
      <br/>
      <p><strong>Date:</strong> May 29, 2025<br/>
      <strong>Time:</strong> 2:00 PM<br/>
      <strong>Location:</strong> 123 Medical Center Dr, Suite 200</p>
      <br/>
      <p>Please arrive 15 minutes early. If you need to reschedule, please call us at (555) 123-4567.</p>
      <br/>
      <p>Best regards,</p>
      <p>Dr. Sarah Johnson's Office</p>
    `,
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "6",
    sender: "Stripe",
    avatarUrl: "/stripe.svg",
    isBrand: true,
    subject: "Payment successful - $299.00",
    snippet: "Your payment has been processed successfully...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>Your payment has been processed successfully.</p>
      <br/>
      <p><strong>Payment Details:</strong><br/>
      Amount: $299.00<br/>
      Date: May 28, 2025<br/>
      Description: Annual Pro Subscription<br/>
      Payment Method: •••• 4242</p>
      <br/>
      <p>Receipt ID: ch_3N1234567890</p>
      <br/>
      <p>Thanks for your business!</p>
      <p>Stripe</p>
    `,
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "7",
    sender: "Zoom",
    avatarUrl: "/zoom.svg",
    isBrand: true,
    subject: "Meeting scheduled: Team Standup - May 29, 10:00 AM",
    snippet: "You're invited to join a Zoom meeting...",
    content: `
      <p>You're invited to a Zoom meeting.</p>
      <br/>
      <p><strong>Topic:</strong> Team Standup<br/>
      <strong>Time:</strong> May 29, 2025 10:00 AM Pacific Time<br/>
      <strong>Duration:</strong> 30 minutes</p>
      <br/>
      <p><strong>Join Zoom Meeting:</strong><br/>
      https://zoom.us/j/1234567890</p>
      <br/>
      <p><strong>Meeting ID:</strong> 123 456 7890<br/>
      <strong>Passcode:</strong> standup</p>
      <br/>
      <p>Zoom</p>
    `,
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "8",
    sender: "LinkedIn",
    avatarUrl: "/linkedin.svg",
    isBrand: true,
    subject: "You have 3 new profile views",
    snippet: "People are checking out your profile...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>You have 3 new profile views this week! People are interested in your professional background.</p>
      <br/>
      <p>Here's who viewed your profile:<br/>
      • John Smith - Senior Developer at TechCorp<br/>
      • Sarah Williams - HR Manager at StartupX<br/>
      • Mike Brown - CTO at InnovateLab</p>
      <br/>
      <p>Upgrade to LinkedIn Premium to see who's viewing your profile and get insights.</p>
      <br/>
      <p>LinkedIn Team</p>
    `,
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "9",
    sender: "Amazon Web Services",
    avatarUrl: "/aws.svg",
    isBrand: true,
    subject: "AWS Bill: Your May 2025 invoice is ready",
    snippet: "Your monthly AWS bill is now available...",
    content: `
      <p>Hello,</p>
      <br/>
      <p>Your AWS bill for May 2025 is now available.</p>
      <br/>
      <p><strong>Bill Summary:</strong><br/>
      Total Amount: $127.45<br/>
      Previous Balance: $0.00<br/>
      Payments: $0.00<br/>
      New Charges: $127.45</p>
      <br/>
      <p><strong>Top Services:</strong><br/>
      • EC2-Instance: $67.23<br/>
      • S3: $31.22<br/>
      • CloudFront: $29.00</p>
      <br/>
      <p>Your payment will be automatically charged to your default payment method on June 5, 2025.</p>
      <br/>
      <p>AWS Billing Team</p>
    `,
    timestamp: "Tuesday",
    read: false,
  },
  {
    id: "10",
    sender: "Figma",
    avatarUrl: "/figma.svg",
    isBrand: true,
    subject: "You've been added to Design System project",
    snippet: "John invited you to collaborate on a project...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>John Smith has invited you to collaborate on the "Design System" project.</p>
      <br/>
      <p>You now have edit access to all files in this project. You can start collaborating right away!</p>
      <br/>
      <p>Project includes:<br/>
      • Component Library<br/>
      • Design Tokens<br/>
      • UI Guidelines</p>
      <br/>
      <p>Happy designing!</p>
      <p>Figma Team</p>
    `,
    timestamp: "Tuesday",
    read: true,
  },
  {
    id: "11",
    sender: "Gmail Team",
    avatarUrl: "/gmail.svg",
    isBrand: true,
    subject: "Verify your new email address",
    snippet: "Please verify your email address to complete setup...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>You recently added emilie.new@gmail.com as a recovery email for your account.</p>
      <br/>
      <p>To complete the setup, please verify this email address by clicking the button below:</p>
      <br/>
      <p><strong>Verify Email Address</strong></p>
      <br/>
      <p>This link will expire in 24 hours. If you didn't request this change, please ignore this email.</p>
      <br/>
      <p>Gmail Security Team</p>
    `,
    timestamp: "Monday",
    read: false,
  },
  {
    id: "12",
    sender: "Calendly",
    avatarUrl: "/calendly.svg",
    isBrand: true,
    subject: "Meeting confirmed: Design Review with Alex",
    snippet: "Your meeting has been confirmed...",
    content: `
      <p>Your meeting has been confirmed!</p>
      <br/>
      <p><strong>Design Review with Alex</strong><br/>
      Thursday, May 30, 2025<br/>
      3:00 PM - 4:00 PM (PDT)</p>
      <br/>
      <p><strong>Location:</strong> Google Meet<br/>
      <strong>Meeting Link:</strong> meet.google.com/abc-defg-hij</p>
      <br/>
      <p><strong>Attendees:</strong><br/>
      • Emilie Lemaire (you)<br/>
      • Alex Rodriguez</p>
      <br/>
      <p>Need to reschedule? Use this link to make changes.</p>
      <br/>
      <p>Calendly</p>
    `,
    timestamp: "Monday",
    read: true,
  },
  {
    id: "13",
    sender: "Notion",
    avatarUrl: "/notion.svg",
    isBrand: true,
    subject: "Weekly digest: 5 updates in your workspace",
    snippet: "Here's what happened in your workspace this week...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>Here's what happened in your "Product Team" workspace this week:</p>
      <br/>
      <p><strong>Recent Updates:</strong><br/>
      • Sarah updated "Q2 Roadmap" page<br/>
      • Mike created "User Research Findings"<br/>
      • Alex commented on "Design System Guidelines"<br/>
      • You were mentioned in "Sprint Planning"<br/>
      • New page: "API Documentation"</p>
      <br/>
      <p>Stay up to date with your team's progress.</p>
      <br/>
      <p>Notion Team</p>
    `,
    timestamp: "Sunday",
    read: true,
  },
  {
    id: "14",
    sender: "Uber",
    avatarUrl: "/uber.svg",
    isBrand: true,
    subject: "Trip receipt: $12.50 to Downtown",
    snippet: "Thanks for riding with Uber...",
    content: `
      <p>Thanks for riding with Uber!</p>
      <br/>
      <p><strong>Trip Details:</strong><br/>
      Date: May 28, 2025<br/>
      Time: 8:15 AM - 8:32 AM<br/>
      Driver: Carlos M. (4.9 ⭐)</p>
      <br/>
      <p><strong>Route:</strong><br/>
      From: 123 Home Street<br/>
      To: 456 Office Building, Downtown</p>
      <br/>
      <p><strong>Fare Breakdown:</strong><br/>
      Trip Fare: $10.50<br/>
      Tip: $2.00<br/>
      Total: $12.50</p>
      <br/>
      <p>Rate your trip and help us improve!</p>
      <br/>
      <p>Uber</p>
    `,
    timestamp: "Sunday",
    read: true,
  },
  {
    id: "15",
    sender: "Microsoft Teams",
    avatarUrl: "/microsoft-teams.svg",
    isBrand: true,
    subject: "You missed a call from the Marketing Team",
    snippet: "The Marketing Team tried to reach you...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>The Marketing Team tried to reach you at 2:30 PM today but you weren't available.</p>
      <br/>
      <p><strong>Call Details:</strong><br/>
      Duration: 0 seconds (missed)<br/>
      Participants: Sarah Kim, John Doe, Mike Wilson</p>
      <br/>
      <p>You can listen to the voicemail they left or call them back directly.</p>
      <br/>
      <p>Microsoft Teams</p>
    `,
    timestamp: "2:30 PM",
    read: false,
  },
  {
    id: "16",
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
    timestamp: "Friday",
    read: true,
  },
  {
    id: "17",
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
    timestamp: "Friday",
    read: true,
  },
  {
    id: "18",
    sender: "Slack",
    avatarUrl: "/slack.svg",
    isBrand: true,
    subject: "You've got 5 unread messages",
    snippet: "Your teams has sent you new messages...",
    content: `
      <p>You've got 5 unread messages in your Slack workspace.</p>
      <br/>
      <p>Click here to view them.</p>
    `,
    timestamp: "Friday",
    read: false,
  },
];

interface EmailItemProps extends EmailData {
  onClick: (email: EmailData) => void;
  onStar?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
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
  onStar,
  onArchive,
  onDelete,
}) => {
  const [showActionPopup, setShowActionPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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
      className={`group relative flex items-center p-3 mb-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/80 cursor-pointer ${!read ? "bg-gray-100 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"}`}
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
        <div className="mr-3 flex-shrink-0 w-11 h-11 flex items-center justify-center">
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
            height={38}
            src={avatarUrl}
            width={38}
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
          <span
            className={`font-medium ${!read ? "text-black dark:text-white" : "text-gray-700 dark:text-neutral-400"}`}
          >
            {sender}
          </span>
          <div className="flex items-center gap-2">
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
          className={`text-sm truncate ${!read ? "text-black dark:text-white font-semibold" : "text-gray-600 dark:text-neutral-500"}`}
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
            <StarIcon size={16} />
            Star
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
  } = useEmailContext();

  const handleEmailClick = (email: EmailData) => {
    setSelectedEmail(email);
  };

  const handleStarEmail = (_id: string) => {
    // Implementar lógica para favoritar
  };

  const handleArchiveEmail = (_id: string) => {
    // Implementar lógica para arquivar
  };

  const handleDeleteEmail = (_id: string) => {
    // Implementar lógica para excluir
  };

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
          {mockEmails.map((email) => (
            <EmailItem
              key={email.id}
              {...email}
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
