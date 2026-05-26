"use client";

import { FormEvent, useState } from "react";

import { useCreateForm } from "~/hooks/api/form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function CreateFormDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createFormAsync, status, isError, error, reset } = useCreateForm();

  const isSubmitting = status === "pending";

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTitle("");
      setDescription("");
      reset();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createFormAsync({
      title,
      description: description.trim().length > 0 ? description : null,
    });

    setOpen(false);
    setTitle("");
    setDescription("");
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create New Form</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Form</DialogTitle>
          <DialogDescription>
            Add a title and optional description. You can add form fields after creation.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="form-title">Title</Label>
            <Input
              id="form-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Customer Feedback Form"
              maxLength={55}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-description">Description</Label>
            <Textarea
              id="form-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Collect feedback for our onboarding flow"
              maxLength={300}
              rows={4}
            />
          </div>

          {isError ? (
            <p className="text-sm text-destructive">{error?.message ?? "Failed to create form"}</p>
          ) : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || title.trim().length === 0}>
              {isSubmitting ? "Creating..." : "Create Form"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
