import { BadgeIcon } from "@radix-ui/react-icons";
import { Button, Checkbox, Dialog, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import useManagementMutation from "../../hooks/useManagementMutations";
import { Role } from "../../models";
import { notify } from "../ToastNotificationManager/ToastNotificationManager";

export type EditRoleDialogProps = {
	role: Pick<Role, 'id' | 'name' | 'isDefault'>;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const EditRoleDialog: React.FC<EditRoleDialogProps> = ({ role, open, onOpenChange }) => {
	const { id: roleId, isDefault, name } = role;
  const renameRole = useManagementMutation({
		key: 'roles',
		id: roleId,
		onSuccess: () => {
			notify({ type: 'success', content: `Sucessfully updated role` })
			onOpenChange(false);
		},
		onError: (error: Error) => {
			notify({ type: 'error', content: error.message })
			onOpenChange(false);
		}
  }, "PATCH");

	const [updatedName, setUpdatedName] = useState<string>(name);
	const [isDefaultRole, setDefaultRole] = useState<boolean>(isDefault)

	const onFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		renameRole.mutate({ name: updatedName, isDefault: isDefaultRole });
	}, [renameRole, updatedName, isDefaultRole])

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange} >
			<Dialog.Content maxWidth="450px">
				<Dialog.Title>Rename role</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					<Text>Set the updated name for the <Strong>{role.name}</Strong> role</Text>
				</Dialog.Description>

				<form onSubmit={onFormSubmit}>
					<TextField.Root placeholder={role.name} name="updatedRoleName" onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedName(e.target.value)}>
						<TextField.Slot>
							<BadgeIcon />
						</TextField.Slot>
					</TextField.Root>
					<Text as="label" size="2">
						<Flex gap="2" justify={"end"} pt='2'>
							<Checkbox checked={isDefaultRole} onCheckedChange={() => setDefaultRole(!isDefaultRole)} />
							Set default role
						</Flex>
					</Text>
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

