"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import {
  PrinterIcon,
  InfoIcon,
  StarIcon,
  PlusIcon,
  PaperclipIcon,
  MicIcon,
  SendIcon,
  XIcon,
} from "lucide-react";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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

  // Função para formatar a data/hora
  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  // Função para lidar com resposta rápida
  const handleQuickReply = (replyText: string) => {
    // Implementar lógica de resposta rápida
    setReplyText(replyText);
  };

  // Função para enviar resposta
  const handleSendReply = () => {
    // Implementar lógica de envio de resposta
    setReplyText("");
  };

  // Função para sugerir resposta
  const handleSuggestReply = () => {
    // Implementar lógica de sugestão de resposta
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-900/50 px-4 py-3">
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
      <div className="flex-1 overflow-y-auto px-4">
        {/* Email Subject */}
        <div className="py-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {email.subject}
          </h2>
        </div>

        {/* Sender Info */}
        <div className="py-3 flex items-center bg-gray-50/50 dark:bg-neutral-900/30 rounded-lg mx-2 px-3 mb-4">
          <Avatar
            className="mr-3"
            name={email.sender}
            size="md"
            src={email.avatarUrl}
          />
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

        {/* Quick Reply Options */}
        <div className="flex flex-wrap gap-2 py-4">
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white flex items-center"
            onClick={() =>
              handleQuickReply("Thank you for sharing the great news")
            }
          >
            <div className="flex items-center px-3 py-1 text-sm">
              <PlusIcon size={14} className="mr-1" />
              <span>Thank you for sharing the great news</span>
            </div>
          </HoverBorderGradient>
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white flex items-center"
            onClick={() =>
              handleQuickReply("I&apos;m available tomorrow at 1pm PST")
            }
          >
            <div className="flex items-center px-3 py-1 text-sm">
              <PlusIcon size={14} className="mr-1" />
              <span>I&apos;m available tomorrow at 1pm PST</span>
            </div>
          </HoverBorderGradient>
        </div>

        {/* Reply Composer */}
        <div className="bg-gray-50/80 dark:bg-neutral-900/60 rounded-xl p-4 mb-4 mx-2 backdrop-blur-sm">
          <div className="flex items-start">
            <Avatar className="mr-3 mt-1" name="E" size="sm" color="primary" />
            <div className="flex-1">
              <Input
                placeholder="Compose a draft and ask me to improve it..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                variant="flat"
                radius="lg"
                size="sm"
                classNames={{
                  inputWrapper:
                    "bg-white/50 dark:bg-neutral-800/50 border-none shadow-none rounded-lg",
                  input: "min-h-[80px]",
                }}
                fullWidth
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-gray-500 dark:text-neutral-400"
              >
                <PaperclipIcon size={16} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-gray-500 dark:text-neutral-400"
              >
                <MicIcon size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="light"
                className="text-primary"
                onPress={handleSuggestReply}
              >
                Suggest a reply
              </Button>
              <Button
                size="sm"
                color="primary"
                endContent={<SendIcon size={14} />}
                onPress={handleSendReply}
                isDisabled={!replyText.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailView;
