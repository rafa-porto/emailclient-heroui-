"use client";

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
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
    (typeof PREDEFINED_CONTACTS)[0][]
  >([]);
  const [selectedCcContacts, setSelectedCcContacts] = useState<
    (typeof PREDEFINED_CONTACTS)[0][]
  >([]);
  const [selectedBccContacts, setSelectedBccContacts] = useState<
    (typeof PREDEFINED_CONTACTS)[0][]
  >([]);

  // AI Assistant states
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    subjects: string[];
    templates: string[];
    tones: { name: string; description: string }[];
  }>({
    subjects: [],
    templates: [],
    tones: [
      { name: "Professional", description: "Formal and business-appropriate" },
      { name: "Casual", description: "Relaxed and friendly" },
      { name: "Friendly", description: "Warm and approachable" },
      { name: "Urgent", description: "Direct and time-sensitive" },
    ],
  });
  const [selectedTone, setSelectedTone] = useState<string>("");
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingSubject, setIsGeneratingSubject] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);

  // Reset AI assistant state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowAiAssistant(false);
      setAiSuggestions((prev) => ({ ...prev, subjects: [], templates: [] }));
      setSelectedTone("");
      setIsGeneratingContent(false);
      setIsGeneratingSubject(false);
      setAiProgress(0);
    }
  }, [isOpen]);

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

  // AI Assistant Functions
  const generateSubjectSuggestions = async () => {
    setIsGeneratingSubject(true);
    setAiProgress(0);

    // Simulate AI processing
    const progressInterval = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const suggestions = [
      "Meeting Follow-up: Next Steps",
      "Quick Question About Project Timeline",
      "Collaboration Opportunity",
      "Weekly Status Update",
      "Proposal Review Request",
    ];

    setAiSuggestions((prev) => ({ ...prev, subjects: suggestions }));
    setAiProgress(100);
    setIsGeneratingSubject(false);
  };

  const generateEmailTemplate = async (tone: string) => {
    setIsGeneratingContent(true);
    setSelectedTone(tone);
    setAiProgress(0);

    const progressInterval = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const templates = {
      Professional: `<p>Dear [Recipient],</p><p><br></p><p>I hope this email finds you well. I am writing to discuss [topic/purpose].</p><p><br></p><p>[Main content here]</p><p><br></p><p>Please let me know if you have any questions or require additional information.</p><p><br></p><p>Best regards,<br>[Your name]</p>`,
      Casual: `<p>Hi there!</p><p><br></p><p>Hope you're doing well! I wanted to reach out about [topic/purpose].</p><p><br></p><p>[Main content here]</p><p><br></p><p>Let me know what you think!</p><p><br></p><p>Thanks,<br>[Your name]</p>`,
      Friendly: `<p>Hello!</p><p><br></p><p>I hope you're having a great day! I wanted to connect with you regarding [topic/purpose].</p><p><br></p><p>[Main content here]</p><p><br></p><p>Looking forward to hearing from you soon!</p><p><br></p><p>Warm regards,<br>[Your name]</p>`,
      Urgent: `<p>Subject: URGENT - [Topic]</p><p><br></p><p>Hello,</p><p><br></p><p>This requires immediate attention: [topic/purpose]</p><p><br></p><p>[Main content here]</p><p><br></p><p>Please respond by [deadline] if possible.</p><p><br></p><p>Thank you,<br>[Your name]</p>`,
    };

    setContent(
      templates[tone as keyof typeof templates] || templates.Professional
    );
    setAiProgress(100);
    setIsGeneratingContent(false);
  };

  const handleGenerateContent = () => {
    setShowAiAssistant(true);
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
              className={`flex items-center justify-between bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 px-6 py-4 ${isExpanded ? "rounded-t-xl" : "rounded-t-2xl"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
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
                  variant="flat"
                  onPress={() => setShowAiAssistant(!showAiAssistant)}
                  className={`${
                    showAiAssistant
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                      : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                  } transition-colors`}
                >
                  <AIIcon size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => setIsExpanded(!isExpanded)}
                  className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-700 dark:hover:text-neutral-200 transition-colors"
                >
                  {isExpanded ? (
                    <MinimizeIcon size={16} />
                  ) : (
                    <MaximizeIcon size={16} />
                  )}
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={handleClose}
                  className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-700 dark:hover:text-neutral-200 transition-colors"
                >
                  <XIcon size={16} />
                </Button>
              </div>
            </ModalHeader>

            <ModalBody className="p-0 overflow-hidden flex flex-row bg-white dark:bg-neutral-900">
              {/* AI Assistant Panel */}
              {showAiAssistant && (
                <div className="w-80 border-r border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 flex flex-col">
                  {/* AI Panel Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-3">
                      <AIIcon
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        AI Assistant
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-neutral-400">
                      Get help with writing, tone, and suggestions
                    </p>
                  </div>

                  {/* AI Panel Content */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Subject Suggestions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Subject Suggestions
                        </h4>
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={generateSubjectSuggestions}
                          isLoading={isGeneratingSubject}
                          className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs px-2 py-1 h-6"
                        >
                          Generate
                        </Button>
                      </div>

                      {isGeneratingSubject && (
                        <Progress
                          value={aiProgress}
                          className="mb-2"
                          color="primary"
                          size="sm"
                        />
                      )}

                      {aiSuggestions.subjects.length > 0 && (
                        <div className="space-y-2">
                          {aiSuggestions.subjects.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setSubject(suggestion)}
                              className="w-full text-left p-2 text-xs bg-white dark:bg-neutral-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-neutral-600 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tone Selection */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Email Tone
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {aiSuggestions.tones.map((tone) => (
                          <Button
                            key={tone.name}
                            size="sm"
                            variant="flat"
                            onPress={() => generateEmailTemplate(tone.name)}
                            isLoading={
                              isGeneratingContent && selectedTone === tone.name
                            }
                            className={`${
                              selectedTone === tone.name
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "bg-white dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-600"
                            } text-xs px-2 py-2 h-auto flex-col items-start border border-gray-200 dark:border-neutral-600`}
                          >
                            <span className="font-medium">{tone.name}</span>
                            <span className="text-xs opacity-70">
                              {tone.description}
                            </span>
                          </Button>
                        ))}
                      </div>

                      {isGeneratingContent && (
                        <Progress
                          value={aiProgress}
                          className="mt-2"
                          color="primary"
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Main Compose Area */}
              <div
                className={`flex flex-col bg-white dark:bg-neutral-900 ${isExpanded ? "h-[calc(100vh-180px)]" : "h-[550px]"} ${showAiAssistant ? "flex-1" : "w-full"}`}
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
                          onKeyDown={handleToKeyPress}
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
                              "bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-none hover:border-gray-300 dark:hover:border-neutral-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors",
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
                                "bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-none hover:border-gray-300 dark:hover:border-neutral-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors",
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
                                "bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-none hover:border-gray-300 dark:hover:border-neutral-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors",
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
                          "bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-none hover:border-gray-300 dark:hover:border-neutral-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors",
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
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-shrink-0">
                  <div className="flex items-center gap-3">
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
                      className="font-medium px-4 py-2"
                    >
                      Send
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 px-4 py-2"
                    >
                      Save Draft
                    </Button>
                    {!showAiAssistant && (
                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<AIIcon size={16} />}
                        onPress={handleGenerateContent}
                        className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40 px-4 py-2"
                      >
                        AI Assistant
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    >
                      <PaperclipIcon size={16} />
                    </Button>
                    <span className="text-xs text-gray-500 dark:text-neutral-400 font-medium">
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
