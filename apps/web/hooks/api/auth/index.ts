import { trpc } from "~/trpc/client";

export const useSignup = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: createUserWithEmailAndPasswordAsync,
    mutate: createUserWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useLogin = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: signInWithEmailAndPasswordAsync,
    mutate: signInWithEmailAndPassword,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  } = trpc.auth.signinUserWithEmailAndPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    signInWithEmailAndPasswordAsync,
    signInWithEmailAndPassword,
    error,
    isError,
    isIdle,
    isSuccess,
    reset,
    status,
  };
};

export const useGetLoggedInUser = () => {
  const {
    data: user,
    error,
    isError,
    isSuccess,
    refetch,
    status,
    isLoading,
    isFetching,
    isFetched,
  } = trpc.auth.getLoggedInUserInfo.useQuery();

  return {
    user,
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
