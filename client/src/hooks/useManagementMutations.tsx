import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Role, User } from "../models";

type UseManagementMutationProps = {
  key: string;
  id: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const usePatchMutation = ({
  key,
  id,
  onSuccess,
  onError
}: UseManagementMutationProps) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationFn: (updatedEntry: Partial<User> | Partial<Role>) => {
      return fetch(`/api/${key}/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData([key, id], data);
      queryClient.invalidateQueries({ queryKey: [key] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    }
  })

  return mutationResult;
}

const useDeleteMutation = ({
  key,
  id,
  onSuccess,
  onError
}: UseManagementMutationProps) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationFn: (newMutation) => {
      return fetch(`/api/${key}/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    }
  })

  return mutationResult;
}

export {
  useDeleteMutation,
  usePatchMutation
};
