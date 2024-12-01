import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useDeleteMutation } from "../../hooks/useManagementMutations";
import { User } from "../../models";

export type DeleteUserDialogProps = {
	user: Pick<User, 'first' | 'last'| 'id'>;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, open, onOpenChange,  }) => {
	const deleteUser = useDeleteMutation({
		key: 'users',
		id: user.id,
		onSuccess: () => {
			onOpenChange(false);
		},
		onError: () => {
			console.log('Unexpected error')
		}
	});

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} >
			<Dialog.Content maxWidth="450px">
				<Dialog.Title>Delete User</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Are you sure? The user {user.first} {user.last} will be permanently deleted.
				</Dialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button variant="soft" color="gray" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button onClick={() => deleteUser.mutate()}>Delete User</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
  )
}

export default DeleteUserDialog;

