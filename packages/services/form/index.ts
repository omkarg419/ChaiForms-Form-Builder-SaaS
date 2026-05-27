import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form-field";
import { createFormInput, type CreateFormInputType } from "./model";

class FormService {
  public async createForm(payload: CreateFormInputType) {
    const { title, description, createdBy } = await createFormInput.parseAsync(payload);

    const insertResult = await db
      .insert(formsTable)
      .values({ title, description: description ?? null, createdBy })
      .returning({ id: formsTable.id, createdAt: formsTable.createdAt });

    if (!insertResult || insertResult.length === 0 || !insertResult[0]?.id) {
      throw new Error("Failed to create form");
    }

    return {
      id: insertResult[0].id,
      createdAt: insertResult[0].createdAt,
    };
  }

  public async getFormById(id: string) {
    const result = await db.select().from(formsTable).where(eq(formsTable.id, id));
    if (!result || result.length === 0) return null;
    return result[0]!;
  }

  public async getFormByIdWithFields(id: string) {
    const rows = await db
      .select({
        form: formsTable,
        field: formFieldsTable,
      })
      .from(formsTable)
      .leftJoin(formFieldsTable, eq(formsTable.id, formFieldsTable.formId))
      .where(eq(formsTable.id, id))
      .orderBy(formFieldsTable.index);

    if (!rows || rows.length === 0) {
      return null;
    }

    const form = rows[0]!.form;
    const fields = rows
      .map((row) => row.field)
      .filter((field): field is NonNullable<typeof field> => Boolean(field));

    return {
      ...form,
      fields,
    };
  }

  public async getFormsByUser(userId: string) {
    const result = await db.select().from(formsTable).where(eq(formsTable.createdBy, userId));
    return result;
  }
}

export default FormService;
