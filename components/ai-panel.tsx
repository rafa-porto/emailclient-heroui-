"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { PaperclipIcon, MicIcon } from "lucide-react";

interface AiPanelProps {
  onClose: () => void;
}

const AiPanel: React.FC<AiPanelProps> = ({ onClose }) => {
  const [aiInput, setAiInput] = useState("");

  const handleSendMessage = () => {
    if (aiInput.trim()) {
      // Implementar lógica de envio de mensagem
      setAiInput("");
    }
  };

  const handleQuickAction = (action: string) => {
    // Implementar lógica de ação rápida
    setAiInput(action);
  };

  const handleAttachmentClick = () => {
    // Implementar lógica de anexo
  };

  const handleMicrophoneClick = () => {
    // Implementar lógica de gravação de áudio
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-950 flex flex-col border-l border-gray-200 dark:border-neutral-800 rounded-xl">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Main Question */}
        <div className="text-center mb-12">
          <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            How can I help you today?
          </h4>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Find, write, schedule, organize, ask anything...
          </p>
        </div>

        {/* Input Field */}
        <div className="w-full max-w-lg mb-8">
          <div className="relative">
            <Input
              placeholder="Type your message..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="flat"
              radius="full"
              size="lg"
              classNames={{
                base: "h-12",
                mainWrapper: "h-12",
                inputWrapper:
                  "h-12 bg-gray-100 dark:bg-neutral-800 border-0 shadow-sm",
                input: "text-base h-full px-4",
              }}
              startContent={
                <div className="flex items-center justify-center w-8 h-8 ml-1">
                  <button
                    type="button"
                    className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full"
                    onClick={handleAttachmentClick}
                  >
                    <PaperclipIcon
                      className="text-gray-400 dark:text-neutral-500"
                      size={16}
                    />
                  </button>
                </div>
              }
              endContent={
                <div className="flex items-center justify-center w-8 h-8 mr-1">
                  <button
                    type="button"
                    className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full"
                    onClick={handleMicrophoneClick}
                  >
                    <MicIcon
                      className="text-gray-400 dark:text-neutral-500"
                      size={16}
                    />
                  </button>
                </div>
              }
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-3 w-full max-w-md items-center">
          {/* First row - two buttons */}
          <div className="flex gap-3 w-full justify-center">
            <Button
              className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 border-0 flex-1 max-w-[140px]"
              radius="full"
              size="md"
              variant="flat"
              onClick={() => handleQuickAction("Organize my inbox")}
            >
              Organize my inbox
            </Button>

            <Button
              className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 border-0 flex-1 max-w-[140px]"
              radius="full"
              size="md"
              variant="flat"
              onClick={() => handleQuickAction("Find urgent emails")}
            >
              Find urgent emails
            </Button>
          </div>

          {/* Second row - one button */}
          <div className="flex justify-center">
            <Button
              className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 border-0 max-w-[140px]"
              radius="full"
              size="md"
              variant="flat"
              onClick={() => handleQuickAction("Plan my day")}
            >
              Plan my day
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPanel;
