"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingFlow from "./onboarding-flow";

interface OnboardingContextType {
  isOnboardingOpen: boolean;
  shouldShowOnboarding: boolean;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  closeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider"
    );
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isOnboardingOpen,
    shouldShowOnboarding,
    onboardingState,
    startOnboarding,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
    closeOnboarding,
  } = useOnboarding();

  // Auto-start onboarding when user reaches authenticated pages for the first time
  useEffect(() => {
    // Check if user is on authenticated pages
    const isAuthenticatedPage =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/inbox") ||
      pathname.startsWith("/settings") ||
      pathname.startsWith("/compose");

    // Check if user just logged in (coming from auth pages)
    const isComingFromAuth =
      document.referrer.includes("/auth/") ||
      sessionStorage.getItem("justLoggedIn") === "true";

    if (isAuthenticatedPage && shouldShowOnboarding && !isOnboardingOpen) {
      // Clear the login flag if it exists
      sessionStorage.removeItem("justLoggedIn");

      // Small delay to ensure the page has loaded and UI is ready
      const timer = setTimeout(() => {
        startOnboarding();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [pathname, shouldShowOnboarding, isOnboardingOpen, startOnboarding]);

  const handleComplete = () => {
    completeOnboarding();
    // Optional: Navigate to a specific page after completion
    // router.push("/inbox");
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  const contextValue: OnboardingContextType = {
    isOnboardingOpen,
    shouldShowOnboarding,
    startOnboarding,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
    closeOnboarding,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
      <OnboardingFlow
        isOpen={isOnboardingOpen}
        onClose={closeOnboarding}
        onComplete={handleComplete}
      />
    </OnboardingContext.Provider>
  );
};
