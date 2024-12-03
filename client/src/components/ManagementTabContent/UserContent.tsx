import {
  Avatar, Text
} from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { PagedData, Role, User } from '../../models';
import { formatDate } from '../../utils';
import DeleteUserDialog, { type DeleteUserDialogProps } from '../DeleteUserDialog/DeleteUserDialog';
import * as ManagementTableContent from "../ManagementTabContent/ManagementTabContentBase";

type UserContentProps = {
  data: PagedData<User>;
  currentPageIndex: number;
  updatePageIndex: (page: number) => void;
  setSearch: (search: string) => void;
  roles: Role[];
  isRefetching: boolean;
}

const UserContent: React.FC<UserContentProps> = ({ data, currentPageIndex, updatePageIndex, setSearch, roles, isRefetching }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DeleteUserDialogProps['user'] | null>(null);

  const onDeleteMenuItemClick = useCallback((user: User) => {
    const { id, first, last } = user;
    setSelectedUser({ id, first, last });
    setIsDialogOpen(true);
  }, []);

  return (
    <ManagementTableContent.Root>
      <ManagementTableContent.SearchBar setSearch={setSearch} placeholder='Search users' createAction={{ text: 'Add user', disabled: true }} />
      <ManagementTableContent.Table<User>
        tableData={data}
        isRefetching={isRefetching}
        currentPageIndex={currentPageIndex}
        updatePageIndex={updatePageIndex}
        tableLayout={[
          {
            columnTitle: 'User',
            rowDisplay: (user: User) => (
              <Text>
                <Avatar
                  size="1"
                  radius="full"
                  src={user?.photo}
                  fallback={user.first.charAt(0) + user.last.charAt(0)}
                /> {user.first} {user.last}
              </Text>)


          },
          {
            columnTitle: 'Role', rowDisplay: (user: User) => <Text>
              {roles.find((role: Role) => role.id === user.roleId)?.name}
            </Text>
          },
          { columnTitle: 'Joined', rowDisplay: (user: User) => formatDate(new Date(user.createdAt)) }
        ]}
        moreMenu={[{ text: 'Edit user' }, { text: 'Delete user', onClick: onDeleteMenuItemClick }]}
      />
      {selectedUser && <DeleteUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={selectedUser} />}
    </ManagementTableContent.Root>
  );
}

export default UserContent;