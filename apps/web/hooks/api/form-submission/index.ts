import { trpc } from "~/trpc/client";

export const useCreateFormSubmission = () => {
  const {
    mutateAsync: createFormSubmissionAsync,
    mutate: createFormSubmission,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.formSubmission.createFormSubmission.useMutation();

  return {
    createFormSubmissionAsync,
    createFormSubmission,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useGetFormSubmissionsByFormId = (formId?: string) => {
  const {
    data: submissions,
    error,
    isError,
    isSuccess,
    refetch,
    status,
    isLoading,
    isFetching,
    isFetched,
  } = trpc.formSubmission.getFormSubmissionsByFormId.useQuery(
    { formId: formId ?? "" },
    { enabled: Boolean(formId) },
  );

  return {
    submissions,
    error,
    isError,
    isSuccess,
    refetch,
    status,
    isLoading,
    isFetching,
    isFetched,
  };
};
