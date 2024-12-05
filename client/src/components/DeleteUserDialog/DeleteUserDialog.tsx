import { notify } from "@app/components/ToastNotificationManager/ToastNotificationManager";
import { useDeleteMutation } from "@app/hooks/useManagementMutations";
import { User } from "@app/models";
import { Button, Dialog, Flex, Strong } from "@radix-ui/themes";

export type DeleteUserDialogProps = {
	user: Pick<User, 'first' | 'last' | 'id'>;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, open, onOpenChange, }) => {
	const deleteUser = useDeleteMutation({
		key: 'users',
		id: user.id,
		onSuccess: () => {
			notify({ type: 'success', content: `Sucessfully deleted ${user.first} ${user.last}` })
			onOpenChange(false);
		},
		onError: (error: Error) => {
			notify({ type: 'error', content: error.message });
			onOpenChange(false);
		}
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange} >
			<Dialog.Content maxWidth="450px">
				<Dialog.Title>Delete User</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Are you sure? The user <Strong>{user.first} {user.last} </Strong> will be permanently deleted.
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

