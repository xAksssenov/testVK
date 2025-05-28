import type { ReactNode } from "react";

export interface Record {
  [key: string]: string | number;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "number";
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    minLength?: number;
    message?: string;
  };
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormProps {
  fields: FormField[];
  onSuccess?: () => void;
}

export interface TableProps {
  refreshTrigger?: number;
}
