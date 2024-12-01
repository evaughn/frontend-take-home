import { DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Section, Table, TextField
} from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { PagedData, User } from '../../models';
import { formatDate } from '../../utils';
import DeleteUserDialog, { type DeleteUserDialogProps } from '../DeleteUserDialog/DeleteUserDialog';

type UserContentProps = {
  data: PagedData<User>;
  currentPageIndex: number;
  updatePageIndex: (page: number) => void;
}

const UserContent: React.FC<UserContentProps> = ({ data, currentPageIndex, updatePageIndex }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DeleteUserDialogProps['user'] | null>(null);

  const onDeleteMenuItemClick = useCallback((user: User) => {
    const { id, first, last } = user;
    setSelectedUser({ id, first, last });
    setIsDialogOpen(true);
  }, []);

  return (
    <Section size="1">
      <Flex gap="3">
        <Box pb="20px" flexGrow="1">
          <TextField.Root placeholder="Search users">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

        </Box>
        <Button>
          <PlusIcon /> Add user
        </Button>
      </Flex>


      <Box>
        <Table.Root variant="surface" size="1">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                User
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Role
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Joined
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>

              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.data.map((user: User) => (
              <Table.Row>
                <Table.RowHeaderCell>
                  <Avatar size="1" radius="full" src={user?.photo} fallback={user.first.charAt(0) + user.last.charAt(0)} /> {user.first} {user.last}
                </Table.RowHeaderCell>
                <Table.Cell>role.id</Table.Cell>
                <Table.Cell>{formatDate(new Date(user.createdAt))}</Table.Cell>
                <Table.Cell justify="end">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="ghost" style={{ verticalAlign: "middle" }}>
                        <DotsHorizontalIcon />
                      </Button>

                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item shortcut="⌘ E">Edit user</DropdownMenu.Item>
                      <DropdownMenu.Item shortcut="⌘ D" onClick={() => onDeleteMenuItemClick(user)}>Delete User</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Table.Cell>
              </Table.Row>
            ))}

            {data.pages >= 2 && (
              <Table.Row align="end">
                <Table.Cell justify="end">
                  <Flex gap="2" justify="end">
                    <Button size="1" disabled={data.prev == null} onClick={() => updatePageIndex(currentPageIndex - 1)}>Previous</Button>
                    <Button size="1" disabled={data.next == null} onClick={() => updatePageIndex(currentPageIndex + 1)}>Next</Button>
                  </Flex>

                </Table.Cell>
              </Table.Row>
            )}

          </Table.Body>
        </Table.Root>
      </Box>

      {selectedUser && <DeleteUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={selectedUser} />}

    </Section>
  );
}

export default UserContent;