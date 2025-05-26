"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ResizableDividerProps {
  onResize: (deltaX: number) => void;
  onDoubleClick?: () => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const ResizableDivider: React.FC<ResizableDividerProps> = ({
  onResize,
  onDoubleClick,
  orientation = "vertical",
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartPosition(orientation === "vertical" ? e.clientX : e.clientY);

      // Add grabbing cursor to body during drag
      document.body.style.cursor =
        orientation === "vertical" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    },
    [orientation]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const currentPosition =
        orientation === "vertical" ? e.clientX : e.clientY;
      const delta = currentPosition - startPosition;

      onResize(delta);
      setStartPosition(currentPosition);
    },
    [isDragging, startPosition, orientation, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // Reset cursor and user select
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <button
      aria-label={`Resize ${orientation === "vertical" ? "columns" : "rows"}`}
      aria-orientation={orientation}
      className={`
        ${
          orientation === "vertical"
            ? "w-1 cursor-col-resize hover:bg-blue-500/20 hover:w-2 transition-all duration-150"
            : "h-1 cursor-row-resize hover:bg-blue-500/20 hover:h-2 transition-all duration-150"
        }
        ${isDragging ? "bg-blue-500/40" : "bg-transparent"}
        ${className}
        relative group border-0 p-0 bg-transparent
      `}
      type="button"
      onDoubleClick={onDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {/* Visual indicator line */}
      <div
        className={`
          ${
            orientation === "vertical"
              ? "absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full"
              : "absolute left-0 top-1/2 transform -translate-y-1/2 h-px w-full"
          }
          bg-gray-300 dark:bg-neutral-600 group-hover:bg-blue-500 transition-colors duration-150
        `}
      />

      {/* Hover indicator */}
      <div
        className={`
          ${
            orientation === "vertical"
              ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8"
              : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 w-8"
          }
          bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150
        `}
      />
    </button>
  );
};

export default ResizableDivider;
