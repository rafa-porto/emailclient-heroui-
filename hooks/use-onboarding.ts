"use client";

import { useState, useEffect } from "react";

interface OnboardingState {
  isFirstTime: boolean;
  hasCompletedOnboarding: boolean;
  currentStep: number;
  skippedOnboarding: boolean;
}

interface UseOnboardingReturn {
  isOnboardingOpen: boolean;
  shouldShowOnboarding: boolean;
  onboardingState: OnboardingState;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  closeOnboarding: () => void;
}

const ONBOARDING_STORAGE_KEY = "dove-mail-onboarding";

export const useOnboarding = (): UseOnboardingReturn => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    isFirstTime: true,
    hasCompletedOnboarding: false,
    currentStep: 0,
    skippedOnboarding: false,
  });

  // Load onboarding state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setOnboardingState(parsedState);
      } catch (error) {
        console.error("Failed to parse onboarding state:", error);
        // Reset to default state if parsing fails
        resetOnboardingState();
      }
    }
  }, []);

  // Save onboarding state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify(onboardingState)
    );
  }, [onboardingState]);

  // Determine if onboarding should be shown
  const shouldShowOnboarding =
    onboardingState.isFirstTime &&
    !onboardingState.hasCompletedOnboarding &&
    !onboardingState.skippedOnboarding;

  // Check if this is truly the first time (no previous onboarding data)
  const isTrulyFirstTime = () => {
    const savedState = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return !savedState;
  };

  const resetOnboardingState = () => {
    const defaultState: OnboardingState = {
      isFirstTime: true,
      hasCompletedOnboarding: false,
      currentStep: 0,
      skippedOnboarding: false,
    };
    setOnboardingState(defaultState);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(defaultState));
  };

  const startOnboarding = () => {
    setIsOnboardingOpen(true);
    setOnboardingState((prev) => ({
      ...prev,
      isFirstTime: false,
    }));
  };

  const markUserLoggedIn = () => {
    // Mark that user just logged in for onboarding detection
    sessionStorage.setItem("justLoggedIn", "true");
  };

  const completeOnboarding = () => {
    setOnboardingState((prev) => ({
      ...prev,
      hasCompletedOnboarding: true,
      isFirstTime: false,
    }));
    setIsOnboardingOpen(false);
  };

  const skipOnboarding = () => {
    setOnboardingState((prev) => ({
      ...prev,
      skippedOnboarding: true,
      isFirstTime: false,
    }));
    setIsOnboardingOpen(false);
  };

  const resetOnboarding = () => {
    resetOnboardingState();
    setIsOnboardingOpen(false);
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  return {
    isOnboardingOpen,
    shouldShowOnboarding,
    onboardingState,
    startOnboarding,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
    closeOnboarding,
  };
};
