import { FormBuilderClient } from "./form-builder-client";

export default function FormBuilderPage({ params }: { params: { id: string } }) {
  return <FormBuilderClient formId={params.id} />;
}
