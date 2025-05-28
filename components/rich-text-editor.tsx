"use client";

import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import { Button } from "@heroui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Type,
  Palette,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
}

export interface RichTextEditorRef {
  focus: () => void;
  blur: () => void;
  getContent: () => string;
  setContent: (content: string) => void;
  insertText: (text: string) => void;
}

export const RichTextEditor = forwardRef<
  RichTextEditorRef,
  RichTextEditorProps
>(
  (
    {
      value,
      onChange,
      placeholder = "Compose your message...",
      className = "",
      height = "300px",
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

    // Função para verificar formatação ativa
    const checkActiveFormats = useCallback(() => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const formats = new Set<string>();

      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("insertUnorderedList"))
        formats.add("bulletList");
      if (document.queryCommandState("insertOrderedList"))
        formats.add("numberedList");
      if (document.queryCommandState("justifyLeft")) formats.add("alignLeft");
      if (document.queryCommandState("justifyCenter"))
        formats.add("alignCenter");
      if (document.queryCommandState("justifyRight")) formats.add("alignRight");

      setActiveFormats(formats);
    }, []);

    // Exposição de métodos através da ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      },
      blur: () => {
        if (editorRef.current) {
          editorRef.current.blur();
        }
      },
      getContent: () => {
        if (editorRef.current) {
          return editorRef.current.innerHTML;
        }
        return "";
      },
      setContent: (content: string) => {
        if (editorRef.current) {
          editorRef.current.innerHTML = content;
        }
      },
      insertText: (text: string) => {
        if (editorRef.current) {
          document.execCommand("insertText", false, text);
        }
      },
    }));

    // Handler para mudanças no conteúdo
    const handleInput = useCallback(() => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
      checkActiveFormats();
    }, [onChange, checkActiveFormats]);

    // Comandos de formatação
    const execCommand = useCallback(
      (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        setTimeout(checkActiveFormats, 10); // Pequeno delay para garantir que o comando foi executado
      },
      [checkActiveFormats]
    );

    const handleBold = () => execCommand("bold");
    const handleItalic = () => execCommand("italic");
    const handleUnderline = () => execCommand("underline");
    const handleBulletList = () => execCommand("insertUnorderedList");
    const handleNumberedList = () => execCommand("insertOrderedList");
    const handleAlignLeft = () => execCommand("justifyLeft");
    const handleAlignCenter = () => execCommand("justifyCenter");
    const handleAlignRight = () => execCommand("justifyRight");

    const handleLink = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        const url = prompt("Enter URL:");
        if (url) {
          execCommand("createLink", url);
        }
      } else {
        alert("Please select text first to create a link");
      }
    };

    const handleFontSize = (size: string) => {
      execCommand("fontSize", size);
    };

    const handleTextColor = (color: string) => {
      execCommand("foreColor", color);
    };

    // Inicializar conteúdo quando o valor mudar
    React.useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }, [value]);

    // Listener para mudanças na seleção
    React.useEffect(() => {
      const handleSelectionChange = () => {
        checkActiveFormats();
      };

      document.addEventListener("selectionchange", handleSelectionChange);

      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, [checkActiveFormats]);

    return (
      <div
        className={`rich-text-editor border border-gray-200 rounded-lg overflow-hidden flex flex-col ${className}`}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50 border-b border-gray-200 min-h-fit">
          {/* Formatação básica */}
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleBold}
            className={`min-w-8 h-8 flex-shrink-0 ${
              activeFormats.has("bold")
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : ""
            }`}
          >
            <Bold size={14} />
          </Button>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleItalic}
            className={`min-w-8 h-8 flex-shrink-0 ${
              activeFormats.has("italic")
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : ""
            }`}
          >
            <Italic size={14} />
          </Button>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleUnderline}
            className={`min-w-8 h-8 flex-shrink-0 ${
              activeFormats.has("underline")
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : ""
            }`}
          >
            <Underline size={14} />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Listas */}
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleBulletList}
            className={`min-w-8 h-8 ${
              activeFormats.has("bulletList")
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : ""
            }`}
          >
            <List size={14} />
          </Button>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleNumberedList}
            className={`min-w-8 h-8 ${
              activeFormats.has("numberedList")
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : ""
            }`}
          >
            <ListOrdered size={14} />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Alinhamento */}
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleAlignLeft}
            className="min-w-8 h-8"
          >
            <AlignLeft size={14} />
          </Button>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleAlignCenter}
            className="min-w-8 h-8"
          >
            <AlignCenter size={14} />
          </Button>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleAlignRight}
            className="min-w-8 h-8"
          >
            <AlignRight size={14} />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Link */}
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleLink}
            className="min-w-8 h-8"
          >
            <Link size={14} />
          </Button>

          {/* Tamanho da fonte */}
          <select
            onChange={(e) => handleFontSize(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3" defaultValue="3">
              12pt
            </option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>

          {/* Cor do texto */}
          <input
            type="color"
            onChange={(e) => handleTextColor(e.target.value)}
            className="w-8 h-8 border border-gray-200 rounded cursor-pointer"
            title="Text Color"
          />
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-4 focus:outline-none flex-1"
          style={{
            minHeight: height,
            maxHeight: "400px",
            overflowY: "auto",
          }}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />

        <style jsx>{`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            font-style: italic;
            pointer-events: none;
          }

          [contenteditable] {
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
          }

          [contenteditable] h1,
          [contenteditable] h2,
          [contenteditable] h3 {
            margin: 0.5em 0;
            font-weight: bold;
          }

          [contenteditable] h1 {
            font-size: 1.5em;
          }
          [contenteditable] h2 {
            font-size: 1.3em;
          }
          [contenteditable] h3 {
            font-size: 1.1em;
          }

          [contenteditable] p {
            margin: 0.5em 0;
          }

          [contenteditable] ul,
          [contenteditable] ol {
            margin: 0.5em 0;
            padding-left: 1.5em;
          }

          [contenteditable] a {
            color: #3b82f6;
            text-decoration: underline;
          }

          [contenteditable] blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1em;
            margin: 0.5em 0;
            font-style: italic;
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
