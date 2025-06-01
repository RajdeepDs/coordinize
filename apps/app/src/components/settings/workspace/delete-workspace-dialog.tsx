"use client";

import { Button } from "@coordinize/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coordinize/ui/components/dialog";
import { Input } from "@coordinize/ui/components/input";
import { Label } from "@coordinize/ui/components/label";
import { CircleAlertIcon } from "lucide-react";
import { useState } from "react";

interface DeleteWorkspaceDialogProps {
  WorkspaceName: string;
}

export default function DeleteWorkspaceDialog({
  WorkspaceName,
}: DeleteWorkspaceDialogProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="border-destructive-foreground font-normal text-destructive-foreground hover:bg-destructive/10 hover:text-destructive-foreground"
        >
          Delete workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Final confirmation
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter the
              workspace name{" "}
              <span className="text-foreground">{WorkspaceName}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label>Workspace name</Label>
            <Input
              type="text"
              placeholder={`Type ${WorkspaceName} to confirm`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="flex-1"
              disabled={inputValue !== WorkspaceName}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
