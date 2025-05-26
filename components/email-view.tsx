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
        <div className="flex flex-wrap gap-3 py-4 px-1">
          <Button
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/30 text-blue-700 dark:text-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 transition-all duration-200 shadow-sm hover:shadow-md"
            radius="full"
            size="sm"
            startContent={<PlusIcon size={14} />}
            variant="flat"
            onClick={() =>
              handleQuickReply("Thank you for sharing the great news")
            }
          >
            Thank you for sharing the great news
          </Button>

          <Button
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/30 text-green-700 dark:text-green-300 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30 transition-all duration-200 shadow-sm hover:shadow-md"
            radius="full"
            size="sm"
            startContent={<PlusIcon size={14} />}
            variant="flat"
            onClick={() =>
              handleQuickReply("I&apos;m available tomorrow at 1pm PST")
            }
          >
            I&apos;m available tomorrow at 1pm PST
          </Button>

          <Button
            className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-700/30 text-purple-700 dark:text-purple-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-violet-100 dark:hover:from-purple-800/30 dark:hover:to-violet-800/30 transition-all duration-200 shadow-sm hover:shadow-md"
            radius="full"
            size="sm"
            startContent={<PlusIcon size={14} />}
            variant="flat"
            onClick={() => handleQuickReply("Let me get back to you on this")}
          >
            Let me get back to you on this
          </Button>
        </div>
      </div>

      {/* Reply Composer - Fixed Footer */}
      <div className="bg-gray-50/80 dark:bg-neutral-900/60 rounded-xl p-4 m-4 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-start">
          <Avatar className="mr-3 mt-1" color="primary" name="E" size="sm" />
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
