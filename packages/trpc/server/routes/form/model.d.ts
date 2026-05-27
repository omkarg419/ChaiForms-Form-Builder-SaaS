import { z } from "zod";
export declare const createFormInputModel: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createFormOutputModel: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
export declare const formItemModel: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const getFormsByUserOutputModel: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
export declare const getFormByUserInputModel: z.ZodUndefined;
export declare const getFormByIdInputModel: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const getFormByIdOutputModel: z.ZodNullable<z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
export declare const getFormPublicOutputModel: z.ZodNullable<z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    fields: z.ZodArray<z.ZodObject<{
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
}, z.core.$strip>>;
//# sourceMappingURL=model.d.ts.map