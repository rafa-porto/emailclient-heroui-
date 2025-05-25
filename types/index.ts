import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Email Types
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
}
