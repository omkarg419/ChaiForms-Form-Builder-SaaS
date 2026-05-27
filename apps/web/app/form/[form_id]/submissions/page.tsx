"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, FileText, Inbox } from "lucide-react";

import { useGetFormSubmissionsByFormId } from "~/hooks/api/form-submission";
import { useGetFormById } from "~/hooks/api/form";
import { useGetFieldsByFormId } from "~/hooks/api/form-field";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

type SubmissionValue = {
  formFieldId: string;
  value: string;
};

type SubmissionRecord = {
  id: string;
  createdAt: string | null;
  values: SubmissionValue[];
};

type FieldRecord = {
  id: string;
  label: string;
  type: string;
  index: string;
};

function getFormIdFromParams(params: Record<string, string | string[] | undefined>) {
  const value = params.form_id;
  return typeof value === "string" ? value : undefined;
}

function formatSubmittedAt(value: string | null) {
  if (!value) {
    return "Unknown time";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatSubmissionValue(value: string, fieldType: string) {
  if (fieldType === "YES_NO") {
    if (value === "true") return "Yes";
    if (value === "false") return "No";
  }

  return value || "-";
}

function formatFieldType(type: string) {
  return type.replaceAll("_", " ").toLowerCase();
}

export default function FormSubmissionsPage() {
  const params = useParams();
  const formId = getFormIdFromParams(params as Record<string, string | string[] | undefined>);

  const { form, isLoading: isFormLoading, isError: isFormError } = useGetFormById(formId);
  const { fields, isLoading: isFieldsLoading } = useGetFieldsByFormId(formId);
  const { submissions, isLoading, isError } = useGetFormSubmissionsByFormId(form?.id);

  if (isFormLoading || isFieldsLoading || (form && isLoading)) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
          <Card className="w-full border-zinc-700 bg-zinc-950 shadow-lg shadow-black/30">
            <CardContent className="flex items-center gap-3 py-12 text-zinc-400">
              <Loader2 className="size-5 animate-spin" />
              Loading submissions...
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (!formId || isFormError || (!isFormLoading && !form)) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
          <Card className="w-full border-zinc-700 bg-zinc-950 shadow-lg shadow-black/30">
            <CardHeader>
              <CardTitle className="text-2xl">Access denied</CardTitle>
              <CardDescription className="text-zinc-400">
                Only the creator of this form can view its submissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                asChild
                className="border-zinc-600 bg-black text-white hover:bg-zinc-900"
              >
                <Link href={formId ? `/form/${formId}` : "/dashboard"}>
                  <ArrowLeft className="size-4" />
                  Back to form
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
          <Card className="w-full border-zinc-700 bg-zinc-950 shadow-lg shadow-black/30">
            <CardHeader>
              <CardTitle className="text-2xl">Unable to load submissions</CardTitle>
              <CardDescription className="text-zinc-400">
                Please refresh the page and try again.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    );
  }

  const orderedFields = [...((fields ?? []) as FieldRecord[])].sort(
    (left, right) => Number(left.index) - Number(right.index),
  );
  const submissionRows = (submissions ?? []) as SubmissionRecord[];
  const latestSubmission = submissionRows.reduce<string | null>((latest, submission) => {
    if (!submission.createdAt) {
      return latest;
    }

    if (!latest) {
      return submission.createdAt;
    }

    return new Date(submission.createdAt).getTime() > new Date(latest).getTime()
      ? submission.createdAt
      : latest;
  }, null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-450 flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Inbox className="size-4 text-zinc-200" />
              Form submissions
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {form?.title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Review every response in a single expansive workspace. Fields are organized as
                columns so you can scan patterns, compare submissions, and move quickly.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start lg:self-auto">
            <Button
              variant="outline"
              asChild
              className="h-11 border-white/10 bg-white/5 px-4 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
            >
              <Link href={`/form/${formId}`}>
                <ArrowLeft className="size-4" />
                Back to form
              </Link>
            </Button>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <Card className="border-white/10 bg-white/4 text-white shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-3">
              <CardDescription className="text-zinc-400">Responses</CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight text-white">
                {submissionRows.length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-white/10 bg-white/4 text-white shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-3">
              <CardDescription className="text-zinc-400">Fields</CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight text-white">
                {orderedFields.length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-white/10 bg-white/4 text-white shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-3">
              <CardDescription className="text-zinc-400">Latest submission</CardDescription>
              <CardTitle className="text-base font-medium tracking-tight text-white sm:text-lg">
                {formatSubmittedAt(latestSubmission)}
              </CardTitle>
            </CardHeader>
          </Card>
        </section>

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/4.5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-medium text-white">Submission table</p>
              <p className="text-sm text-zinc-400">Columns follow the order of your form fields.</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">
              {submissionRows.length} response{submissionRows.length === 1 ? "" : "s"} collected
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            {submissionRows.length === 0 ? (
              <div className="flex h-full items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-md rounded-3xl border border-dashed border-white/12 bg-black/20 px-6 py-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200">
                    <FileText className="size-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">No submissions yet</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    When users submit this form, responses will appear here in a wide, readable
                    table.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-auto custom-scrollbar">
                <Table className="min-w-max border-separate border-spacing-0">
                  <TableHeader>
                    <TableRow className="border-white/10 bg-zinc-950/95 text-zinc-300 hover:bg-zinc-950/95">
                      <TableHead className="sticky top-0 z-10 min-w-45 border-b border-white/10 bg-zinc-950/95 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 backdrop-blur-xl">
                        Submission
                      </TableHead>
                      <TableHead className="sticky top-0 z-10 min-w-45 border-b border-white/10 bg-zinc-950/95 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 backdrop-blur-xl">
                        Submitted at
                      </TableHead>
                      {orderedFields.map((field) => (
                        <TableHead
                          key={field.id}
                          className="sticky top-0 z-10 min-w-60 border-b border-white/10 bg-zinc-950/95 px-5 py-4 text-left backdrop-blur-xl"
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-medium tracking-tight text-white">
                              {field.label}
                            </div>
                            <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                              {formatFieldType(field.type)}
                            </div>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {submissionRows.map((submission, submissionIndex) => {
                      const valuesByFieldId = new Map(
                        submission.values.map((value) => [value.formFieldId, value.value]),
                      );

                      return (
                        <TableRow
                          key={submission.id}
                          className="border-white/10 bg-transparent transition-colors hover:bg-white/4"
                        >
                          <TableCell className="px-5 py-4 align-top font-medium text-white">
                            <div className="flex flex-col gap-1">
                              <span>Submission {submissionIndex + 1}</span>
                              <span className="text-xs text-zinc-500">{submission.id}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-5 py-4 align-top text-zinc-300">
                            {formatSubmittedAt(submission.createdAt)}
                          </TableCell>
                          {orderedFields.map((field) => {
                            const value = valuesByFieldId.get(field.id) ?? "";

                            return (
                              <TableCell
                                key={`${submission.id}-${field.id}`}
                                className="px-5 py-4 align-top text-zinc-200"
                              >
                                <div className="max-w-70 whitespace-normal wrap-break-word leading-6">
                                  {formatSubmissionValue(value, field.type)}
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
