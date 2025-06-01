"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { Switch } from "@heroui/switch";
import { Accordion, AccordionItem } from "@heroui/accordion";
import {
  PaperclipIcon,
  MicIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  FolderIcon,
  SparklesIcon,
  HeartIcon,
  AlertTriangleIcon,
  TagIcon,
  ReplyIcon,
  LinkIcon,
  CopyIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ZapIcon,
  BrainIcon,
  SettingsIcon,
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
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

interface AIFeatureSettings {
  emailSummarization: boolean;
  smartCategorization: boolean;
  priorityDetection: boolean;
  sentimentAnalysis: boolean;
  smartReplies: boolean;
  threadAnalysis: boolean;
  duplicateDetection: boolean;
  scheduleOptimization: boolean;
}

interface AIProcessingTask {
  id: string;
  name: string;
  status: "idle" | "processing" | "completed" | "error";
  progress: number;
  result?: any;
  error?: string;
  startTime?: number;
  endTime?: number;
}

interface AIFeatureResult {
  type: string;
  title: string;
  description: string;
  data: any;
  timestamp: string;
  canUndo: boolean;
}

const AiPanel: React.FC<AiPanelProps> = ({ onClose: _onClose }) => {
  const [aiInput, setAiInput] = useState("");
  const [organizationSummary, setOrganizationSummary] =
    useState<OrganizationSummary | null>(null);
  const [organizationStartTime, setOrganizationStartTime] = useState<
    number | null
  >(null);

  // Enhanced AI Features State
  const [activeView, setActiveView] = useState<
    "default" | "features" | "settings"
  >("default");
  const [aiFeatureSettings, setAiFeatureSettings] = useState<AIFeatureSettings>(
    {
      emailSummarization: true,
      smartCategorization: true,
      priorityDetection: true,
      sentimentAnalysis: false,
      smartReplies: true,
      threadAnalysis: false,
      duplicateDetection: true,
      scheduleOptimization: false,
    }
  );
  const [processingTasks, setProcessingTasks] = useState<AIProcessingTask[]>(
    []
  );
  const [featureResults, setFeatureResults] = useState<AIFeatureResult[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "quick-actions",
  ]);

  const {
    organizeInbox,
    resetInboxOrganization,
    isInboxOrganized,
    organizationProgress,
  } = useEmailContext();

  // Helper functions for AI features
  const createTask = (name: string): AIProcessingTask => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    status: "idle",
    progress: 0,
    startTime: Date.now(),
  });

  const updateTask = (taskId: string, updates: Partial<AIProcessingTask>) => {
    setProcessingTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const simulateAIProcessing = async (
    task: AIProcessingTask,
    duration: number = 3000
  ) => {
    updateTask(task.id, { status: "processing", progress: 0 });

    const steps = 20;
    const stepDuration = duration / steps;

    for (let i = 1; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDuration));
      updateTask(task.id, { progress: (i / steps) * 100 });
    }

    updateTask(task.id, {
      status: "completed",
      progress: 100,
      endTime: Date.now(),
    });
  };

  const addFeatureResult = (result: Omit<AIFeatureResult, "timestamp">) => {
    const newResult: AIFeatureResult = {
      ...result,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setFeatureResults((prev) => [newResult, ...prev.slice(0, 4)]); // Keep last 5 results
  };

  const toggleFeatureSetting = (feature: keyof AIFeatureSettings) => {
    setAiFeatureSettings((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((key) => key !== sectionKey)
        : [...prev, sectionKey]
    );
  };

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

  const handleDoneOrganization = () => {
    // Clear the organization summary to return to default interface
    // but keep the inbox organized state
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

  // Enhanced AI Feature Handlers
  const handleEmailSummarization = async () => {
    if (!aiFeatureSettings.emailSummarization) return;

    const task = createTask("Email Summarization");
    setProcessingTasks((prev) => [...prev, task]);

    try {
      await simulateAIProcessing(task, 2500);
      addFeatureResult({
        type: "summarization",
        title: "Email Summaries Generated",
        description: "Created summaries for 15 emails in your inbox",
        data: { emailsProcessed: 15, averageLength: "2 sentences" },
        canUndo: true,
      });
    } catch (error) {
      updateTask(task.id, {
        status: "error",
        error: "Failed to generate summaries",
      });
    }
  };

  const handlePriorityDetection = async () => {
    if (!aiFeatureSettings.priorityDetection) return;

    const task = createTask("Priority Detection");
    setProcessingTasks((prev) => [...prev, task]);

    try {
      await simulateAIProcessing(task, 2000);
      addFeatureResult({
        type: "priority",
        title: "Priority Emails Detected",
        description: "Found 3 high-priority and 7 medium-priority emails",
        data: { high: 3, medium: 7, low: 12 },
        canUndo: true,
      });
    } catch (error) {
      updateTask(task.id, {
        status: "error",
        error: "Failed to detect priorities",
      });
    }
  };

  const handleSentimentAnalysis = async () => {
    if (!aiFeatureSettings.sentimentAnalysis) return;

    const task = createTask("Sentiment Analysis");
    setProcessingTasks((prev) => [...prev, task]);

    try {
      await simulateAIProcessing(task, 3000);
      addFeatureResult({
        type: "sentiment",
        title: "Sentiment Analysis Complete",
        description: "Analyzed emotional tone of 22 emails",
        data: { positive: 12, neutral: 8, negative: 2 },
        canUndo: false,
      });
    } catch (error) {
      updateTask(task.id, {
        status: "error",
        error: "Failed to analyze sentiment",
      });
    }
  };

  const handleDuplicateDetection = async () => {
    if (!aiFeatureSettings.duplicateDetection) return;

    const task = createTask("Duplicate Detection");
    setProcessingTasks((prev) => [...prev, task]);

    try {
      await simulateAIProcessing(task, 1800);
      addFeatureResult({
        type: "duplicates",
        title: "Duplicate Emails Found",
        description: "Detected 4 duplicate emails ready for cleanup",
        data: { duplicatesFound: 4, spaceToSave: "2.3 MB" },
        canUndo: true,
      });
    } catch (error) {
      updateTask(task.id, {
        status: "error",
        error: "Failed to detect duplicates",
      });
    }
  };

  const handleSmartReplies = async () => {
    if (!aiFeatureSettings.smartReplies) return;

    const task = createTask("Smart Reply Generation");
    setProcessingTasks((prev) => [...prev, task]);

    try {
      await simulateAIProcessing(task, 2200);
      addFeatureResult({
        type: "replies",
        title: "Smart Replies Generated",
        description: "Created reply suggestions for 8 emails",
        data: { emailsWithReplies: 8, averageSuggestions: 3 },
        canUndo: false,
      });
    } catch (error) {
      updateTask(task.id, {
        status: "error",
        error: "Failed to generate replies",
      });
    }
  };

  const handleUndoAction = (resultIndex: number) => {
    const result = featureResults[resultIndex];
    if (result.canUndo) {
      setFeatureResults((prev) =>
        prev.filter((_, index) => index !== resultIndex)
      );
      // Here you would implement the actual undo logic
      console.log(`Undoing action: ${result.title}`);
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
                        className={`text-xs px-2 py-1 rounded-full ${colorClasses.bg} ${colorClasses.text}`}
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
              onClick={handleDoneOrganization}
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

  // Render enhanced features interface
  const renderFeaturesInterface = () => (
    <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
            size="sm"
            variant="light"
            onPress={() => setActiveView("default")}
          >
            <ChevronDownIcon size={18} />
          </Button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Features
          </h3>
        </div>
        <Button
          isIconOnly
          className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
          size="sm"
          variant="light"
          onPress={() => setActiveView("settings")}
        >
          <SettingsIcon size={18} />
        </Button>
      </div>

      {/* Active Tasks */}
      {processingTasks.filter((task) => task.status === "processing").length >
        0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-3">
            Processing
          </h4>
          <div className="space-y-3">
            {processingTasks
              .filter((task) => task.status === "processing")
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {task.name}
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {Math.round(task.progress)}%
                    </span>
                  </div>
                  <Progress
                    value={task.progress}
                    className="h-1"
                    color="primary"
                    size="sm"
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Results */}
      {featureResults.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-3">
            Recent Results
          </h4>
          <div className="space-y-3">
            {featureResults.map((result, index) => (
              <div
                key={index}
                className="bg-green-50 dark:bg-green-950/40 rounded-lg p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircleIcon
                        className="text-green-600 dark:text-green-400"
                        size={14}
                      />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        {result.title}
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        {result.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {result.description}
                    </p>
                  </div>
                  {result.canUndo && (
                    <Button
                      isIconOnly
                      className="text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200"
                      size="sm"
                      variant="light"
                      onPress={() => handleUndoAction(index)}
                    >
                      <RotateCcwIcon size={14} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Features Grid */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-neutral-300">
          Available Features
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 h-auto p-4 flex-col gap-2"
            isDisabled={
              !aiFeatureSettings.emailSummarization ||
              processingTasks.some(
                (t) =>
                  t.name === "Email Summarization" && t.status === "processing"
              )
            }
            radius="lg"
            variant="flat"
            onPress={handleEmailSummarization}
          >
            <ZapIcon size={20} />
            <span className="text-xs font-medium">Summarize Emails</span>
          </Button>

          <Button
            className="bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all duration-200 h-auto p-4 flex-col gap-2"
            isDisabled={
              !aiFeatureSettings.priorityDetection ||
              processingTasks.some(
                (t) =>
                  t.name === "Priority Detection" && t.status === "processing"
              )
            }
            radius="lg"
            variant="flat"
            onPress={handlePriorityDetection}
          >
            <AlertTriangleIcon size={20} />
            <span className="text-xs font-medium">Detect Priority</span>
          </Button>

          <Button
            className="bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-all duration-200 h-auto p-4 flex-col gap-2"
            isDisabled={
              !aiFeatureSettings.sentimentAnalysis ||
              processingTasks.some(
                (t) =>
                  t.name === "Sentiment Analysis" && t.status === "processing"
              )
            }
            radius="lg"
            variant="flat"
            onPress={handleSentimentAnalysis}
          >
            <HeartIcon size={20} />
            <span className="text-xs font-medium">Analyze Sentiment</span>
          </Button>

          <Button
            className="bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-200 h-auto p-4 flex-col gap-2"
            isDisabled={
              !aiFeatureSettings.duplicateDetection ||
              processingTasks.some(
                (t) =>
                  t.name === "Duplicate Detection" && t.status === "processing"
              )
            }
            radius="lg"
            variant="flat"
            onPress={handleDuplicateDetection}
          >
            <CopyIcon size={20} />
            <span className="text-xs font-medium">Find Duplicates</span>
          </Button>

          <Button
            className="bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200 h-auto p-4 flex-col gap-2"
            isDisabled={
              !aiFeatureSettings.smartReplies ||
              processingTasks.some(
                (t) =>
                  t.name === "Smart Reply Generation" &&
                  t.status === "processing"
              )
            }
            radius="lg"
            variant="flat"
            onPress={handleSmartReplies}
          >
            <ReplyIcon size={20} />
            <span className="text-xs font-medium">Smart Replies</span>
          </Button>

          <Button
            className="bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-all duration-200 h-auto p-4 flex-col gap-2"
            isDisabled={!aiFeatureSettings.threadAnalysis}
            radius="lg"
            variant="flat"
          >
            <LinkIcon size={20} />
            <span className="text-xs font-medium">Thread Analysis</span>
          </Button>
        </div>
      </div>
    </div>
  );

  // Render settings interface
  const renderSettingsInterface = () => (
    <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          isIconOnly
          className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
          size="sm"
          variant="light"
          onPress={() => setActiveView("features")}
        >
          <ChevronDownIcon size={18} />
        </Button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Settings
        </h3>
      </div>

      {/* Feature Toggles */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-neutral-300">
          Enable Features
        </h4>

        <div className="space-y-3">
          {Object.entries(aiFeatureSettings).map(([key, enabled]) => {
            const featureNames: Record<string, string> = {
              emailSummarization: "Email Summarization",
              smartCategorization: "Smart Categorization",
              priorityDetection: "Priority Detection",
              sentimentAnalysis: "Sentiment Analysis",
              smartReplies: "Smart Replies",
              threadAnalysis: "Thread Analysis",
              duplicateDetection: "Duplicate Detection",
              scheduleOptimization: "Schedule Optimization",
            };

            return (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg"
              >
                <span className="text-sm text-gray-700 dark:text-neutral-300">
                  {featureNames[key]}
                </span>
                <Switch
                  isSelected={enabled}
                  size="sm"
                  onValueChange={() =>
                    toggleFeatureSetting(key as keyof AIFeatureSettings)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
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
          <div className="bg-green-50 dark:bg-green-950/40 rounded-lg p-3 mb-4 w-full">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircleIcon size={16} />
              <span className="text-sm font-medium">Inbox Organized</span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Your emails have been categorized and organized
            </p>
          </div>
        )}

        {/* Enhanced Features Access */}
        <div className="flex gap-3 w-full justify-center mb-4">
          <Button
            className="bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 flex-1 max-w-[200px] font-medium py-3 px-4 min-h-[50px] transition-all duration-200"
            radius="lg"
            size="md"
            startContent={<BrainIcon size={18} />}
            variant="flat"
            onPress={() => setActiveView("features")}
          >
            <span className="text-sm">AI Features</span>
          </Button>
        </div>

        {/* First row - two buttons */}
        <div className="flex gap-3 w-full justify-center">
          <Button
            className={`${
              isInboxOrganized
                ? "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50"
                : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
            } flex-1 max-w-[150px] font-medium py-3 px-4 min-h-[50px] transition-all duration-200`}
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
            className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex-1 max-w-[150px] font-medium py-3 px-4 min-h-[50px] transition-all duration-200"
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
            className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 max-w-[150px] font-medium py-3 px-4 min-h-[50px] transition-all duration-200"
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
        : activeView === "features"
          ? renderFeaturesInterface()
          : activeView === "settings"
            ? renderSettingsInterface()
            : renderDefaultInterface()}
    </div>
  );
};

export default AiPanel;
