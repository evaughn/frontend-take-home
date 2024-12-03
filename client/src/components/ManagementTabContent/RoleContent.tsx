import { CheckIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { PagedData, Role } from '../../models';
import EditRoleDialog, { type EditRoleDialogProps } from '../EditRoleDialog/EditRoleDialog';
import * as ManagementTabContent from '../ManagementTabContent/ManagementTabContentBase';

type RoleContentProps = {
  data: PagedData<Role>;
  currentPageIndex: number;
  updatePageIndex: (page: number) => void;
  isRefetching: boolean;
}

const RoleContent: React.FC<RoleContentProps> = ({ data, currentPageIndex, updatePageIndex, isRefetching }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<EditRoleDialogProps['role'] | null>(null);

  const onEditMenuItemClick = useCallback((role: Role) => {
    const { id, name, isDefault } = role;
    setSelectedRole({ id, name, isDefault });
    setIsDialogOpen(true);
  }, []);

  const sortedData = data.data.sort((a) => { return a.isDefault ? -1 : 0 });

  let updatedData = {
    ...data,
    data: sortedData
  };

  return (
    <ManagementTabContent.Root>
      <ManagementTabContent.SearchBar setSearch={() => { }} placeholder='Search roles' createAction={{ text: 'Add role', disabled: true }} />
      <ManagementTabContent.Table<Role>
        isRefetching={isRefetching}
        tableData={updatedData}
        currentPageIndex={currentPageIndex}
        updatePageIndex={updatePageIndex}
        tableLayout={[
          {
            columnTitle: 'Name',
            rowDisplay: (role: Role) => (
              <Text>
                {role.name}
              </Text>)
          },
          {
            columnTitle: 'Description',
            rowDisplay: (role: Role) => (
              <Text>
                {role.description}
              </Text>)
          },
          {
            columnTitle: 'Default role',
            rowDisplay: (role: Role) => (
              <>
                {role.isDefault && <CheckIcon />}
              </>)
          },
        ]}
        moreMenu={[{ text: 'Edit role', onClick: onEditMenuItemClick }, { text: 'Delete role' }]}
      />
      {selectedRole && <EditRoleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} role={selectedRole} />}
    </ManagementTabContent.Root>
  );
}

export default RoleContent;