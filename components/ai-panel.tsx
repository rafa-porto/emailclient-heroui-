"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { PaperclipIcon, MicIcon } from "lucide-react";
import { AIIcon } from "@/components/icons";

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
    <div className="h-full flex flex-col overflow-hidden">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 overflow-y-auto min-h-0">
        {/* AI Icon */}
        <div className="mb-8">
          <AIIcon size={32} className="text-blue-600 dark:text-blue-400" />
        </div>

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
        <div className="flex flex-col gap-4 w-full max-w-md items-center">
          {/* First row - two buttons */}
          <div className="flex gap-3 w-full justify-center">
            <Button
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40 flex-1 max-w-[150px] font-medium shadow-sm py-3 px-4 min-h-[50px]"
              radius="lg"
              size="md"
              variant="flat"
              onClick={() => handleQuickAction("Organize my inbox")}
            >
              <span className="text-sm">Organize my inbox</span>
            </Button>

            <Button
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40 flex-1 max-w-[150px] font-medium shadow-sm py-3 px-4 min-h-[50px]"
              radius="lg"
              size="md"
              variant="flat"
              onClick={() => handleQuickAction("Find urgent emails")}
            >
              <span className="text-sm">Find urgent emails</span>
            </Button>
          </div>

          {/* Second row - one button */}
          <div className="flex justify-center">
            <Button
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-700/40 max-w-[150px] font-medium shadow-sm py-3 px-4 min-h-[50px]"
              radius="lg"
              size="md"
              variant="flat"
              onClick={() => handleQuickAction("Plan my day")}
            >
              <span className="text-sm">Plan my day</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPanel;
