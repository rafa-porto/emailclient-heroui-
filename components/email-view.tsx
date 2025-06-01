"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import Image from "next/image";
import {
  PrinterIcon,
  XIcon,
  DownloadIcon,
  FileIcon,
  ArchiveIcon,
  TrashIcon,
  ZapIcon,
  ReplyIcon,
  ReplyAllIcon,
  ForwardIcon,
  LanguagesIcon,
  HeartIcon,
  AlertTriangleIcon,
  BrainIcon,
  PaperclipIcon,
  StarIcon,
  InfoIcon,
  SparklesIcon,
  SendIcon,
  CheckIcon,
  PlusIcon,
} from "lucide-react";

import { EmailAttachment } from "@/types";
import { useEmailContext } from "@/components/email-context";

interface EmailViewProps {
  email: {
    id: string;
    sender: string;
    senderEmail?: string;
    avatarUrl: string;
    subject: string;
    content: string;
    timestamp: string;
    read: boolean;
    isBrand?: boolean;
    isAIGenerated?: boolean;
    isImportant?: boolean;
    attachments?: EmailAttachment[];
  };
  onClose: () => void;
}

const EmailView: React.FC<EmailViewProps> = ({ email, onClose }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isAnalyzingSentiment, setIsAnalyzingSentiment] = useState(false);
  const [priority, setPriority] = useState<string | null>(null);
  const [isAnalyzingPriority, setIsAnalyzingPriority] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null
  );
  const [replyText, setReplyText] = useState("");
  const [showComposeInput, setShowComposeInput] = useState(false);

  // Get context functions
  const {
    toggleStarEmail,
    archiveEmail,
    deleteEmail,
    isEmailStarred,
    generateEmailSummary,
    getEmailSummary,
  } = useEmailContext();

  const isStarred = isEmailStarred(email.id);
  const existingSummary = getEmailSummary(email.id);

  // Handler functions
  const handleStarToggle = () => {
    toggleStarEmail(email.id);
  };

  const handleGenerateSummary = async () => {
    if (existingSummary) {
      setShowSummary(!showSummary);
      return;
    }

    setIsGeneratingSummary(true);
    try {
      await generateEmailSummary(email.id, email.content);
      setShowSummary(true);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleArchive = () => {
    archiveEmail(email.id);
    onClose();
  };

  const handleDelete = () => {
    deleteEmail(email.id);
    onClose();
  };

  // AI Feature Handlers
  const handleSentimentAnalysis = async () => {
    if (sentiment) {
      setSentiment(null);
      return;
    }

    setIsAnalyzingSentiment(true);
    try {
      // Simulate AI sentiment analysis
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const sentiments = [
        "Positive",
        "Neutral",
        "Negative",
        "Urgent",
        "Friendly",
      ];
      const randomSentiment =
        sentiments[Math.floor(Math.random() * sentiments.length)];
      setSentiment(randomSentiment);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    } finally {
      setIsAnalyzingSentiment(false);
    }
  };

  const handlePriorityAnalysis = async () => {
    if (priority) {
      setPriority(null);
      return;
    }

    setIsAnalyzingPriority(true);
    try {
      // Simulate AI priority analysis
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const priorities = ["High", "Medium", "Low", "Critical"];
      const randomPriority =
        priorities[Math.floor(Math.random() * priorities.length)];
      setPriority(randomPriority);
    } catch (error) {
      console.error("Error analyzing priority:", error);
    } finally {
      setIsAnalyzingPriority(false);
    }
  };

  const handleTranslation = async () => {
    if (translation) {
      setTranslation(null);
      return;
    }

    setIsTranslating(true);
    try {
      // Simulate AI translation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTranslation("This email has been translated to English using AI.");
    } catch (error) {
      console.error("Error translating:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Generate AI-powered response suggestions based on email content
  const generateSuggestions = (email: any) => {
    const subject = email.subject.toLowerCase();
    const content = email.content.toLowerCase();

    // Meeting/Appointment related
    if (
      subject.includes("meeting") ||
      subject.includes("appointment") ||
      subject.includes("call") ||
      content.includes("schedule")
    ) {
      return [
        "I'll be there, thanks for scheduling!",
        "Could we reschedule for later this week?",
        "Looking forward to our discussion",
        "Please send the meeting agenda beforehand",
      ];
    }

    // Job/Interview related
    if (
      subject.includes("interview") ||
      content.includes("offer") ||
      content.includes("position") ||
      content.includes("job")
    ) {
      return [
        "Thank you for the opportunity!",
        "I'm very interested and would love to discuss further",
        "Could you share more details about the role?",
        "I appreciate your time and consideration",
      ];
    }

    // Payment/Billing related
    if (
      subject.includes("payment") ||
      subject.includes("bill") ||
      subject.includes("invoice") ||
      content.includes("receipt")
    ) {
      return [
        "Payment received, thank you",
        "Could you send an updated invoice?",
        "I have a question about this charge",
        "Please confirm payment was processed",
      ];
    }

    // Security/Verification related
    if (
      subject.includes("security") ||
      subject.includes("verify") ||
      content.includes("sign-in") ||
      content.includes("verification")
    ) {
      return [
        "Yes, that was me signing in",
        "I didn't authorize this activity",
        "Please help me secure my account",
        "Thanks for the security notification",
      ];
    }

    // Default professional responses
    return [
      "Thank you for reaching out",
      "I'll review this and get back to you",
      "Could we schedule a time to discuss?",
      "I appreciate the information",
    ];
  };

  const suggestions = useMemo(() => generateSuggestions(email), [email]);

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setReplyText(suggestion);
    setShowComposeInput(true);
  };

  // Handle sending reply
  const handleSendReply = () => {
    // Implement send logic here
    console.log("Sending reply:", replyText);
    setReplyText("");
    setSelectedSuggestion(null);
    setShowComposeInput(false);
  };

  // Função para formatar a data/hora
  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50/80 dark:bg-neutral-900/30 px-4 py-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            size="sm"
            variant="light"
            onPress={onClose}
          >
            <XIcon size={18} />
          </Button>
          <Button
            isIconOnly
            className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            size="sm"
            variant="light"
          >
            <PrinterIcon size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {/* AI Features */}
          <Button
            isIconOnly
            className={`transition-all duration-200 ${
              sentiment
                ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40"
                : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
            size="sm"
            variant="light"
            onPress={handleSentimentAnalysis}
            isLoading={isAnalyzingSentiment}
            title={sentiment ? `Sentiment: ${sentiment}` : "Analyze Sentiment"}
          >
            <HeartIcon size={16} />
          </Button>

          <Button
            isIconOnly
            className={`transition-all duration-200 ${
              priority
                ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40"
                : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
            size="sm"
            variant="light"
            onPress={handlePriorityAnalysis}
            isLoading={isAnalyzingPriority}
            title={priority ? `Priority: ${priority}` : "Analyze Priority"}
          >
            <AlertTriangleIcon size={16} />
          </Button>

          <Button
            isIconOnly
            className={`transition-all duration-200 ${
              translation
                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
            size="sm"
            variant="light"
            onPress={handleTranslation}
            isLoading={isTranslating}
            title={translation ? "Hide Translation" : "Translate Email"}
          >
            <LanguagesIcon size={16} />
          </Button>

          <Button
            isIconOnly
            className={`transition-all duration-200 ${
              existingSummary && showSummary
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
            size="sm"
            variant="light"
            onPress={handleGenerateSummary}
            isLoading={isGeneratingSummary}
            title={
              existingSummary ? "Toggle Summary" : "Generate Quick Summary"
            }
          >
            <ZapIcon size={16} />
          </Button>

          {/* Standard Actions */}
          <Button
            isIconOnly
            className={`transition-all duration-200 ${
              isStarred
                ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/40"
                : "text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
            size="sm"
            variant="light"
            onPress={handleStarToggle}
          >
            <StarIcon
              className={isStarred ? "fill-yellow-500" : ""}
              size={16}
            />
          </Button>

          <Button
            isIconOnly
            className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
            size="sm"
            variant="light"
            onPress={handleArchive}
          >
            <ArchiveIcon size={16} />
          </Button>

          <Button
            isIconOnly
            className="text-gray-500 dark:text-neutral-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
            size="sm"
            variant="light"
            onPress={handleDelete}
          >
            <TrashIcon size={16} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 min-h-0">
        {/* Email Subject */}
        <div className="py-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {email.subject}
          </h2>
        </div>

        {/* Important Email Badge */}
        {email.isImportant && (
          <div className="mb-4 mx-2">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 transition-all duration-200">
              <InfoIcon className="text-red-600 dark:text-red-400" size={16} />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                This email is considered as very important
              </span>
            </div>
          </div>
        )}

        {/* AI Analysis Results */}
        {(showSummary && existingSummary) ||
        sentiment ||
        priority ||
        translation ? (
          <div className="mb-4 mx-2 space-y-3">
            {/* Quick Summary */}
            {showSummary && existingSummary && (
              <div className="p-4 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <ZapIcon
                    className="text-blue-600 dark:text-blue-400"
                    size={16}
                  />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    Quick Summary
                  </span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  {existingSummary}
                </p>
              </div>
            )}

            {/* Sentiment Analysis */}
            {sentiment && (
              <div className="p-3 rounded-lg bg-pink-50/80 dark:bg-pink-950/30 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <HeartIcon
                    className="text-pink-600 dark:text-pink-400"
                    size={16}
                  />
                  <span className="text-sm font-semibold text-pink-700 dark:text-pink-300">
                    Sentiment Analysis:
                  </span>
                  <span className="text-sm text-pink-800 dark:text-pink-200 font-medium">
                    {sentiment}
                  </span>
                </div>
              </div>
            )}

            {/* Priority Analysis */}
            {priority && (
              <div className="p-3 rounded-lg bg-orange-50/80 dark:bg-orange-950/30 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon
                    className="text-orange-600 dark:text-orange-400"
                    size={16}
                  />
                  <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                    Priority Level:
                  </span>
                  <span className="text-sm text-orange-800 dark:text-orange-200 font-medium">
                    {priority}
                  </span>
                </div>
              </div>
            )}

            {/* Translation */}
            {translation && (
              <div className="p-4 rounded-lg bg-purple-50/80 dark:bg-purple-950/30 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <LanguagesIcon
                    className="text-purple-600 dark:text-purple-400"
                    size={16}
                  />
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    Translation
                  </span>
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200 leading-relaxed">
                  {translation}
                </p>
              </div>
            )}
          </div>
        ) : null}

        {/* Sender Info */}
        <div className="py-4 flex items-center bg-gray-50/50 dark:bg-neutral-900/30 rounded-lg mx-2 px-4 mb-4 transition-all duration-200">
          {email.isBrand ? (
            <div className="mr-4 flex-shrink-0 w-10 h-10 flex items-center justify-center">
              <Image
                alt={email.sender}
                className={`w-full h-full object-contain ${
                  // Apply theme-aware filters for black/white icons
                  email.avatarUrl.includes("github.svg")
                    ? "dark:invert dark:brightness-0 dark:contrast-100"
                    : email.avatarUrl.includes("apple.svg")
                      ? "brightness-0 dark:brightness-100 dark:invert-0"
                      : email.avatarUrl.includes("uber.svg")
                        ? "dark:invert dark:brightness-0 dark:contrast-100"
                        : email.avatarUrl.includes("aws.svg")
                          ? "dark:invert dark:brightness-0 dark:contrast-100"
                          : ""
                }`}
                height={40}
                src={email.avatarUrl}
                width={40}
              />
            </div>
          ) : (
            <Avatar
              className="mr-4"
              classNames={{
                base: "bg-transparent",
              }}
              name={email.sender}
              size="md"
              src={email.avatarUrl}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white text-base">
                    {email.sender}
                  </span>
                  {email.isAIGenerated && !email.isImportant && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      <SparklesIcon size={10} />
                      AI
                    </div>
                  )}
                </div>
                {email.senderEmail && (
                  <div className="text-sm text-gray-600 dark:text-neutral-400 truncate">
                    {email.senderEmail}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  {formatTimestamp(email.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="py-4 text-black dark:text-white">
          <div
            dangerouslySetInnerHTML={{ __html: email.content }}
            className="email-content break-words overflow-wrap-anywhere max-w-full overflow-hidden"
          />
        </div>

        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="py-4 px-2">
            <div className="flex items-center gap-2 mb-3">
              <PaperclipIcon
                className="text-gray-600 dark:text-gray-400"
                size={16}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Attachments ({email.attachments.length})
              </span>
            </div>
            <div className="space-y-2">
              {email.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
                >
                  <div className="flex-shrink-0">
                    <FileIcon
                      className="text-blue-600 dark:text-blue-400"
                      size={20}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {attachment.size}
                    </p>
                  </div>
                  <Button
                    isIconOnly
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
                    size="sm"
                    variant="light"
                  >
                    <DownloadIcon size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Response Suggestions */}
        <div className="py-4 px-2">
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon
              className="text-blue-600 dark:text-blue-400"
              size={16}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Suggested Responses
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                className={`transition-all duration-200 ${
                  selectedSuggestion === suggestion
                    ? "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 dark:hover:text-blue-300"
                }`}
                radius="lg"
                size="sm"
                startContent={
                  selectedSuggestion === suggestion ? (
                    <CheckIcon size={14} />
                  ) : (
                    <PlusIcon size={14} />
                  )
                }
                variant="flat"
                onPress={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>

          {/* Compose Input Field */}
          {showComposeInput && (
            <div className="bg-gray-50/80 dark:bg-neutral-900/30 rounded-xl p-4 transition-all duration-200 animate-in slide-in-from-top-2">
              <div className="flex items-start gap-3">
                <Avatar
                  className="mt-1 flex-shrink-0"
                  classNames={{
                    base: "bg-transparent",
                  }}
                  color="primary"
                  name="E"
                  size="sm"
                />
                <div className="flex-1">
                  <Input
                    fullWidth
                    classNames={{
                      inputWrapper:
                        "bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 focus-within:bg-white dark:focus-within:bg-neutral-700 transition-all duration-200",
                      input: "min-h-[80px]",
                    }}
                    placeholder="Edit your response or type a new one..."
                    radius="lg"
                    size="sm"
                    value={replyText}
                    variant="flat"
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1">
                  <Button
                    isIconOnly
                    className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
                    size="sm"
                    variant="light"
                  >
                    <PaperclipIcon size={16} />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className="text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200"
                    size="sm"
                    variant="light"
                    onPress={() => setShowComposeInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700 transition-all duration-200"
                    endContent={<SendIcon size={14} />}
                    isDisabled={!replyText.trim()}
                    size="sm"
                    onPress={handleSendReply}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reply Actions */}
        <div className="py-4 px-2">
          <div className="flex items-center gap-2 mb-4">
            <BrainIcon className="text-gray-600 dark:text-gray-400" size={16} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quick Actions
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200"
              size="sm"
              startContent={<ReplyIcon size={14} />}
              variant="flat"
            >
              Reply
            </Button>
            <Button
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200"
              size="sm"
              startContent={<ReplyAllIcon size={14} />}
              variant="flat"
            >
              Reply All
            </Button>
            <Button
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200"
              size="sm"
              startContent={<ForwardIcon size={14} />}
              variant="flat"
            >
              Forward
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailView;
