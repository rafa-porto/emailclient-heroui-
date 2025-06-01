"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import {
  SendIcon,
  PaperclipIcon,
  XIcon,
  MaximizeIcon,
  MinimizeIcon,
} from "lucide-react";

import { AIIcon } from "@/components/icons";
import RichTextEditor from "@/components/rich-text-editor";
import { useEmailContext } from "@/components/email-context";
import { EmailData } from "@/types";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const { addSentEmail } = useEmailContext();
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Função para enviar email
  const handleSendEmail = () => {
    // Validar se há destinatários
    const allRecipients = [...recipients];
    if (to.trim()) {
      allRecipients.push(to.trim());
    }

    if (allRecipients.length === 0) {
      alert("Please add at least one recipient.");
      return;
    }

    // Criar o email enviado
    const sentEmail: EmailData = {
      id: `sent-${Date.now()}`,
      sender: "You", // Ou pegar do contexto do usuário
      avatarUrl: "/user-avatar.png", // Avatar do usuário
      subject: subject || "(No Subject)",
      snippet: content.replace(/<[^>]*>/g, "").substring(0, 100) + "...", // Remove HTML tags
      content: content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true, // Emails enviados são sempre "lidos"
      isBrand: false,
      isAIGenerated: false,
      isImportant: false,
    };

    // Adicionar aos emails enviados
    addSentEmail(sentEmail);

    // Mostrar confirmação
    alert(`Email sent successfully to: ${allRecipients.join(", ")}`);

    // Fechar modal e resetar form
    onClose();
    setTo("");
    setCc("");
    setBcc("");
    setSubject("");
    setContent("");
    setRecipients([]);
    setShowCc(false);
    setShowBcc(false);
    setIsExpanded(false);
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

  // Função para gerar conteúdo com AI
  const handleGenerateContent = () => {
    // Implementar lógica de geração de conteúdo com AI
    // Por exemplo, baseado no assunto ou recipient
    const generatedContent = `<p>Hello,</p><p><br></p><p>I hope this email finds you well.</p><p><br></p><p>Best regards,</p>`;

    setContent(generatedContent);
  };

  // Função para fechar modal e resetar estado
  const handleClose = () => {
    setIsExpanded(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="bottom"
      scrollBehavior="inside"
      hideCloseButton
      classNames={{
        base: `${isExpanded ? "max-w-full max-h-full rounded-t-xl rounded-b-none" : "max-w-4xl rounded-t-2xl rounded-b-none"} !mb-0 !pb-0`,
        backdrop: "bg-black/50 backdrop-blur-sm",
        wrapper: `z-50 ${isExpanded ? "items-center justify-center !pb-0 !mb-0" : "items-end !pb-0 !mb-0 !bottom-0"}`,
        body: "p-0",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: "100%",
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      onClose={handleClose}
    >
      <ModalContent>
        {() => (
          <>
            {/* Custom Header */}
            <ModalHeader
              className={`flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 border-b border-gray-200 dark:border-neutral-700 px-6 py-4 ${isExpanded ? "rounded-t-xl" : "rounded-t-2xl"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  New Message{" "}
                  {isExpanded && (
                    <span className="text-sm font-normal text-gray-500 dark:text-neutral-400">
                      (Expanded)
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => setIsExpanded(!isExpanded)}
                  className="text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-700 hover:text-gray-700 dark:hover:text-white"
                >
                  {isExpanded ? (
                    <MinimizeIcon size={18} />
                  ) : (
                    <MaximizeIcon size={18} />
                  )}
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={handleClose}
                  className="text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-700 hover:text-gray-700 dark:hover:text-white"
                >
                  <XIcon size={18} />
                </Button>
              </div>
            </ModalHeader>

            <ModalBody className="p-0 overflow-hidden flex flex-col bg-white dark:bg-neutral-900">
              <div
                className={`flex flex-col bg-white dark:bg-neutral-900 ${isExpanded ? "h-[calc(100vh-180px)]" : "h-[550px]"}`}
              >
                {/* Recipients Section */}
                <div className="p-6 space-y-4 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
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
                            "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                          input:
                            "text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
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
                            "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                          input:
                            "text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
                        }}
                      />
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setShowCc(false);
                          setCc("");
                        }}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:hover:text-white"
                      >
                        <XIcon size={14} />
                      </Button>
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
                            "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                          input:
                            "text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
                        }}
                      />
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setShowBcc(false);
                          setBcc("");
                        }}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:hover:text-white"
                      >
                        <XIcon size={14} />
                      </Button>
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
                        inputWrapper:
                          "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                        input:
                          "text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
                      }}
                    />
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-neutral-900">
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Compose your message..."
                    height={isExpanded ? "calc(100vh - 500px)" : "220px"}
                    className="h-full flex-1 bg-white dark:bg-neutral-900"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 flex-shrink-0">
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
                      className="text-gray-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    >
                      Save Draft
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      startContent={<AIIcon size={16} />}
                      onPress={handleGenerateContent}
                      className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      Generate
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-gray-500 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    >
                      <PaperclipIcon size={16} />
                    </Button>
                    <span className="text-xs text-gray-500 dark:text-neutral-400">
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
