"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Lock, Sparkles } from "lucide-react";

import { useGetPublicForm } from "~/hooks/api/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

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
    <p className="text-sm leading-6 text-muted-foreground">{field.description}</p>
  ) : null;

  switch (field.type) {
    case "YES_NO":
      return (
        <div key={field.id} className="flex items-start gap-3 rounded-lg border p-4">
          <Checkbox id={field.id} required={field.isRequired} />
          <div className="grid gap-1.5">
            <Label htmlFor={field.id} className="text-base">
              {field.label}
              {field.isRequired ? <span className="text-destructive"> *</span> : null}
            </Label>
            {commonDescription}
          </div>
        </div>
      );
    case "NUMBER":
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id}>
            {field.label}
            {field.isRequired ? <span className="text-destructive"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            type="number"
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
          />
          {commonDescription}
        </div>
      );
    case "Password":
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id}>
            {field.label}
            {field.isRequired ? <span className="text-destructive"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            type="password"
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
          />
          {commonDescription}
        </div>
      );
    case "EMAIL":
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id}>
            {field.label}
            {field.isRequired ? <span className="text-destructive"> *</span> : null}
          </Label>
          <Input
            id={field.id}
            name={field.labelKey}
            type="email"
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
          />
          {commonDescription}
        </div>
      );
    default:
      return (
        <div key={field.id} className="grid gap-2.5">
          <Label htmlFor={field.id}>
            {field.label}
            {field.isRequired ? <span className="text-destructive"> *</span> : null}
          </Label>
          <Textarea
            id={field.id}
            name={field.labelKey}
            placeholder={field.placeholder ?? undefined}
            required={field.isRequired}
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_30%),linear-gradient(180deg,#fff9ef_0%,#fff_45%,#f8fafc_100%)] px-4 py-10">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <Card className="w-full border-amber-200/70 bg-white/90 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Form not found</CardTitle>
              <CardDescription>The public form URL is missing a form id.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Check the shared link and try again.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_30%),linear-gradient(180deg,#fff9ef_0%,#fff_45%,#f8fafc_100%)] px-4 py-10">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <Card className="w-full border-amber-200/70 bg-white/90 shadow-lg backdrop-blur">
            <CardContent className="flex items-center gap-3 py-12 text-muted-foreground">
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_30%),linear-gradient(180deg,#fff9ef_0%,#fff_45%,#f8fafc_100%)] px-4 py-10">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <Card className="w-full border-amber-200/70 bg-white/90 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Form not available</CardTitle>
              <CardDescription>
                This public form link is invalid or the form no longer exists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_30%),linear-gradient(180deg,#fff9ef_0%,#fff_45%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-amber-500" />
            Public form
          </div>
          <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <Lock className="size-3.5" />
            Shared link
          </div>
        </div>

        <Card className="overflow-hidden border-amber-200/70 bg-white/90 shadow-xl shadow-amber-950/5 backdrop-blur">
          <CardHeader className="border-b border-amber-100 bg-linear-to-br from-amber-50 via-white to-orange-50/70">
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">{form.title}</CardTitle>
            {form.description ? (
              <CardDescription className="max-w-2xl text-base leading-7 text-muted-foreground">
                {form.description}
              </CardDescription>
            ) : (
              <CardDescription className="max-w-2xl text-base leading-7 text-muted-foreground">
                Fill out this form and submit your response.
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="space-y-6 py-6">
            <form className="space-y-5">
              {form.fields.length > 0 ? (
                form.fields.map((field) => renderField(field))
              ) : (
                <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/50 px-4 py-8 text-sm text-muted-foreground">
                  This form does not have any fields yet.
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="text-xs text-muted-foreground">
                  Responses are collected securely through this shared link.
                </p>
                <Button type="submit" className="min-w-32">
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
