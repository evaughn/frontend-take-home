import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../components/ToastNotificationManager/ToastNotificationManager";
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
    mutationFn: async (updatedEntry: Partial<User> | Partial<Role>) => {
      return await fetch(`http://localhost:3002/${key}/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });
    },
    onSuccess: async (data) => {
      notify({ type: 'success', content: `Sucessfully updated ${key}` })
      queryClient.setQueryData([key, id], data);
      queryClient.invalidateQueries({ queryKey: [key] });
      onSuccess?.();
    },
    onError: () => {
      notify({ type: 'error', content: `Something went wrong` })
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
        headers: {
          'content-type': 'application/json',
        },
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
