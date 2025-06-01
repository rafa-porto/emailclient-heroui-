"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Progress } from "@heroui/progress";
import {
  PaperclipIcon,
  MicIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  FolderIcon,
} from "lucide-react";
import { AIIcon } from "@/components/icons";
import { useEmailContext } from "@/components/email-context";
import {
  EMAIL_CATEGORIES,
  getCategoryColorClasses,
} from "@/utils/emailClassification";
import { EmailCategory } from "@/types";

interface AiPanelProps {
  onClose: () => void;
}

interface OrganizationSummary {
  totalProcessed: number;
  categoryCounts: Record<EmailCategory, number>;
  uncategorizedCount: number;
  completionTime: string;
  processingDuration: number;
  totalCategoriesUsed: number;
}

const AiPanel: React.FC<AiPanelProps> = ({ onClose: _onClose }) => {
  const [aiInput, setAiInput] = useState("");
  const [organizationSummary, setOrganizationSummary] =
    useState<OrganizationSummary | null>(null);
  const [organizationStartTime, setOrganizationStartTime] = useState<
    number | null
  >(null);

  const {
    organizeInbox,
    resetInboxOrganization,
    isInboxOrganized,
    organizationProgress,
  } = useEmailContext();

  // Track organization completion and generate summary
  useEffect(() => {
    // Start timing when organization begins
    if (organizationProgress.isOrganizing && !organizationStartTime) {
      setOrganizationStartTime(Date.now());
    }

    // Generate summary when organization completes
    if (
      !organizationProgress.isOrganizing &&
      organizationProgress.progress === 100 &&
      organizationStartTime &&
      !organizationSummary
    ) {
      const completionTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const processingDuration = Math.round(
        (Date.now() - organizationStartTime) / 1000
      );

      const categoryCounts = organizationProgress.categoryCounts;
      const totalCategorized = Object.values(categoryCounts).reduce(
        (sum, count) => sum + count,
        0
      );
      const uncategorizedCount = Math.max(
        0,
        organizationProgress.totalEmails - totalCategorized
      );
      const totalCategoriesUsed = Object.values(categoryCounts).filter(
        (count) => count > 0
      ).length;

      setOrganizationSummary({
        totalProcessed: organizationProgress.totalEmails,
        categoryCounts,
        uncategorizedCount,
        completionTime,
        processingDuration,
        totalCategoriesUsed,
      });
    }
  }, [organizationProgress, organizationStartTime, organizationSummary]);

  const handleSendMessage = () => {
    if (aiInput.trim()) {
      // Handle AI message logic
      setAiInput("");
    }
  };

  const handleOrganizeInbox = async () => {
    if (organizationProgress.isOrganizing) return;
    setOrganizationSummary(null); // Clear previous summary
    setOrganizationStartTime(null); // Reset start time
    await organizeInbox();
  };

  const handleResetOrganization = () => {
    resetInboxOrganization();
    setOrganizationSummary(null);
    setOrganizationStartTime(null);
  };

  const handleQuickAction = (action: string) => {
    if (action === "Organize my inbox") {
      handleOrganizeInbox();
    } else {
      setAiInput(action);
    }
  };

  // Render comprehensive organization summary
  const renderOrganizationSummary = () => {
    if (!organizationSummary) return null;

    const categoriesWithEmails = Object.entries(
      organizationSummary.categoryCounts
    )
      .filter(([_, count]) => count > 0)
      .sort(([, a], [, b]) => b - a); // Sort by count descending

    return (
      <div className="w-full max-w-md space-y-4">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-green-100 dark:bg-green-950/40 p-3 rounded-full">
              <CheckCircleIcon
                className="text-green-600 dark:text-green-400"
                size={24}
              />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Successfully Organized Your Inbox!
          </h4>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Found{" "}
            {categoriesWithEmails.length > 0 && (
              <>
                {categoriesWithEmails.map(([category, count], index) => (
                  <span key={category}>
                    {count}{" "}
                    {EMAIL_CATEGORIES[
                      category as EmailCategory
                    ]?.name.toLowerCase()}
                    {index < categoriesWithEmails.length - 1 &&
                      (index === categoriesWithEmails.length - 2
                        ? " and "
                        : ", ")}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>

        {/* Before/After Summary */}
        <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUpIcon
              className="text-blue-600 dark:text-blue-400"
              size={16}
            />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Organization Summary
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-neutral-400">
                Before:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {organizationSummary.totalProcessed} emails in inbox
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-neutral-400">
                After:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {organizationSummary.totalProcessed -
                  organizationSummary.uncategorizedCount}{" "}
                emails organized into {organizationSummary.totalCategoriesUsed}{" "}
                categories
              </span>
            </div>
            {organizationSummary.uncategorizedCount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-neutral-400">
                  Uncategorized:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {organizationSummary.uncategorizedCount} emails
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        {categoriesWithEmails.length > 0 && (
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FolderIcon
                className="text-gray-600 dark:text-neutral-400"
                size={16}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                Category Breakdown
              </span>
            </div>
            <div className="space-y-2">
              {categoriesWithEmails.map(([category, count]) => {
                const categoryInfo =
                  EMAIL_CATEGORIES[category as EmailCategory];
                const colorClasses = getCategoryColorClasses(
                  category as EmailCategory
                );

                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-2 rounded-md bg-white dark:bg-neutral-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{categoryInfo?.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                        {categoryInfo?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${colorClasses.bg} ${colorClasses.text} ${colorClasses.border} border`}
                      >
                        {count} email{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Processing Details */}
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-gray-600 dark:text-neutral-400">
              <ClockIcon size={12} />
              <span>Completed at {organizationSummary.completionTime}</span>
            </div>
            <span className="text-gray-600 dark:text-neutral-400">
              {organizationSummary.processingDuration}s processing time
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleAttachmentClick = () => {
    // Implementar lógica de anexo
  };

  const handleMicrophoneClick = () => {
    // Implementar lógica de gravação de áudio
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render organization interface when organizing
  const renderOrganizationInterface = () => (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 overflow-y-auto min-h-0">
      {/* AI Icon with animation */}
      <div className="mb-6">
        <div
          className={`${organizationProgress.isOrganizing ? "animate-pulse" : ""}`}
        >
          <AIIcon size={32} className="text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Show comprehensive summary if completed, otherwise show progress */}
      {!organizationProgress.isOrganizing && organizationSummary ? (
        <>
          {/* Comprehensive Organization Summary */}
          {renderOrganizationSummary()}

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-md justify-center mt-6">
            <Button
              className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
              radius="lg"
              size="sm"
              startContent={<RotateCcwIcon size={16} />}
              variant="flat"
              onClick={handleResetOrganization}
            >
              Reset
            </Button>
            <Button
              className="bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
              radius="lg"
              size="sm"
              startContent={<CheckCircleIcon size={16} />}
              variant="flat"
            >
              Done
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Organization Progress */}
          <div className="text-center mb-8 w-full max-w-md">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {organizationProgress.isOrganizing
                ? "Organizing Your Inbox"
                : "Organization Complete!"}
            </h4>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mb-6">
              {organizationProgress.currentStep ||
                "Your emails have been organized by category"}
            </p>

            {/* Progress Bar */}
            <Progress
              value={organizationProgress.progress}
              className="mb-4"
              color="primary"
              size="sm"
            />

            {/* Progress Text */}
            <div className="text-xs text-gray-400 dark:text-neutral-500 mb-6">
              {organizationProgress.isOrganizing
                ? `${organizationProgress.totalProcessed} of ${organizationProgress.totalEmails} emails processed`
                : `${organizationProgress.totalEmails} emails organized`}
            </div>

            {/* Category Counts During Processing */}
            {Object.keys(organizationProgress.categoryCounts).length > 0 && (
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 mb-6">
                <h5 className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-3">
                  Categories Found:
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(organizationProgress.categoryCounts)
                    .filter(([_, count]) => count > 0)
                    .map(([category, count]) => (
                      <div
                        key={category}
                        className="flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1">
                          <span>
                            {
                              EMAIL_CATEGORIES[
                                category as keyof typeof EMAIL_CATEGORIES
                              ]?.icon
                            }
                          </span>
                          <span className="text-gray-600 dark:text-neutral-400">
                            {
                              EMAIL_CATEGORIES[
                                category as keyof typeof EMAIL_CATEGORIES
                              ]?.name
                            }
                          </span>
                        </span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  // Render default interface
  const renderDefaultInterface = () => (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 overflow-y-auto min-h-0">
      {/* AI Icon */}
      <div className="mb-8">
        <AIIcon size={32} className="text-blue-600 dark:text-blue-400" />
      </div>

      {/* Main Question */}
      <div className="text-center mb-12">
        <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
          How can I help you today?
        </h4>
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Find, write, schedule, organize, ask anything...
        </p>
      </div>

      {/* Input Field */}
      <div className="w-full max-w-lg mb-8">
        <div className="relative">
          <Textarea
            classNames={{
              base: "min-h-[100px]",
              input: "text-base px-4 py-2 resize-none",
              inputWrapper:
                "min-h-[100px] bg-gray-100 dark:bg-neutral-800 border-0 shadow-sm py-3",
              mainWrapper: "min-h-[100px]",
            }}
            endContent={
              <div className="flex items-end justify-center w-8 h-8 mr-1 mb-2">
                <button
                  className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full"
                  type="button"
                  onClick={handleMicrophoneClick}
                >
                  <MicIcon
                    className="text-gray-400 dark:text-neutral-500"
                    size={16}
                  />
                </button>
              </div>
            }
            maxRows={8}
            minRows={3}
            placeholder="Type your message..."
            radius="lg"
            startContent={
              <div className="flex items-start justify-center w-8 h-8 ml-1 mt-2">
                <button
                  className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full"
                  type="button"
                  onClick={handleAttachmentClick}
                >
                  <PaperclipIcon
                    className="text-gray-400 dark:text-neutral-500"
                    size={16}
                  />
                </button>
              </div>
            }
            value={aiInput}
            variant="flat"
            onChange={(e) => setAiInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4 w-full max-w-md items-center">
        {/* Organization Status */}
        {isInboxOrganized && (
          <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-700/40 rounded-lg p-3 mb-4 w-full">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircleIcon size={16} />
              <span className="text-sm font-medium">Inbox Organized</span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Your emails have been categorized and organized
            </p>
          </div>
        )}

        {/* First row - two buttons */}
        <div className="flex gap-3 w-full justify-center">
          <Button
            className={`${
              isInboxOrganized
                ? "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200/60 dark:border-green-700/40"
                : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40"
            } flex-1 max-w-[150px] font-medium shadow-sm py-3 px-4 min-h-[50px]`}
            radius="lg"
            size="md"
            variant="flat"
            isDisabled={organizationProgress.isOrganizing}
            onClick={() => handleQuickAction("Organize my inbox")}
          >
            <span className="text-sm">
              {isInboxOrganized ? "Re-organize" : "Organize my inbox"}
            </span>
          </Button>

          <Button
            className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40 flex-1 max-w-[150px] font-medium shadow-sm py-3 px-4 min-h-[50px]"
            radius="lg"
            size="md"
            variant="flat"
            onClick={() => handleQuickAction("Find urgent emails")}
          >
            <span className="text-sm">Find urgent emails</span>
          </Button>
        </div>

        {/* Second row - one button */}
        <div className="flex justify-center">
          <Button
            className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40 max-w-[150px] font-medium shadow-sm py-3 px-4 min-h-[50px]"
            radius="lg"
            size="md"
            variant="flat"
            onClick={() => handleQuickAction("Plan my day")}
          >
            <span className="text-sm">Plan my day</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Content */}
      {organizationProgress.isOrganizing ||
      (organizationProgress.progress > 0 &&
        organizationProgress.progress < 100) ||
      organizationSummary
        ? renderOrganizationInterface()
        : renderDefaultInterface()}
    </div>
  );
};

export default AiPanel;
