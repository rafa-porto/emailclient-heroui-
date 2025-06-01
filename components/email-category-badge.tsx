"use client";

import React from "react";
import { EmailCategory } from "@/types";
import { EMAIL_CATEGORIES, getCategoryColorClasses } from "@/utils/emailClassification";

interface EmailCategoryBadgeProps {
  category: EmailCategory;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

const EmailCategoryBadge: React.FC<EmailCategoryBadgeProps> = ({
  category,
  size = "sm",
  showIcon = true,
  showText = true,
  className = "",
}) => {
  const categoryInfo = EMAIL_CATEGORIES[category];
  const colorClasses = getCategoryColorClasses(category);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1 rounded-full border font-medium
        ${colorClasses.bg} ${colorClasses.text} ${colorClasses.border}
        ${sizeClasses[size]}
        ${className}
      `}
      title={categoryInfo.description}
    >
      {showIcon && (
        <span className={iconSizes[size]}>
          {categoryInfo.icon}
        </span>
      )}
      {showText && (
        <span className="whitespace-nowrap">
          {categoryInfo.name}
        </span>
      )}
    </div>
  );
};

export default EmailCategoryBadge;
