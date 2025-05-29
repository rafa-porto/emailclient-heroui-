"use client";

import { useEffect, useState } from "react";

interface UsePersistentStateOptions<T> {
  key: string;
  defaultValue: T;
}

export const usePersistentState = <T,>({
  key,
  defaultValue,
}: UsePersistentStateOptions<T>): [
  T,
  (value: T | ((prev: T) => T)) => void,
] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored !== null) {
        const parsedValue = JSON.parse(stored);
        setState(parsedValue);
      }
    } catch {
      // Silently handle localStorage errors - fallback to default value
    }
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const newValue =
        typeof value === "function" ? (value as (prev: T) => T)(state) : value;
      setState(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      // Silently handle localStorage errors - state will be updated but not persisted
    }
  };

  return [state, setValue];
};
