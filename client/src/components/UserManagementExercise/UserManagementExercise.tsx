import { Box, Container, Flex, Skeleton, Table, Tabs } from '@radix-ui/themes';
import { useState } from 'react';
import useFetchQuery from '../../hooks/useFetchQuery';
import { UserContent } from '../ManagementTabContent';
import RoleContent from '../ManagementTabContent/RoleContent';

const UserManagementExercise: React.FC<any> = () => {
  const [userPageIndex, setUserPageIndex] = useState(1);
  const [rolesPageIndex, setRolesPageIndex] = useState(1);
  const [usersSearch, setUsersSearch] = useState('');

  const { isFetching: rolesFetchInProgress, isSuccess: rolesFetchSuccess, isError: rolesFetchError, data: rolesData } = useFetchQuery({ key: 'roles', page: rolesPageIndex });
  const { isFetching: usersFetchInProgress, isSuccess: usersFetchSuccess, isError: usersFetchError, data: usersData } = useFetchQuery({ key: 'users', page: userPageIndex, search: usersSearch });

  const isLoading = rolesFetchInProgress || usersFetchInProgress;
  const isSuccess = rolesFetchSuccess && usersFetchSuccess;
  const isLoadingError = usersFetchError || rolesFetchError;

  return (
    <Box>
      <Container size="2">
        <Flex direction="column" gap="4">
          <Tabs.Root defaultValue='users'>
            <Tabs.List size="1">
              <Tabs.Trigger value='users'>Users</Tabs.Trigger>
              <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
            </Tabs.List>

            <Box pt="1">
              {isLoading && <Skeleton><Table.Header>
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
              </Table.Header></Skeleton>}
              {isSuccess && (
                <>
                  <Tabs.Content value="users">
                    <UserContent data={usersData} currentPageIndex={userPageIndex} updatePageIndex={setUserPageIndex} setSearch={setUsersSearch} roles={rolesData.data} />
                  </Tabs.Content>

                  <Tabs.Content value="roles">
                    <RoleContent data={rolesData} currentPageIndex={rolesPageIndex} updatePageIndex={setRolesPageIndex} />
                  </Tabs.Content>
                </>

              )}

            </Box>
          </Tabs.Root>
        </Flex>
      </Container>
    </Box>

  );
}

export default UserManagementExercise;