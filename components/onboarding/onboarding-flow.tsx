"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XIcon,
  CheckIcon,
  MailIcon,
  ZapIcon,
  AlertTriangleIcon,
  HeartIcon,
  TagIcon,
  ReplyIcon,
  FolderIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  BrainIcon,
} from "lucide-react";

import { AIIcon } from "@/components/icons";

// Types for onboarding steps
interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  interactive?: boolean;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  // Onboarding steps configuration
  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to HeroMail",
      description: "Your AI-powered email experience starts here",
      icon: <MailIcon className="text-blue-600 dark:text-blue-400" size={32} />,
      content: (
        <div className="text-center space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-6 rounded-xl">
            <MailIcon
              className="text-blue-600 dark:text-blue-400 mx-auto mb-4"
              size={48}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to the Future of Email
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              Discover how AI-powered features can transform your email workflow
              and boost your productivity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
              <ZapIcon
                className="text-yellow-600 dark:text-yellow-400 mb-2"
                size={24}
              />
              <p className="text-sm text-gray-700 dark:text-neutral-300">
                Smart AI Features
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
              <FolderIcon
                className="text-green-600 dark:text-green-400 mb-2"
                size={24}
              />
              <p className="text-sm text-gray-700 dark:text-neutral-300">
                Organized Inbox
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ai-features",
      title: "AI-Powered Intelligence",
      description: "Discover smart features that work for you",
      icon: (
        <AIIcon className="text-purple-600 dark:text-purple-400" size={32} />
      ),
      interactive: true,
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <AIIcon
              className="text-purple-600 dark:text-purple-400 mx-auto mb-3"
              size={40}
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI Features at Your Fingertips
            </h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Explore the intelligent features that make email management
              effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer">
              <ZapIcon
                className="text-blue-600 dark:text-blue-400 mb-2"
                size={20}
              />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                Smart Summarization
              </h4>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Get instant summaries of long emails and threads.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/40 p-3 rounded-lg transition-all duration-200 hover:bg-orange-100 dark:hover:bg-orange-900/50 cursor-pointer">
              <AlertTriangleIcon
                className="text-orange-600 dark:text-orange-400 mb-2"
                size={20}
              />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                Priority Detection
              </h4>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Automatically identify urgent emails.
              </p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-950/40 p-3 rounded-lg transition-all duration-200 hover:bg-pink-100 dark:hover:bg-pink-900/50 cursor-pointer">
              <HeartIcon
                className="text-pink-600 dark:text-pink-400 mb-2"
                size={20}
              />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                Sentiment Analysis
              </h4>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Understand the emotional tone of emails.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/40 p-3 rounded-lg transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/50 cursor-pointer">
              <ReplyIcon
                className="text-green-600 dark:text-green-400 mb-2"
                size={20}
              />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                Smart Replies
              </h4>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Get contextual reply suggestions.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "inbox-organization",
      title: "Inbox Organization",
      description: "Keep your emails perfectly organized",
      icon: (
        <FolderIcon className="text-teal-600 dark:text-teal-400" size={32} />
      ),
      interactive: true,
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <FolderIcon
              className="text-teal-600 dark:text-teal-400 mx-auto mb-3"
              size={40}
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Smart Organization System
            </h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              AI automatically categorizes your emails for better organization.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <TagIcon
                  className="text-purple-600 dark:text-purple-400"
                  size={18}
                />
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  Auto-Categorization
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-neutral-400 mb-2">
                Emails are automatically sorted into categories like Work,
                Bills, and Promotions.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded">
                  💼 Work
                </span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs rounded">
                  💳 Bills
                </span>
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs rounded">
                  🏷️ Promotions
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <InboxIcon
                  className="text-blue-600 dark:text-blue-400"
                  size={18}
                />
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  Unified Inbox
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Manage all your email accounts in one place with consistent
                organization.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "productivity-features",
      title: "Productivity Tools",
      description: "Discover features that boost your efficiency",
      icon: (
        <SearchIcon
          className="text-indigo-600 dark:text-indigo-400"
          size={32}
        />
      ),
      interactive: true,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <SearchIcon
              className="text-indigo-600 dark:text-indigo-400 mx-auto mb-4"
              size={48}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Powerful Productivity Features
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              Tools designed to make your email workflow faster and more
              efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
              <SearchIcon
                className="text-indigo-600 dark:text-indigo-400 mb-3"
                size={24}
              />
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Intelligent Search
              </h4>
              <p className="text-sm text-gray-600 dark:text-neutral-400 mb-3">
                Find any email instantly with natural language queries and
                advanced filters.
              </p>
              <div className="bg-white dark:bg-neutral-700 p-2 rounded border text-xs text-gray-600 dark:text-neutral-400">
                "emails from John about project deadline"
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
              <StarIcon
                className="text-yellow-600 dark:text-yellow-400 mb-3"
                size={24}
              />
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Quick Actions
              </h4>
              <p className="text-sm text-gray-600 dark:text-neutral-400 mb-3">
                Star, archive, delete, and organize emails with keyboard
                shortcuts.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded">
                  ⌘+S
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded">
                  ⌘+A
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded">
                  ⌘+D
                </span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <BrainIcon
                className="text-blue-600 dark:text-blue-400"
                size={20}
              />
              <span className="font-medium text-gray-900 dark:text-white">
                AI Assistant
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Access the AI panel anytime to organize your inbox, get summaries,
              and manage your emails intelligently.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "customization",
      title: "Personalization",
      description: "Make HeroMail work the way you do",
      icon: (
        <SettingsIcon
          className="text-emerald-600 dark:text-emerald-400"
          size={32}
        />
      ),
      interactive: true,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <SettingsIcon
              className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4"
              size={48}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Customize Your Experience
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              Personalize HeroMail to match your workflow and preferences.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Theme & Appearance
              </h4>
              <div className="flex gap-3">
                <div className="flex-1 bg-white dark:bg-neutral-700 p-3 rounded border text-center">
                  <div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2"></div>
                  <span className="text-xs text-gray-600 dark:text-neutral-400">
                    Light Mode
                  </span>
                </div>
                <div className="flex-1 bg-gray-800 p-3 rounded border text-center">
                  <div className="w-8 h-8 bg-gray-600 rounded mx-auto mb-2"></div>
                  <span className="text-xs text-gray-300">Dark Mode</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                AI Features
              </h4>
              <p className="text-sm text-gray-600 dark:text-neutral-400 mb-3">
                Enable or disable specific AI features based on your needs.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Email Summarization
                  </span>
                  <div className="w-8 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Priority Detection
                  </span>
                  <div className="w-8 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Smart Replies
                  </span>
                  <div className="w-8 h-4 bg-gray-300 dark:bg-neutral-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "complete",
      title: "You're All Set!",
      description: "Ready to experience the future of email",
      icon: (
        <CheckIcon className="text-green-600 dark:text-green-400" size={32} />
      ),
      content: (
        <div className="text-center space-y-6">
          <div className="bg-green-50 dark:bg-green-950/40 p-6 rounded-xl">
            <CheckIcon
              className="text-green-600 dark:text-green-400 mx-auto mb-4"
              size={48}
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to Your New Email Experience
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              You're ready to start using HeroMail's powerful features. Your
              inbox is waiting!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
              <AIIcon
                className="text-purple-600 dark:text-purple-400 mx-auto mb-2"
                size={24}
              />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                AI Features
              </p>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Ready to assist
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
              <FolderIcon
                className="text-teal-600 dark:text-teal-400 mx-auto mb-2"
                size={24}
              />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Organization
              </p>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Auto-categorization active
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg text-center">
              <SearchIcon
                className="text-indigo-600 dark:text-indigo-400 mx-auto mb-2"
                size={24}
              />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Search
              </p>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Intelligent queries enabled
              </p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
              💡 Pro Tip
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Access the AI panel anytime by clicking the brain icon in your
              sidebar to organize emails, get summaries, and more.
            </p>
          </div>
        </div>
      ),
    },
  ];

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setCompletedSteps((prev) => new Set([...prev, currentStep]));
        setIsAnimating(false);
      }, 150);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex !== currentStep) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(stepIndex);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  // Calculate progress
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      classNames={{
        base: "bg-white dark:bg-neutral-900 max-h-[90vh]",
        backdrop: "bg-black/50 backdrop-blur-sm",
        closeButton: "hidden",
      }}
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <ModalContent className="max-h-[90vh]">
        <ModalBody className="p-0">
          <div className="flex flex-col h-full max-h-[85vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-neutral-800/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-950/40 p-2 rounded-lg">
                  {steps[currentStep].icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200"
                size="sm"
                variant="light"
                onPress={handleSkip}
              >
                <XIcon size={18} />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <div className="flex-1">
                  <Progress
                    value={progress}
                    className="h-2"
                    color="primary"
                    size="sm"
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                      completedSteps.has(index)
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : index === currentStep
                          ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-500 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    }`}
                    onClick={() => goToStep(index)}
                  >
                    {completedSteps.has(index) ? (
                      <CheckIcon size={14} />
                    ) : (
                      index + 1
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div
              className={`flex-1 overflow-y-auto p-4 transition-all duration-200 ${isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
            >
              {steps[currentStep].content}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-neutral-800/50 flex-shrink-0">
              <Button
                className="text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200"
                variant="light"
                onPress={handleSkip}
              >
                Skip Tour
              </Button>

              <div className="flex gap-3">
                <Button
                  className="text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200"
                  isDisabled={currentStep === 0}
                  startContent={<ChevronLeftIcon size={16} />}
                  variant="light"
                  onPress={prevStep}
                >
                  Previous
                </Button>

                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                  endContent={
                    currentStep === steps.length - 1 ? (
                      <CheckIcon size={16} />
                    ) : (
                      <ChevronRightIcon size={16} />
                    )
                  }
                  onPress={nextStep}
                >
                  {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OnboardingFlow;
