"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import Image from "next/image";
import {
  PrinterIcon,
  InfoIcon,
  StarIcon,
  PlusIcon,
  PaperclipIcon,
  MicIcon,
  SendIcon,
  XIcon,
  SparklesIcon,
  CheckIcon,
} from "lucide-react";

interface EmailViewProps {
  email: {
    id: string;
    sender: string;
    avatarUrl: string;
    subject: string;
    content: string;
    timestamp: string;
    read: boolean;
    isBrand?: boolean;
  };
  onClose: () => void;
}

const EmailView: React.FC<EmailViewProps> = ({ email, onClose }) => {
  const [replyText, setReplyText] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null
  );

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

    // Shipping/Orders
    if (
      subject.includes("order") ||
      subject.includes("ship") ||
      content.includes("delivery") ||
      content.includes("tracking")
    ) {
      return [
        "Thanks for the update!",
        "When can I expect delivery?",
        "Could you provide tracking information?",
        "Perfect, looking forward to receiving it",
      ];
    }

    // Collaboration/Project related
    if (
      subject.includes("project") ||
      subject.includes("collaboration") ||
      content.includes("team") ||
      content.includes("workspace")
    ) {
      return [
        "Excited to collaborate!",
        "I'll review and get back to you",
        "Could we schedule a quick sync?",
        "Thanks for adding me to the project",
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

  // Função para formatar a data/hora
  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  // Função para lidar com resposta rápida
  const handleQuickReply = (replyText: string) => {
    setReplyText(replyText);
    setSelectedSuggestion(replyText);
  };

  // Função para enviar resposta
  const handleSendReply = () => {
    // Implementar lógica de envio de resposta
    setReplyText("");
    setSelectedSuggestion(null);
  };

  // Função para sugerir resposta
  const handleSuggestReply = () => {
    // Implementar lógica de sugestão de resposta
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-900/50 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-500 dark:text-neutral-400"
            onPress={onClose}
          >
            <XIcon size={18} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-500 dark:text-neutral-400"
          >
            <PrinterIcon size={18} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-500 dark:text-neutral-400"
          >
            <InfoIcon size={18} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-500 dark:text-neutral-400"
          >
            <StarIcon size={18} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 min-h-0">
        {/* Email Subject */}
        <div className="py-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {email.subject}
          </h2>
        </div>

        {/* Sender Info */}
        <div className="py-3 flex items-center bg-gray-50/50 dark:bg-neutral-900/30 rounded-lg mx-2 px-3 mb-4">
          {email.isBrand ? (
            <div className="mr-3 flex-shrink-0 w-11 h-11 flex items-center justify-center">
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
                height={44}
                src={email.avatarUrl}
                width={44}
              />
            </div>
          ) : (
            <Avatar
              className="mr-3"
              classNames={{
                base: "bg-transparent",
              }}
              name={email.sender}
              size="md"
              src={email.avatarUrl}
            />
          )}
          <div>
            <div className="flex items-center">
              <span className="font-medium text-black dark:text-white">
                {email.sender}
              </span>
              <span className="text-xs text-gray-500 dark:text-neutral-500 ml-2">
                {formatTimestamp(email.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="py-4 text-black dark:text-white">
          <div dangerouslySetInnerHTML={{ __html: email.content }} />
        </div>

        {/* AI Response Suggestions */}
        <div className="py-4 px-1">
          <div className="flex items-center gap-2 mb-3">
            <SparklesIcon
              className="text-blue-600 dark:text-blue-400"
              size={16}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Suggested Responses
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                className={`
                  bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 
                  border border-blue-200/60 dark:border-blue-700/40 
                  text-blue-700 dark:text-blue-300 
                  hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 
                  dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 
                  hover:border-blue-300/80 dark:hover:border-blue-600/60
                  transition-all duration-200 shadow-sm hover:shadow-md
                  ${
                    selectedSuggestion === suggestion
                      ? "ring-2 ring-blue-400 dark:ring-blue-500 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60"
                      : ""
                  }
                `}
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
                onPress={() => handleQuickReply(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reply Composer - Fixed Footer */}
      <div className="bg-gray-50/80 dark:bg-neutral-900/60 rounded-xl p-4 m-4 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-start">
          <Avatar
            className="mr-3 mt-1"
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
                  "bg-white/50 dark:bg-neutral-800/50 border-none shadow-none rounded-lg",
                input: "min-h-[80px]",
              }}
              placeholder="Compose a draft and ask me to improve it..."
              radius="lg"
              size="sm"
              value={replyText}
              variant="flat"
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              className="text-gray-500 dark:text-neutral-400"
              size="sm"
              variant="light"
            >
              <PaperclipIcon size={16} />
            </Button>
            <Button
              isIconOnly
              className="text-gray-500 dark:text-neutral-400"
              size="sm"
              variant="light"
            >
              <MicIcon size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="text-primary"
              size="sm"
              variant="light"
              onPress={handleSuggestReply}
            >
              Suggest a reply
            </Button>
            <Button
              color="primary"
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
    </div>
  );
};

export default EmailView;
