"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Lock, Sparkles } from "lucide-react";

import { useGetPublicForm } from "~/hooks/api/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type FormField = {
  id: string;
  label: string;
  labelKey: string;
  placeholder: string | null;
  description: string | null;
  isRequired: boolean;
  index: string;
  type: "TEXT" | "NUMBER" | "YES_NO" | "Password" | "EMAIL";
  formId: string;
  createdAt: string | null;
  updatedAt: string | null;
};

function getFormIdFromParams(params: Record<string, string | string[] | undefined>) {
  const value = params.form_id;
  return typeof value === "string" ? value : undefined;
}

function renderField(field: FormField) {
  const commonDescription = field.description ? (
    <p className="text-sm leading-6 text-zinc-400">{field.description}</p>
  ) : null;

  switch (field.type) {
    case "YES_NO":
      return (
        <div
          key={field.id}
          className="flex items-start gap-3 rounded-lg border border-zinc-700 bg-zinc-900 p-4"
        >
          <Checkbox
            id={field.id}
            required={field.isRequired}
            className="border-zinc-500 data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-950"
          />
          <div className="grid gap-1.5">
            <Label htmlFor={field.id} className="text-base text-white">
              {field.label}
              {field.isRequired ? <span className="text-zinc-400"> *</span> : null}
            </Label>
            {commonDescription}
          </div>
        </div>
      );
    case "NUMBER":
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id} className="text-white">
            {field.label}
            {field.isRequired ? <span className="text-zinc-400"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            type="number"
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
            className="border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-white/20"
          />
          {commonDescription}
        </div>
      );
    case "Password":
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id} className="text-white">
            {field.label}
            {field.isRequired ? <span className="text-zinc-400"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            type="password"
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
            className="border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-white/20"
          />
          {commonDescription}
        </div>
      );
    case "EMAIL":
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id} className="text-white">
            {field.label}
            {field.isRequired ? <span className="text-zinc-400"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            type="email"
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
            className="border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-white/20"
          />
          {commonDescription}
        </div>
      );
    default:
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id} className="text-white">
            {field.label}
            {field.isRequired ? <span className="text-zinc-400"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
            className="border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-white/20"
          />
          {commonDescription}
        </div>
      );
  }
}

export default function PublicFormPage() {
  const params = useParams();
  const formId = getFormIdFromParams(params as Record<string, string | string[] | undefined>);
  const { form, isLoading, isError } = useGetPublicForm(formId);

  if (!formId) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#000000_0%,#111111_42%,#a1a1aa_100%)] px-4 py-10 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <Card className="w-full border-zinc-700 bg-zinc-950 shadow-lg shadow-black/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Form not found</CardTitle>
              <CardDescription className="text-zinc-400">
                The public form URL is missing a form id.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">Check the shared link and try again.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#000000_0%,#111111_42%,#a1a1aa_100%)] px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <Card className="w-full border-zinc-700 bg-zinc-950 shadow-lg shadow-black/30 backdrop-blur">
            <CardContent className="flex items-center gap-3 py-12 text-zinc-400">
              <Loader2 className="size-5 animate-spin" />
              Loading public form...
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (isError || !form) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#000000_0%,#111111_42%,#a1a1aa_100%)] px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <Card className="w-full border-zinc-700 bg-zinc-950 shadow-lg shadow-black/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Form not available</CardTitle>
              <CardDescription className="text-zinc-400">
                This public form link is invalid or the form no longer exists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="border-zinc-600 bg-black text-white hover:bg-zinc-900"
              >
                <a href="/dashboard">
                  <ArrowLeft className="size-4" />
                  Back to dashboard
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_24%),linear-gradient(180deg,#000000_0%,#111111_42%,#a1a1aa_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3 text-zinc-300">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="size-4 text-white" />
            Public form
          </div>
          <div className="flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-200">
            <Lock className="size-3.5" />
            Shared link
          </div>
        </div>

        <Card className="overflow-hidden border-zinc-700 bg-zinc-950 shadow-xl shadow-black/30 backdrop-blur">
          <CardHeader className="border-b border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
            <CardTitle className="text-3xl tracking-tight text-white sm:text-4xl">
              {form.title}
            </CardTitle>
            {form.description ? (
              <CardDescription className="max-w-2xl text-base leading-7 text-zinc-400">
                {form.description}
              </CardDescription>
            ) : (
              <CardDescription className="max-w-2xl text-base leading-7 text-zinc-400">
                Fill out this form and submit your response.
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6 py-6">
            <form className="space-y-5">
              {form.fields.length > 0 ? (
                form.fields.map((field) => renderField(field))
              ) : (
                <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900 px-4 py-8 text-sm text-zinc-400">
                  This form does not have any fields yet.
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="text-xs text-zinc-400">
                  Responses are collected securely through this shared link.
                </p>
                <Button
                  type="submit"
                  className="min-w-32 border border-white bg-white text-black hover:bg-zinc-200"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
