"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { PaperclipIcon, MicIcon } from "lucide-react";

interface AiPanelProps {
  onClose: () => void;
}

const AiPanel: React.FC<AiPanelProps> = ({ onClose: _onClose }) => {
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
    <div className="h-full flex flex-col">
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
            <Textarea
              classNames={{
                base: "min-h-[100px]",
                input: "text-base px-4 py-2 resize-none",
                inputWrapper:
                  "min-h-[100px] bg-gray-100 dark:bg-neutral-800 border-0 shadow-sm py-3",
                mainWrapper: "min-h-[100px]",
              }}
              endContent={
                <div className="flex items-end justify-center w-8 h-8 mr-1 mb-2">
                  <button
                    className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full"
                    type="button"
                    onClick={handleMicrophoneClick}
                  >
                    <MicIcon
                      className="text-gray-400 dark:text-neutral-500"
                      size={16}
                    />
                  </button>
                </div>
              }
              maxRows={8}
              minRows={3}
              placeholder="Type your message..."
              radius="lg"
              startContent={
                <div className="flex items-start justify-center w-8 h-8 ml-1 mt-2">
                  <button
                    className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full"
                    type="button"
                    onClick={handleAttachmentClick}
                  >
                    <PaperclipIcon
                      className="text-gray-400 dark:text-neutral-500"
                      size={16}
                    />
                  </button>
                </div>
              }
              value={aiInput}
              variant="flat"
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={handleKeyPress}
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
