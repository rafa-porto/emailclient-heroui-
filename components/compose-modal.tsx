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

// Predefined contacts for suggestions
const PREDEFINED_CONTACTS = [
  { name: "John Smith", email: "john.smith@company.com", avatar: "👨‍💼" },
  { name: "Sarah Johnson", email: "sarah.johnson@company.com", avatar: "👩‍💼" },
  { name: "Mike Davis", email: "mike.davis@company.com", avatar: "👨‍💻" },
  { name: "Emily Brown", email: "emily.brown@company.com", avatar: "👩‍💻" },
  { name: "David Wilson", email: "david.wilson@company.com", avatar: "👨‍🔬" },
  { name: "Lisa Garcia", email: "lisa.garcia@company.com", avatar: "👩‍🔬" },
  { name: "Tom Anderson", email: "tom.anderson@company.com", avatar: "👨‍🎨" },
  { name: "Anna Martinez", email: "anna.martinez@company.com", avatar: "👩‍🎨" },
  { name: "Chris Taylor", email: "chris.taylor@company.com", avatar: "👨‍🏫" },
  { name: "Jessica Lee", email: "jessica.lee@company.com", avatar: "👩‍🏫" },
  { name: "Robert Miller", email: "robert.miller@gmail.com", avatar: "👨‍⚕️" },
  { name: "Maria Rodriguez", email: "maria.rodriguez@gmail.com", avatar: "👩‍⚕️" },
];

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

  // Contact suggestions states
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCcSuggestions, setShowCcSuggestions] = useState(false);
  const [showBccSuggestions, setShowBccSuggestions] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState(PREDEFINED_CONTACTS);
  const [filteredCcContacts, setFilteredCcContacts] =
    useState(PREDEFINED_CONTACTS);
  const [filteredBccContacts, setFilteredBccContacts] =
    useState(PREDEFINED_CONTACTS);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedCcSuggestionIndex, setSelectedCcSuggestionIndex] =
    useState(-1);
  const [selectedBccSuggestionIndex, setSelectedBccSuggestionIndex] =
    useState(-1);

  // Filter contacts based on input
  const filterContacts = (input: string) => {
    if (!input.trim()) {
      setFilteredContacts(PREDEFINED_CONTACTS);
      setShowSuggestions(false);
      return;
    }

    const filtered = PREDEFINED_CONTACTS.filter(
      (contact) =>
        contact.name.toLowerCase().includes(input.toLowerCase()) ||
        contact.email.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredContacts(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  // Filter CC contacts
  const filterCcContacts = (input: string) => {
    if (!input.trim()) {
      setFilteredCcContacts(PREDEFINED_CONTACTS);
      setShowCcSuggestions(false);
      return;
    }

    const filtered = PREDEFINED_CONTACTS.filter(
      (contact) =>
        contact.name.toLowerCase().includes(input.toLowerCase()) ||
        contact.email.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredCcContacts(filtered);
    setShowCcSuggestions(filtered.length > 0);
    setSelectedCcSuggestionIndex(-1);
  };

  // Filter BCC contacts
  const filterBccContacts = (input: string) => {
    if (!input.trim()) {
      setFilteredBccContacts(PREDEFINED_CONTACTS);
      setShowBccSuggestions(false);
      return;
    }

    const filtered = PREDEFINED_CONTACTS.filter(
      (contact) =>
        contact.name.toLowerCase().includes(input.toLowerCase()) ||
        contact.email.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredBccContacts(filtered);
    setShowBccSuggestions(filtered.length > 0);
    setSelectedBccSuggestionIndex(-1);
  };

  // Selected contacts for visual chips
  const [selectedContacts, setSelectedContacts] = useState<
    (typeof PREDEFINED_CONTACTS)[]
  >([]);
  const [selectedCcContacts, setSelectedCcContacts] = useState<
    (typeof PREDEFINED_CONTACTS)[]
  >([]);
  const [selectedBccContacts, setSelectedBccContacts] = useState<
    (typeof PREDEFINED_CONTACTS)[]
  >([]);

  // Handle contact selection
  const selectContact = (contact: (typeof PREDEFINED_CONTACTS)[0]) => {
    // Check if contact is already selected
    if (!selectedContacts.find((c) => c.email === contact.email)) {
      setSelectedContacts((prev) => [...prev, contact]);
    }
    setTo("");
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Handle CC contact selection
  const selectCcContact = (contact: (typeof PREDEFINED_CONTACTS)[0]) => {
    if (!selectedCcContacts.find((c) => c.email === contact.email)) {
      setSelectedCcContacts((prev) => [...prev, contact]);
    }
    setCc("");
    setShowCcSuggestions(false);
    setSelectedCcSuggestionIndex(-1);
  };

  // Handle BCC contact selection
  const selectBccContact = (contact: (typeof PREDEFINED_CONTACTS)[0]) => {
    if (!selectedBccContacts.find((c) => c.email === contact.email)) {
      setSelectedBccContacts((prev) => [...prev, contact]);
    }
    setBcc("");
    setShowBccSuggestions(false);
    setSelectedBccSuggestionIndex(-1);
  };

  // Remove selected contact
  const removeSelectedContact = (email: string) => {
    setSelectedContacts((prev) => prev.filter((c) => c.email !== email));
  };

  // Remove selected CC contact
  const removeSelectedCcContact = (email: string) => {
    setSelectedCcContacts((prev) => prev.filter((c) => c.email !== email));
  };

  // Remove selected BCC contact
  const removeSelectedBccContact = (email: string) => {
    setSelectedBccContacts((prev) => prev.filter((c) => c.email !== email));
  };

  // Função para enviar email
  const handleSendEmail = () => {
    // Validar se há destinatários
    const allRecipients = [...recipients];

    // Add selected contacts
    selectedContacts.forEach((contact) => {
      if (!allRecipients.includes(contact.email)) {
        allRecipients.push(contact.email);
      }
    });

    // Add manual input if any
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

    // Reset suggestions
    setShowSuggestions(false);
    setShowCcSuggestions(false);
    setShowBccSuggestions(false);
    setSelectedSuggestionIndex(-1);
    setSelectedCcSuggestionIndex(-1);
    setSelectedBccSuggestionIndex(-1);

    // Reset selected contacts
    setSelectedContacts([]);
    setSelectedCcContacts([]);
    setSelectedBccContacts([]);
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
    if (showSuggestions && filteredContacts.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < filteredContacts.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : filteredContacts.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          selectContact(filteredContacts[selectedSuggestionIndex]);
        } else if (to.trim()) {
          handleAddRecipient(to.trim());
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    } else if (e.key === "Enter" && to.trim()) {
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
                        {/* Selected Contact Chips */}
                        {selectedContacts.map((contact) => (
                          <div
                            key={contact.email}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-sm border border-blue-200/60 dark:border-blue-700/40 transition-all duration-200"
                          >
                            <span className="text-sm">{contact.avatar}</span>
                            <span className="text-blue-800 dark:text-blue-200 font-medium text-xs">
                              {contact.email}
                            </span>
                            <button
                              onClick={() =>
                                removeSelectedContact(contact.email)
                              }
                              className="ml-1 p-0.5 rounded-full text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 transition-all duration-200"
                            >
                              <XIcon size={12} />
                            </button>
                          </div>
                        ))}
                        {/* Manual Recipients */}
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
                      <div className="relative flex-1">
                        <Input
                          placeholder="Add recipients"
                          value={to}
                          onChange={(e) => {
                            setTo(e.target.value);
                            filterContacts(e.target.value);
                          }}
                          onKeyPress={handleToKeyPress}
                          onFocus={() => {
                            if (to.trim()) {
                              filterContacts(to);
                            }
                          }}
                          onBlur={() => {
                            // Delay hiding suggestions to allow clicking
                            setTimeout(() => setShowSuggestions(false), 150);
                          }}
                          variant="flat"
                          classNames={{
                            inputWrapper:
                              "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                            input:
                              "text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
                          }}
                        />

                        {/* Contact Suggestions Dropdown */}
                        {showSuggestions && filteredContacts.length > 0 && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredContacts.map((contact, index) => (
                              <div
                                key={contact.email}
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                                  index === selectedSuggestionIndex
                                    ? "bg-blue-50 dark:bg-blue-900/20"
                                    : "hover:bg-gray-50 dark:hover:bg-neutral-700"
                                }`}
                                onClick={() => selectContact(contact)}
                              >
                                <span className="text-lg">
                                  {contact.avatar}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {contact.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                                    {contact.email}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {/* Selected CC Contact Chips */}
                          {selectedCcContacts.map((contact) => (
                            <div
                              key={contact.email}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm border border-purple-200/60 dark:border-purple-700/40 transition-all duration-200"
                            >
                              <span className="text-sm">{contact.avatar}</span>
                              <span className="text-purple-800 dark:text-purple-200 font-medium text-xs">
                                {contact.email}
                              </span>
                              <button
                                onClick={() =>
                                  removeSelectedCcContact(contact.email)
                                }
                                className="ml-1 p-0.5 rounded-full text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-all duration-200"
                              >
                                <XIcon size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="relative">
                          <Input
                            placeholder="Carbon copy"
                            value={cc}
                            onChange={(e) => {
                              setCc(e.target.value);
                              filterCcContacts(e.target.value);
                            }}
                            onFocus={() => {
                              if (cc.trim()) {
                                filterCcContacts(cc);
                              }
                            }}
                            onBlur={() => {
                              setTimeout(
                                () => setShowCcSuggestions(false),
                                150
                              );
                            }}
                            variant="flat"
                            classNames={{
                              inputWrapper:
                                "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                              input:
                                "text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
                            }}
                          />

                          {/* CC Contact Suggestions */}
                          {showCcSuggestions &&
                            filteredCcContacts.length > 0 && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredCcContacts.map((contact, index) => (
                                  <div
                                    key={contact.email}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                                      index === selectedCcSuggestionIndex
                                        ? "bg-blue-50 dark:bg-blue-900/20"
                                        : "hover:bg-gray-50 dark:hover:bg-neutral-700"
                                    }`}
                                    onClick={() => selectCcContact(contact)}
                                  >
                                    <span className="text-lg">
                                      {contact.avatar}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {contact.name}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                                        {contact.email}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setShowCc(false);
                          setCc("");
                          setShowCcSuggestions(false);
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
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {/* Selected BCC Contact Chips */}
                          {selectedBccContacts.map((contact) => (
                            <div
                              key={contact.email}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full text-sm border border-emerald-200/60 dark:border-emerald-700/40 transition-all duration-200"
                            >
                              <span className="text-sm">{contact.avatar}</span>
                              <span className="text-emerald-800 dark:text-emerald-200 font-medium text-xs">
                                {contact.email}
                              </span>
                              <button
                                onClick={() =>
                                  removeSelectedBccContact(contact.email)
                                }
                                className="ml-1 p-0.5 rounded-full text-emerald-600 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-100 hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50 transition-all duration-200"
                              >
                                <XIcon size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="relative">
                          <Input
                            placeholder="Blind carbon copy"
                            value={bcc}
                            onChange={(e) => {
                              setBcc(e.target.value);
                              filterBccContacts(e.target.value);
                            }}
                            onFocus={() => {
                              if (bcc.trim()) {
                                filterBccContacts(bcc);
                              }
                            }}
                            onBlur={() => {
                              setTimeout(
                                () => setShowBccSuggestions(false),
                                150
                              );
                            }}
                            variant="flat"
                            classNames={{
                              inputWrapper:
                                "bg-gray-50 dark:bg-neutral-800 border-none shadow-none",
                              input:
                                "text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-neutral-400",
                            }}
                          />

                          {/* BCC Contact Suggestions */}
                          {showBccSuggestions &&
                            filteredBccContacts.length > 0 && (
                              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredBccContacts.map((contact, index) => (
                                  <div
                                    key={contact.email}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                                      index === selectedBccSuggestionIndex
                                        ? "bg-blue-50 dark:bg-blue-900/20"
                                        : "hover:bg-gray-50 dark:hover:bg-neutral-700"
                                    }`}
                                    onClick={() => selectBccContact(contact)}
                                  >
                                    <span className="text-lg">
                                      {contact.avatar}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {contact.name}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                                        {contact.email}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setShowBcc(false);
                          setBcc("");
                          setShowBccSuggestions(false);
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
                      isDisabled={
                        !to.trim() &&
                        recipients.length === 0 &&
                        selectedContacts.length === 0
                      }
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
