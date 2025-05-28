import type { ReactNode } from "react";

export interface Record {
  id: number;
  name: string;
  email: string;
  age: number;
  profession: string;
  wages: number;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  profession?: string;
  wages?: string;
}

export interface FormProps {
  onSuccess?: () => void;
}

export interface TableProps {
  refreshTrigger?: number;
}
