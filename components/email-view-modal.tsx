"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
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
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface EmailViewModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

const EmailViewModal: React.FC<EmailViewModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [replyText, setReplyText] = useState("");

  // Função para formatar a data/hora
  const formatTimestamp = (timestamp: string) => {
    // Aqui você pode implementar uma formatação mais elaborada se necessário
    return timestamp;
  };

  // Função para lidar com resposta rápida
  const handleQuickReply = (replyText: string) => {
    console.log("Quick reply:", replyText);
    // Implementar lógica de resposta rápida
  };

  // Função para enviar resposta
  const handleSendReply = () => {
    console.log("Sending reply:", replyText);
    // Implementar lógica de envio de resposta
    setReplyText("");
  };

  // Função para sugerir resposta
  const handleSuggestReply = () => {
    console.log("Suggesting reply");
    // Implementar lógica de sugestão de resposta
  };

  return (
    <Modal
      classNames={{
        base: "max-w-3xl",
        backdrop: "bg-black/50 backdrop-blur-sm",
        wrapper: "z-50",
      }}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-800 px-4 py-3">
              <div className="flex items-center gap-2">
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
            </ModalHeader>
            <ModalBody className="px-4 py-0">
              {/* Email Subject */}
              <div className="py-4 border-b border-gray-200 dark:border-neutral-800">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {email.subject}
                </h2>
              </div>

              {/* Sender Info */}
              <div className="py-4 flex items-center">
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
                >
                  <div
                    className="flex items-center px-3 py-1 text-sm"
                    onClick={() =>
                      handleQuickReply("Thank you for sharing the great news")
                    }
                  >
                    <PlusIcon size={14} className="mr-1" />
                    <span>Thank you for sharing the great news</span>
                  </div>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white flex items-center"
                >
                  <div
                    className="flex items-center px-3 py-1 text-sm"
                    onClick={() =>
                      handleQuickReply("I'm available tomorrow at 1pm PST")
                    }
                  >
                    <PlusIcon size={14} className="mr-1" />
                    <span>I'm available tomorrow at 1pm PST</span>
                  </div>
                </HoverBorderGradient>
              </div>

              {/* Reply Composer */}
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <Avatar
                    className="mr-3 mt-1"
                    name="E"
                    size="sm"
                    color="primary"
                  />
                  <div className="flex-1">
                    <Input
                      placeholder="Compose a draft and ask me to improve it..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      variant="flat"
                      radius="lg"
                      size="sm"
                      classNames={{
                        inputWrapper: "bg-transparent border-none shadow-none",
                        input: "min-h-[80px] resize-y",
                      }}
                      fullWidth
                      multiline
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
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EmailViewModal;
