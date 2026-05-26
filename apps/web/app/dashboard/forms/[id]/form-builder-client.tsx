"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useCreateField, useDeleteField, useUpdateField } from "~/hooks/api/form-field";
import { useGetField, useGetFieldsByFormId } from "~/hooks/api/form-field";
import { useGetFormById } from "~/hooks/api/form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

type FieldType = "TEXT" | "NUMBER" | "YES_NO" | "Password" | "EMAIL";

const FIELD_TYPES: FieldType[] = ["TEXT", "NUMBER", "YES_NO", "Password", "EMAIL"];

function formatDate(value: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function FieldEditor({
  fieldId,
  formId,
  onDone,
}: {
  fieldId: string;
  formId: string;
  onDone: () => void;
}) {
  const { field } = useGetField(fieldId);
  const { updateFieldAsync, status } = useUpdateField();
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [description, setDescription] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [index, setIndex] = useState("");
  const [type, setType] = useState<FieldType>("TEXT");

  useEffect(() => {
    if (!field) return;
    setLabel(field.label);
    setPlaceholder(field.placeholder ?? "");
    setDescription(field.description ?? "");
    setIsRequired(Boolean(field.isRequired));
    setIndex(field.index);
    setType(field.type);
  }, [field]);

  if (!field) return null;

  return (
    <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`edit-label-${fieldId}`}>Label</Label>
          <Input
            id={`edit-label-${fieldId}`}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`edit-type-${fieldId}`}>Type</Label>
          <select
            id={`edit-type-${fieldId}`}
            value={type}
            onChange={(e) => setType(e.target.value as FieldType)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            {FIELD_TYPES.map((fieldType) => (
              <option key={fieldType} value={fieldType}>
                {fieldType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`edit-placeholder-${fieldId}`}>Placeholder</Label>
          <Input
            id={`edit-placeholder-${fieldId}`}
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`edit-index-${fieldId}`}>Index</Label>
          <Input
            id={`edit-index-${fieldId}`}
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            placeholder="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`edit-description-${fieldId}`}>Description</Label>
        <Textarea
          id={`edit-description-${fieldId}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id={`edit-required-${fieldId}`}
          checked={isRequired}
          onCheckedChange={(value) => setIsRequired(Boolean(value))}
        />
        <Label htmlFor={`edit-required-${fieldId}`}>Required</Label>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={async () => {
            await updateFieldAsync({
              id: fieldId,
              label,
              placeholder: placeholder.trim().length ? placeholder : null,
              description: description.trim().length ? description : null,
              isRequired,
              index: index.trim().length ? Number(index) : undefined,
              type,
            });
            onDone();
          }}
          disabled={status === "pending"}
        >
          {status === "pending" ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function FormBuilderClient({ formId }: { formId?: string }) {
  const params = useParams();
  const effectiveFormId = formId ?? (params as any)?.id ?? "";

  const { form, isLoading: isFormLoading } = useGetFormById(effectiveFormId);
  const {
    fields,
    refetch: refetchFields,
    isLoading: isFieldsLoading,
  } = useGetFieldsByFormId(effectiveFormId);
  const { createFieldAsync, status: createStatus } = useCreateField();
  const { deleteFieldAsync, status: deleteStatus } = useDeleteField();
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [description, setDescription] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [index, setIndex] = useState("");
  const [type, setType] = useState<FieldType>("TEXT");

  const sortedFields = useMemo(() => fields ?? [], [fields]);

  const resetCreateForm = () => {
    setLabel("");
    setPlaceholder("");
    setDescription("");
    setIsRequired(false);
    setIndex("");
    setType("TEXT");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isFormLoading ? "Loading form..." : (form?.title ?? "Form not found")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Editing form <span className="font-medium text-foreground">{effectiveFormId}</span>
          </p>
          {form?.description ? (
            <p className="text-sm text-muted-foreground">{form.description}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">Fields</h2>
            <p className="text-sm text-muted-foreground">
              Create, edit, and remove fields for this form.
            </p>
          </div>

          {isFieldsLoading ? (
            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              Loading fields...
            </div>
          ) : sortedFields.length > 0 ? (
            <div className="space-y-3">
              {sortedFields.map((field) => (
                <div key={field.id} className="rounded-lg border p-4">
                  {editingFieldId === field.id ? (
                    <FieldEditor
                      fieldId={field.id}
                      formId={effectiveFormId}
                      onDone={() => setEditingFieldId(null)}
                    />
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{field.label}</h3>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                            {field.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {field.description ?? "No description"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Key: {field.labelKey} • Index: {field.index} • Required:{" "}
                          {field.isRequired ? "Yes" : "No"}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingFieldId(field.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={async () => {
                            await deleteFieldAsync({ id: field.id });
                            await refetchFields();
                          }}
                          disabled={deleteStatus === "pending"}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              No fields yet. Add your first field using the form on the right.
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Add Field</h2>
            <p className="text-sm text-muted-foreground">Create a new field for this form.</p>
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-label">Label</Label>
              <Input
                id="field-label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="First Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-placeholder">Placeholder</Label>
              <Input
                id="field-placeholder"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-description">Description</Label>
              <Textarea
                id="field-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Help text for the field"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="field-index">Index</Label>
                <Input
                  id="field-index"
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  placeholder="Leave empty for auto-order"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="field-type">Type</Label>
                <select
                  id="field-type"
                  value={type}
                  onChange={(e) => setType(e.target.value as FieldType)}
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {FIELD_TYPES.map((fieldType) => (
                    <option key={fieldType} value={fieldType}>
                      {fieldType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="field-required"
                checked={isRequired}
                onCheckedChange={(value) => setIsRequired(Boolean(value))}
              />
              <Label htmlFor="field-required">Required</Label>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={async () => {
                  if (!effectiveFormId) {
                    console.error("Missing formId for createField");
                    return;
                  }

                  const fieldLabel = label.trim().length ? label : "Untitled Field";

                  await createFieldAsync({
                    label: fieldLabel,
                    placeholder: placeholder.trim().length ? placeholder : null,
                    description: description.trim().length ? description : null,
                    isRequired,
                    index: index.trim().length ? Number(index) : undefined,
                    type,
                    formId: effectiveFormId,
                  });

                  resetCreateForm();
                  await refetchFields();
                }}
                disabled={createStatus === "pending" || !effectiveFormId}
              >
                {createStatus === "pending" ? "Creating..." : "Add Field"}
              </Button>
              <Button type="button" variant="outline" onClick={resetCreateForm}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
