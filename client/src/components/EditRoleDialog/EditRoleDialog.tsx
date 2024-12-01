import { UpdateIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { usePatchMutation } from "../../hooks/useManagementMutations";
import { Role } from "../../models";

export type EditRoleDialogProps = {
	role: Pick<Role, 'id' | 'name'>;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const EditRoleDialog: React.FC<EditRoleDialogProps> = ({ role, open, onOpenChange }) => {
	const renameRole = usePatchMutation({
		key: 'roles',
		id: role.id,
		onSuccess: () => {
			onOpenChange(false);
		},
		onError: () => {
			console.log('Unexpected error')
		}
	});

	const [updatedName, setUpdatedName] = useState<string>(role.name);

	const onFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		renameRole.mutate({name: updatedName, updatedAt: new Date().toISOString() });
	}, [renameRole, updatedName])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} >
			<Dialog.Content maxWidth="450px">
				<Dialog.Title>Rename {role.name} role</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Type the updated name for the {role.name} role
				</Dialog.Description>

				<form onSubmit={onFormSubmit}>
					<TextField.Root placeholder={role.name} name="updatedRoleName" onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedName(e.target.value)}>
            <TextField.Slot>
              <UpdateIcon />
            </TextField.Slot>
          </TextField.Root>
					<Flex gap="3" mt="4" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray" type="button" onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
						</Dialog.Close>
						<Dialog.Close>
							<Button type="submit">Update</Button>
						</Dialog.Close>
					</Flex>
				</form>

				
				
			</Dialog.Content>
		</Dialog.Root>
  )
}

export default EditRoleDialog;

