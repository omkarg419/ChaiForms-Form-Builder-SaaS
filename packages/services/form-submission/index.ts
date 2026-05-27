import { db, eq } from "@repo/database";
import { formFieldsTable } from "@repo/database/models/form-field";
import {
  formSubmissionsTable,
  type FormSubmissionValueRow,
} from "@repo/database/models/form-submission";
import { formsTable } from "@repo/database/models/form";
import { createFormSubmissionInput, type CreateFormSubmissionInputType } from "./model";

class FormSubmissionService {
  public async createFormSubmission(payload: CreateFormSubmissionInputType) {
    const { formId, values } = await createFormSubmissionInput.parseAsync(payload);

    const form = await db
      .select({ id: formsTable.id })
      .from(formsTable)
      .where(eq(formsTable.id, formId));
    if (!form || form.length === 0) {
      throw new Error("Form not found");
    }

    const fields = await db
      .select({ id: formFieldsTable.id, isRequired: formFieldsTable.isRequired })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId));

    const fieldMap = new Map(fields.map((field) => [field.id, field]));

    for (const value of values) {
      if (!fieldMap.has(value.formFieldId)) {
        throw new Error("One or more submitted fields do not belong to this form");
      }
    }

    const requiredFieldIds = fields.filter((field) => field.isRequired).map((field) => field.id);
    const submittedValueMap = new Map(
      values.map((value) => [value.formFieldId, value.value.trim()]),
    );

    for (const fieldId of requiredFieldIds) {
      if (!submittedValueMap.get(fieldId)) {
        throw new Error("Please fill all required fields before submitting the form");
      }
    }

    const normalizedValues: FormSubmissionValueRow = values.map((value) => ({
      formFieldId: value.formFieldId,
      value: value.value,
    }));

    const insertResult = await db
      .insert(formSubmissionsTable)
      .values({
        formId,
        values: normalizedValues,
      })
      .returning({ id: formSubmissionsTable.id });

    if (!insertResult || insertResult.length === 0 || !insertResult[0]?.id) {
      throw new Error("Failed to create form submission");
    }

    return {
      id: insertResult[0].id,
    };
  }
}

export default FormSubmissionService;
