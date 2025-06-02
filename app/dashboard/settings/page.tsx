"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import {
  MonitorIcon,
  SmartphoneIcon,
  CheckIcon,
  MailIcon,
  Trash2Icon,
  AlertTriangleIcon,
} from "lucide-react";

import { GmailIcon, OutlookIcon, AppleIcon } from "@/components/icons";

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      // Handle backward compatibility: map "profile" to "general"
      setActiveSection(section === "profile" ? "general" : section);
    }
  }, [searchParams]);

  // Get provider email from URL params (set by login)
  const providerParam = searchParams.get("provider");
  const getProviderEmail = () => {
    if (providerParam === "gmail") return "user@gmail.com";
    if (providerParam === "outlook" || providerParam === "microsoft")
      return "user@outlook.com";
    if (providerParam === "apple") return "user@icloud.com";
    return "user@example.com";
  };

  const [settings, setSettings] = useState({
    // General settings
    language: "en",
    timezone: "America/New_York",

    // Privacy settings
    displayExternalImages: false,

    // Appearance settings
    theme: "system",
    compactMode: false,
    animationsEnabled: true,
    fontSize: 14,

    // Email settings
    autoReply: false,
    signature: "",
    markAsReadDelay: 2,
    showImages: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          General Settings
        </h3>
        <div className="grid gap-4">
          <Select
            label="Language"
            selectedKeys={[settings.language]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              updateSetting("language", value);
            }}
            classNames={{
              trigger: "bg-gray-50 dark:bg-neutral-800/50",
            }}
          >
            <SelectItem key="en">English</SelectItem>
            <SelectItem key="es">Español</SelectItem>
            <SelectItem key="fr">Français</SelectItem>
            <SelectItem key="de">Deutsch</SelectItem>
            <SelectItem key="it">Italiano</SelectItem>
            <SelectItem key="pt">Português</SelectItem>
            <SelectItem key="ja">日本語</SelectItem>
            <SelectItem key="ko">한국어</SelectItem>
            <SelectItem key="zh">中文</SelectItem>
          </Select>

          <Select
            label="Timezone"
            selectedKeys={[settings.timezone]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              updateSetting("timezone", value);
            }}
            classNames={{
              trigger: "bg-gray-50 dark:bg-neutral-800/50",
            }}
          >
            <SelectItem key="America/New_York">Eastern Time (UTC-5)</SelectItem>
            <SelectItem key="America/Chicago">Central Time (UTC-6)</SelectItem>
            <SelectItem key="America/Denver">Mountain Time (UTC-7)</SelectItem>
            <SelectItem key="America/Los_Angeles">
              Pacific Time (UTC-8)
            </SelectItem>
            <SelectItem key="Europe/London">London (UTC+0)</SelectItem>
            <SelectItem key="Europe/Paris">Paris (UTC+1)</SelectItem>
            <SelectItem key="Europe/Berlin">Berlin (UTC+1)</SelectItem>
            <SelectItem key="Europe/Rome">Rome (UTC+1)</SelectItem>
            <SelectItem key="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
            <SelectItem key="Asia/Seoul">Seoul (UTC+9)</SelectItem>
            <SelectItem key="Asia/Shanghai">Shanghai (UTC+8)</SelectItem>
            <SelectItem key="Australia/Sydney">Sydney (UTC+10)</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Privacy Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Display External Images
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Allow emails to display images from external sources.
              </p>
            </div>
            <Switch
              isSelected={settings.displayExternalImages}
              onValueChange={(value) =>
                updateSetting("displayExternalImages", value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Theme & Display
        </h3>
        <div className="space-y-4">
          <div>
            <Select
              label="Theme"
              selectedKeys={[settings.theme]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                updateSetting("theme", value);
              }}
              classNames={{
                trigger: "bg-gray-50 dark:bg-neutral-800/50",
              }}
            >
              <SelectItem key="light" startContent={<MonitorIcon size={16} />}>
                Light
              </SelectItem>
              <SelectItem key="dark" startContent={<MonitorIcon size={16} />}>
                Dark
              </SelectItem>
              <SelectItem
                key="system"
                startContent={<SmartphoneIcon size={16} />}
              >
                System
              </SelectItem>
            </Select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Compact Mode
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Use compact layout to show more content
              </p>
            </div>
            <Switch
              isSelected={settings.compactMode}
              onValueChange={(value) => updateSetting("compactMode", value)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Animations
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Enable smooth animations and transitions
              </p>
            </div>
            <Switch
              isSelected={settings.animationsEnabled}
              onValueChange={(value) =>
                updateSetting("animationsEnabled", value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Font Size: {settings.fontSize}px
            </label>
            <Slider
              size="sm"
              step={1}
              minValue={12}
              maxValue={18}
              value={[settings.fontSize]}
              onChange={(value) =>
                updateSetting(
                  "fontSize",
                  Array.isArray(value) ? value[0] : value
                )
              }
              className="max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnectionsSection = () => {
    // Get connected email accounts based on login provider
    const connectedAccounts = [
      {
        id: "1",
        provider: providerParam || "gmail",
        email: getProviderEmail(),
        status: "connected",
        lastSync: "2 minutes ago",
      },
    ];

    const getProviderIcon = (provider: string) => {
      switch (provider) {
        case "gmail":
          return <GmailIcon className="h-6 w-6" />;
        case "outlook":
        case "microsoft":
          return <OutlookIcon className="h-6 w-6" />;
        case "apple":
          return <AppleIcon className="h-6 w-6" />;
        default:
          return <MailIcon size={24} />;
      }
    };

    const getProviderName = (provider: string) => {
      switch (provider) {
        case "gmail":
          return "Gmail";
        case "outlook":
        case "microsoft":
          return "Outlook";
        case "apple":
          return "iCloud";
        default:
          return "Email";
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Connected Email Accounts
          </h3>
          <div className="space-y-3">
            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center">
                    {getProviderIcon(account.provider)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getProviderName(account.provider)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                      {account.email}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-neutral-500">
                      Last sync: {account.lastSync}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Account
          </h3>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mb-4">
            Connect additional email accounts to manage all your emails in one
            place.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            startContent={<MailIcon size={16} />}
            onPress={() => {
              // Navigate to login page to add new account
              window.location.href = "/login";
            }}
          >
            Add Email Account
          </Button>
        </div>
      </div>
    );
  };

  const renderDeleteAccountSection = () => {
    const handleDeleteAccount = () => {
      // Show confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data, emails, and settings."
      );

      if (confirmed) {
        // Additional confirmation
        const doubleConfirmed = window.confirm(
          "This is your final warning. Deleting your account will:\n\n• Permanently delete all your emails\n• Remove all your settings and preferences\n• Cancel any active subscriptions\n• Delete your account data\n\nType 'DELETE' to confirm:"
        );

        if (doubleConfirmed) {
          // Here you would typically call an API to delete the account
          alert(
            "Account deletion initiated. You will be redirected to the login page."
          );
          // Redirect to login or home page
          window.location.href = "/";
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                Danger Zone
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Delete Your Account
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-4 border border-gray-200 dark:border-neutral-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                What happens when you delete your account:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1">
                <li>
                  • All your emails and attachments will be permanently deleted
                </li>
                <li>• Your account settings and preferences will be removed</li>
                <li>• Connected email accounts will be disconnected</li>
                <li>• Any active subscriptions will be cancelled</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>

            <div className="pt-4">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
                startContent={<Trash2Icon size={16} />}
                onPress={handleDeleteAccount}
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "general":
      case "profile": // Backward compatibility
        return renderProfileSection();
      case "privacy":
        return renderPrivacySection();
      case "appearance":
        return renderAppearanceSection();
      case "connections":
        return renderConnectionsSection();
      case "delete-account":
        return renderDeleteAccountSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <Suspense fallback={null}>
      <div className="h-full w-full bg-gray-50 dark:bg-neutral-900 p-3 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Settings
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm">
          {renderSectionContent()}
        </div>

        {/* Save Button - Only show for sections that need saving */}
        {activeSection !== "connections" &&
          activeSection !== "delete-account" && (
            <div className="mt-3 flex justify-end">
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  color="default"
                  size="sm"
                  className="bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600"
                >
                  Reset to Defaults
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  startContent={<CheckIcon size={14} />}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
      </div>
    </Suspense>
  );
};

export default SettingsPage;
