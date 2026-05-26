import { trpc } from "~/trpc/client";

export const useCreateField = () => {
  const {
    mutateAsync: createFieldAsync,
    mutate: createField,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.formField.createField.useMutation();

  return {
    createFieldAsync,
    createField,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useDeleteField = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: deleteFieldAsync,
    mutate: deleteField,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.formField.deleteField.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.formField.getField.invalidate({ id: variables.id });
    },
  });

  return {
    deleteFieldAsync,
    deleteField,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useUpdateField = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: updateFieldAsync,
    mutate: updateField,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.formField.updateField.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.formField.getField.invalidate({ id: variables.id });
    },
  });

  return {
    updateFieldAsync,
    updateField,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useGetField = (id: string) => {
  const {
    data: field,
    error,
    isError,
    isSuccess,
    refetch,
    status,
    isLoading,
    isFetching,
    isFetched,
  } = trpc.formField.getField.useQuery({ id });

  return {
    field,
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
