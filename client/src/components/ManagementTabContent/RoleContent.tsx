import { DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Section, Table, TextField
} from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { PagedData, Role } from '../../models';
import EditRoleDialog, { type EditRoleDialogProps } from '../EditRoleDialog/EditRoleDialog';

type RoleContentProps = {
  data: PagedData<Role>;
  currentPageIndex: number;
  updatePageIndex: (page: number) => void;
}

const RoleContent: React.FC<RoleContentProps> = ({ data, currentPageIndex, updatePageIndex }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<EditRoleDialogProps['role'] | null>(null);

  const onEditMenuItemClick = useCallback((role: Role) => {
    const { id, name } = role;
    setSelectedRole({ id, name });
    setIsDialogOpen(true);
  }, []);

  return (
    <Section size="1">
      <Flex gap="3">
        <Box pb="20px" flexGrow="1">
          <TextField.Root placeholder="Search roles">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

        </Box>
        <Button>
          <PlusIcon /> Add role
        </Button>
      </Flex>



      <Box>
        <Table.Root variant="surface" size="1" >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                Name
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Description
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>

              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.data.map((role: Role) => (
              <Table.Row>
                <Table.RowHeaderCell>{role.name}</Table.RowHeaderCell>
                <Table.Cell>{role.description}</Table.Cell>
                <Table.Cell justify="end">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="ghost" style={{ verticalAlign: "middle" }}>
                        <DotsHorizontalIcon />
                      </Button>

                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item shortcut="⌘ E" onClick={() => onEditMenuItemClick(role)}>Edit role</DropdownMenu.Item>
                      <DropdownMenu.Item shortcut="⌘ D">Delete User</DropdownMenu.Item>
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

      {selectedRole && <EditRoleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} role={selectedRole} />}

    </Section>
  );
}

export default RoleContent;