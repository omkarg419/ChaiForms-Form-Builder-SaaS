import { z } from "zod";
export declare const createFieldInputModel: z.ZodObject<{
    label: z.ZodString;
    placeholder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    index: z.ZodOptional<z.ZodNumber>;
    type: z.ZodEnum<{
        TEXT: "TEXT";
        NUMBER: "NUMBER";
        YES_NO: "YES_NO";
        Password: "Password";
        EMAIL: "EMAIL";
    }>;
    formId: z.ZodString;
}, z.core.$strip>;
export declare const createFieldOutputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteFieldInputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const deleteFieldOutputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const updateFieldInputModel: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    index: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        TEXT: "TEXT";
        NUMBER: "NUMBER";
        YES_NO: "YES_NO";
        Password: "Password";
        EMAIL: "EMAIL";
    }>>;
}, z.core.$strip>;
export declare const updateFieldOutputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const getFieldInputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const getFieldsByFormIdInputModel: z.ZodObject<{
    formId: z.ZodString;
}, z.core.$strip>;
export declare const formFieldItemModel: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    labelKey: z.ZodString;
    placeholder: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    index: z.ZodString;
    type: z.ZodEnum<{
        TEXT: "TEXT";
        NUMBER: "NUMBER";
        YES_NO: "YES_NO";
        Password: "Password";
        EMAIL: "EMAIL";
    }>;
    formId: z.ZodString;
    createdAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const getFieldOutputModel: z.ZodNullable<z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    labelKey: z.ZodString;
    placeholder: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    index: z.ZodString;
    type: z.ZodEnum<{
        TEXT: "TEXT";
        NUMBER: "NUMBER";
        YES_NO: "YES_NO";
        Password: "Password";
        EMAIL: "EMAIL";
    }>;
    formId: z.ZodString;
    createdAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
export declare const getFieldsByFormIdOutputModel: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    labelKey: z.ZodString;
    placeholder: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    index: z.ZodString;
    type: z.ZodEnum<{
        TEXT: "TEXT";
        NUMBER: "NUMBER";
        YES_NO: "YES_NO";
        Password: "Password";
        EMAIL: "EMAIL";
    }>;
    formId: z.ZodString;
    createdAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
//# sourceMappingURL=model.d.ts.map