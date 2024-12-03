import { ReloadIcon } from '@radix-ui/react-icons';
import { Box, Button, Container, Flex, Heading, Spinner, Tabs, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import useFetchQuery from '../../hooks/useFetchQuery';
import { UserContent } from '../ManagementTabContent';
import RoleContent from '../ManagementTabContent/RoleContent';
import { DefaultToastNotificationManager } from '../ToastNotificationManager/ToastNotificationManager';

const UserManagementExercise: React.FC<any> = () => {
  const [userPageIndex, setUserPageIndex] = useState(1);
  const [rolesPageIndex, setRolesPageIndex] = useState(1);
  const [usersSearch, setUsersSearch] = useState('');

  const { isPending: rolesFetchInProgress, isSuccess: rolesFetchSuccess, isError: rolesFetchError, data: rolesData, isRefetching: rolesIsRefetching, isStale: rolesFetchStale } = useFetchQuery({ key: 'roles', page: rolesPageIndex });
  const { isPending: usersFetchInProgress, isSuccess: usersFetchSuccess, isError: usersFetchError, data: usersData, isRefetching: usersIsRefetching, isStale: usersFetchStale } = useFetchQuery({ key: 'users', page: userPageIndex, search: usersSearch });

  const isLoading = rolesFetchInProgress || usersFetchInProgress;
  const isSuccess = rolesFetchSuccess && usersFetchSuccess;
  const isLoadingError = usersFetchError || rolesFetchError;

  const VerticalCenterFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <Box style={{ minWidth: '80vw', margin: '0 auto', minHeight: '100vh', height: '100vh' }}>
        <Container size="2" style={{ minHeight: '100%', justifyContent: 'center' }}>
          <Flex direction='column' align='center' justify='center'>
            {children}
          </Flex>
        </Container>
      </Box>
    )
  }

  return (
    <DefaultToastNotificationManager>
      {isLoading && (
        <VerticalCenterFallback>
          <Spinner size="2" />
          <Text size="3" color='indigo'>Loading</Text>
        </VerticalCenterFallback>
      )}

      {isLoadingError && (
        <VerticalCenterFallback>
          <Flex direction='column' gap='2' align={'center'}>
            <Box style={{ textAlign: 'center' }}>
              <Heading as="h1" size='5'>Error!</Heading>
              <Text size="3">Something unexpected occured.</Text>
            </Box>

            <Button onClick={() => window.location.reload()}>
              <ReloadIcon />
              Reload
            </Button>
          </Flex>
        </VerticalCenterFallback>
      )}

      {isSuccess && (
        <Box>
          <Container size="2">
            <Flex direction="column" gap="4">
              <Tabs.Root defaultValue='users'>
                <Tabs.List size="1">
                  <Tabs.Trigger value='users'>Users</Tabs.Trigger>
                  <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
                </Tabs.List>

                <Box pt="1">
                  {isSuccess && (
                    <>
                      <Tabs.Content value="users">
                        <UserContent data={usersData} currentPageIndex={userPageIndex} updatePageIndex={setUserPageIndex} setSearch={setUsersSearch} roles={rolesData.data} isRefetching={usersIsRefetching && usersFetchStale} />
                      </Tabs.Content>

                      <Tabs.Content value="roles">
                        <RoleContent data={rolesData} currentPageIndex={rolesPageIndex} updatePageIndex={setRolesPageIndex} isRefetching={rolesIsRefetching && rolesFetchStale} />
                      </Tabs.Content>
                    </>

                  )}

                </Box>
              </Tabs.Root>
            </Flex>
          </Container>
        </Box>
      )}
    </DefaultToastNotificationManager>


  );
}

export default UserManagementExercise;