import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Email Types
export interface EmailAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface EmailData {
  id: string;
  sender: string;
  avatarUrl: string;
  subject: string;
  snippet: string;
  content: string;
  timestamp: string;
  read: boolean;
  isBrand?: boolean;
  isAIGenerated?: boolean;
  isImportant?: boolean;
  attachments?: EmailAttachment[];
}
