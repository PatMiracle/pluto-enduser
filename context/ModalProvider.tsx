"use client";

import { createContext, useContext, useState } from "react";

type ModalContextType = {
  openModal: (id: string) => void;
  closeModal: () => void;
  isOpen: (id: string) => boolean;
  bind: (id: string) => (open: boolean) => void;
  getModalProps: (id: string) => {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (id: string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);
  const isOpen = (id: string) => activeModal === id;

  const bind = (id: string) => (open: boolean) => {
    if (open) openModal(id);
    else closeModal();
  };

  const getModalProps = (id: string) => ({
    open: isOpen(id),
    onOpenChange: bind(id),
  });

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isOpen, bind, getModalProps }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
