import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.getFormsByUser.invalidate();
    },
  });

  return {
    createFormAsync,
    createForm,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useGetFormsByUser = () => {
  const {
    data: forms,
    error,
    isError,
    isSuccess,
    refetch,
    status,
    isLoading,
    isFetching,
    isFetched,
  } = trpc.form.getFormsByUser.useQuery();

  return {
    forms,
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

export const useGetFormById = (id?: string) => {
  const {
    data: form,
    error,
    isError,
    isSuccess,
    refetch,
    status,
    isLoading,
    isFetching,
    isFetched,
  } = trpc.form.getFormById.useQuery({ id: id ?? "" }, { enabled: Boolean(id) });

  return {
    form,
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
