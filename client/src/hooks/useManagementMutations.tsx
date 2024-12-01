import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Role, User } from "../models";

type UseManagementMutationProps = {
  key: string;
  id: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const usePatchMutation = ({
  key,
  id,
  onSuccess,
  onError
}: UseManagementMutationProps) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationFn: (updatedEntry: Partial<User> | Partial<Role> ) => {
      return fetch(`http://localhost:3002/${key}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedEntry)
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [key, id] });
      queryClient.setQueryData([key, {id}], data )
      onSuccess?.();
    },
    onError: () => {
      onError?.();
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
    mutationFn: async (newMutation) => {
      return await fetch(`http://localhost:3002/${key}/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [key] })
      onSuccess?.();
    },
    onError: async () => {
      onError?.();
    }
  })

  return mutationResult;
}

export {
  useDeleteMutation,
  usePatchMutation
};
