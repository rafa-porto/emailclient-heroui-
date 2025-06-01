"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { MonitorIcon, SmartphoneIcon, CheckIcon } from "lucide-react";

export default function SettingsPage() {
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

  const renderEmailSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Email Behavior
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Auto Reply
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Automatically reply to emails when away
              </p>
            </div>
            <Switch
              isSelected={settings.autoReply}
              onValueChange={(value) => updateSetting("autoReply", value)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Show Images
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Automatically load images in emails
              </p>
            </div>
            <Switch
              isSelected={settings.showImages}
              onValueChange={(value) => updateSetting("showImages", value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Mark as Read Delay: {settings.markAsReadDelay}s
            </label>
            <Slider
              size="sm"
              step={1}
              minValue={0}
              maxValue={10}
              value={[settings.markAsReadDelay]}
              onChange={(value) =>
                updateSetting(
                  "markAsReadDelay",
                  Array.isArray(value) ? value[0] : value
                )
              }
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Email Signature
        </h3>
        <Input
          label="Signature"
          placeholder="Your email signature"
          value={settings.signature}
          onChange={(e) => updateSetting("signature", e.target.value)}
          classNames={{
            input: "text-sm",
            inputWrapper: "bg-gray-50 dark:bg-neutral-800/50",
          }}
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "general":
      case "profile": // Backward compatibility
        return renderProfileSection();
      case "privacy":
        return renderPrivacySection();
      case "appearance":
        return renderAppearanceSection();
      case "email-preferences":
      case "email": // Backward compatibility
        return renderEmailSection();
      default:
        return renderProfileSection();
    }
  };

  return (
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

      {/* Save Button */}
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
    </div>
  );
}
