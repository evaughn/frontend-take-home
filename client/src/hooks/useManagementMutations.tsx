import type { MutationObserverBaseResult, Override, UseMutateFunction } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseManagementMutationHookProps = {
  key: string;
  id: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

type HTTPMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type UseManagemenMutationHookResult = Override<MutationObserverBaseResult<Response, Error, void, unknown>, { mutate: Partial<UseMutateFunction<Response, Error, unknown, unknown>> }> ;

type UseManagementMutationHookMethod = <T extends UseManagementMutationHookProps, S extends HTTPMethods>(props: T, method: S) => UseManagemenMutationHookResult;

const useManagementMutation: UseManagementMutationHookMethod = (props: UseManagementMutationHookProps, method: HTTPMethods) => {
  const { key, id, onSuccess, onError } = props;
  const queryClient = useQueryClient();
  const isDeleteMethod = method === 'DELETE';


  const mutationResult = useMutation({
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