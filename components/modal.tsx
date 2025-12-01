import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { MdInfoOutline } from "react-icons/md";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
};

export default function Modal({
  children,
  trigger,
  title,
  description,
}: Props) {
  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="max-h-11/12 overflow-auto"
        // onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
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
  trigger: React.ReactNode;
}

export function Alert({ title, children, trigger, description }: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="border-red-normal justify-center rounded-sm rounded-bl-3xl border-[1.5px] sm:max-w-md">
        <AlertDialogHeader className="items-center justify-center">
          <MdInfoOutline className="text-red-normal" size={24} />
          <AlertDialogTitle className="font-normal">
            {title || "Alert"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white-darker text-sm">
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
