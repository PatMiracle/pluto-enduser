import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { MdInfoOutline } from "react-icons/md";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

export function Modal({
  children,
  title,
  description,
  open,
  onOpenChange,
  className,
}: ModalProps) {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("max-h-[90vh] overflow-y-auto", className)}
        aria-describedby={undefined}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}

interface AlertProps {
  title?: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showInfoIcon?: boolean;
}

export function Alert({
  title,
  children,
  description,
  open,
  onOpenChange,
  showInfoIcon = true,
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-red-normal rounded-bl-3xl border-[1.5px] sm:max-w-md">
        <AlertDialogHeader className="items-center justify-center">
          {showInfoIcon && (
            <MdInfoOutline className="text-red-normal" size={24} />
          )}

          <AlertDialogTitle className="font-normal">
            {title || "Alert"}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-white-darker text-center text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex-row justify-center gap-4 sm:justify-center">
          {children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AlertAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant: "destructive" }), className)}
      {...props}
    />
  );
}

export function AlertCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}
