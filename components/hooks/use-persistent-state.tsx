"use client";

import { useEffect, useState } from "react";

interface UsePersistentStateOptions {
  key: string;
  defaultValue: number;
}

export const usePersistentState = ({
  key,
  defaultValue,
}: UsePersistentStateOptions): [number, (value: number) => void] => {
  const [state, setState] = useState<number>(defaultValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored !== null) {
        const parsedValue = JSON.parse(stored);

        if (typeof parsedValue === "number") {
          setState(parsedValue);
        }
      }
    } catch {
      // Silently handle localStorage errors - fallback to default value
    }
  }, [key]);

  const setValue = (value: number) => {
    try {
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently handle localStorage errors - state will be updated but not persisted
    }
  };

  return [state, setValue];
};
