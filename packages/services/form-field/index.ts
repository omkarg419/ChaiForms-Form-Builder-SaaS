import { db, eq, desc } from "@repo/database";
import { formFieldsTable } from "@repo/database/models/form-field";
import {
  createFieldInput,
  type CreateFieldInputType,
  updateFieldInput,
  type UpdateFieldInputType,
} from "./model";

function slugifyLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\-]/g, "");
}

class FormFieldService {
  public async getField(id: string) {
    const result = await db.select().from(formFieldsTable).where(eq(formFieldsTable.id, id));

    if (!result || result.length === 0) {
      return null;
    }

    return result[0]!;
  }

  public async createField(payload: Partial<CreateFieldInputType>) {
    const now = Date.now();
    const data = await createFieldInput.parseAsync({
      label: String(payload.label ?? ""),
      // labelKey may be provided; otherwise generate from label
      labelKey: payload.labelKey ?? slugifyLabel(String(payload.label ?? `field_${now}`)),
      placeholder: payload.placeholder ?? null,
      description: payload.description ?? null,
      isRequired: payload.isRequired ?? false,
      index: payload.index ?? 0,
      type: (payload.type ?? "TEXT") as CreateFieldInputType["type"],
      formId: String(payload.formId),
    });

    // If index is 0 or not provided, compute next index
    let indexToUse = data.index;
    if (!data.index || data.index === 0) {
      const last = await db
        .select()
        .from(formFieldsTable)
        .where(eq(formFieldsTable.formId, data.formId))
        .orderBy(desc(formFieldsTable.index))
        .limit(1);

      const lastIndex = last && last.length > 0 && last[0]?.index ? Number(last[0]?.index) : 0;
      indexToUse = lastIndex + 1;
    }

    const insertResult = await db
      .insert(formFieldsTable)
      .values([
        {
          label: data.label,
          labelKey: data.labelKey,
          placeholder: data.placeholder ?? null,
          description: data.description ?? null,
          isRequired: data.isRequired ?? false,
          index: String(indexToUse),
          type: data.type,
          formId: data.formId,
        },
      ])
      .returning({ id: formFieldsTable.id });

    if (!insertResult || insertResult.length === 0 || !insertResult[0]?.id) {
      throw new Error("Failed to create form field");
    }

    return { id: insertResult[0].id };
  }

  public async deleteField(id: string) {
    const result = await db
      .delete(formFieldsTable)
      .where(eq(formFieldsTable.id, id))
      .returning({ id: formFieldsTable.id });
    if (!result || result.length === 0) {
      throw new Error("Field not found or already deleted");
    }
    return { id: result[0]?.id };
  }

  public async updateField(payload: UpdateFieldInputType) {
    const { id, label, placeholder, description, isRequired, index, type } =
      await updateFieldInput.parseAsync(payload);

    const updateValues: Record<string, any> = {};
    if (label !== undefined) updateValues.label = label;
    if (placeholder !== undefined) updateValues.placeholder = placeholder;
    if (description !== undefined) updateValues.description = description;
    if (isRequired !== undefined) updateValues.isRequired = isRequired;
    if (index !== undefined) updateValues.index = String(index);
    if (type !== undefined) updateValues.type = type;

    if (Object.keys(updateValues).length === 0) {
      throw new Error("No fields to update");
    }

    const result = await db
      .update(formFieldsTable)
      .set(updateValues)
      .where(eq(formFieldsTable.id, id))
      .returning({ id: formFieldsTable.id });

    if (!result || result.length === 0) {
      throw new Error("Field not found");
    }

    return { id: result[0]?.id };
  }
}

export default FormFieldService;
