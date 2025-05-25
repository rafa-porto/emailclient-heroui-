"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { SendIcon, PaperclipIcon, XIcon, MinusIcon } from "lucide-react";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);

  // Função para enviar email
  const handleSendEmail = () => {
    console.log("Sending email:", {
      to,
      cc,
      bcc,
      subject,
      content,
      recipients,
    });
    onClose();
    // Reset form
    setTo("");
    setCc("");
    setBcc("");
    setSubject("");
    setContent("");
    setRecipients([]);
    setShowCc(false);
    setShowBcc(false);
  };

  // Função para adicionar destinatário
  const handleAddRecipient = (email: string) => {
    if (email && !recipients.includes(email)) {
      setRecipients([...recipients, email]);
      setTo("");
    }
  };

  // Função para remover destinatário
  const handleRemoveRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email));
  };

  // Função para lidar com Enter no campo To
  const handleToKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && to.trim()) {
      e.preventDefault();
      handleAddRecipient(to.trim());
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      hideCloseButton
      classNames={{
        base: "max-w-4xl",
        backdrop: "bg-black/50 backdrop-blur-sm",
        wrapper: "z-50",
      }}
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            {/* Custom Header */}
            <ModalHeader className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 border-b border-gray-200 dark:border-neutral-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-4 text-lg font-semibold text-gray-800 dark:text-white">
                  New Message
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-700"
                >
                  <MinusIcon size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={onClose}
                  className="text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-700"
                >
                  <XIcon size={16} />
                </Button>
              </div>
            </ModalHeader>

            <ModalBody className="p-0">
              <div className="flex flex-col h-[600px]">
                {/* Recipients Section */}
                <div className="p-6 space-y-4 border-b border-gray-200 dark:border-neutral-800">
                  {/* To Field */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-neutral-300 w-12">
                      To
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {recipients.map((email) => (
                          <Chip
                            key={email}
                            onClose={() => handleRemoveRecipient(email)}
                            variant="flat"
                            color="primary"
                            size="sm"
                          >
                            {email}
                          </Chip>
                        ))}
                      </div>
                      <Input
                        placeholder="Add recipients"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        onKeyPress={handleToKeyPress}
                        variant="flat"
                        classNames={{
                          inputWrapper:
                            "bg-transparent border-none shadow-none",
                          input: "text-sm",
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      {!showCc && (
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => setShowCc(true)}
                          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          Cc
                        </Button>
                      )}
                      {!showBcc && (
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => setShowBcc(true)}
                          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          Bcc
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* CC Field */}
                  {showCc && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-neutral-300 w-12">
                        Cc
                      </span>
                      <Input
                        placeholder="Carbon copy"
                        value={cc}
                        onChange={(e) => setCc(e.target.value)}
                        variant="flat"
                        classNames={{
                          inputWrapper:
                            "bg-transparent border-none shadow-none",
                          input: "text-sm",
                        }}
                      />
                    </div>
                  )}

                  {/* BCC Field */}
                  {showBcc && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-neutral-300 w-12">
                        Bcc
                      </span>
                      <Input
                        placeholder="Blind carbon copy"
                        value={bcc}
                        onChange={(e) => setBcc(e.target.value)}
                        variant="flat"
                        classNames={{
                          inputWrapper:
                            "bg-transparent border-none shadow-none",
                          input: "text-sm",
                        }}
                      />
                    </div>
                  )}

                  {/* Subject Field */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-neutral-300 w-12">
                      Subject
                    </span>
                    <Input
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      variant="flat"
                      classNames={{
                        inputWrapper: "bg-transparent border-none shadow-none",
                        input: "text-sm font-medium",
                      }}
                    />
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 flex flex-col">
                  <Textarea
                    placeholder="Compose your message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="flat"
                    classNames={{
                      base: "h-full",
                      inputWrapper:
                        "bg-transparent border-none shadow-none h-full",
                      input: "h-full resize-none text-sm leading-relaxed",
                    }}
                    minRows={15}
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/50">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      endContent={<SendIcon size={16} />}
                      onPress={handleSendEmail}
                      isDisabled={!to.trim() && recipients.length === 0}
                      className="font-medium"
                    >
                      Send
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      className="text-gray-600 dark:text-neutral-400"
                    >
                      Save Draft
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-gray-500 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    >
                      <PaperclipIcon size={16} />
                    </Button>
                    <span className="text-xs text-gray-500 dark:text-neutral-500">
                      {content.length} characters
                    </span>
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

export default ComposeModal;
