import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="max-h-full overflow-auto sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
