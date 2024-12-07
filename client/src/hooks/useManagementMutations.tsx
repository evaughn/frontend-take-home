import type { Override, UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseManagementMutationProps = {
  key: string;
  id: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

type HTTPMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type UseManagementMutate = UseMutateFunction & (() => void);

type UseManagementMutationResult = UseMutationResult & {
  mutate: UseManagementMutate
};

const useManagementMutation = (props: UseManagementMutationProps, method: HTTPMethods) => {
  const { key, id, onSuccess, onError } = props;
  const queryClient = useQueryClient();
  const isDeleteMethod = method === 'DELETE';



  const mutationResult: UseManagementMutationResult = useMutation({
    mutationFn: (args) => {
      return fetch(`/api/${key}/${id}`, {
        method,
        headers: {
          'content-type': 'application/json',
        },
        ...(!isDeleteMethod && {
          body: JSON.stringify(args),
        })
      });
    },
    onSuccess: async (data) => {
      if (!isDeleteMethod) {
        await queryClient.setQueryData([key, id], data);
      }

      await queryClient.invalidateQueries({ queryKey: [key] });
      onSuccess?.();

    },
    onError: async (error: Error) => {
      onError?.(error);
    }
  });


  return mutationResult;
}

export default useManagementMutation;