import { useState } from 'react';
import { Flex, Tabs, Box, Text } from '@radix-ui/themes';
import ManagementTabContent from './components/ManagementTabConent';

type ManagementTabState = 'users' | 'roles';

const UserManagementExercise: React.FC<> = () => {
  const [currentTab, setCurrentTab] = useState<ManagementTabState>('users');

  
  return (
    <Flex direction="column" gap="4" pb="2">
      <Tabs.Root defaultValue={currentTab}>
        <Tabs.List size="1">
          <Tabs.Trigger value='users'>Users</Tabs.Trigger>
          <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="users">
            <ManagementTabContent route='/users' />
           
          </Tabs.Content>

          <Tabs.Content value="roles">
            <ManagementTabContent route='/roles' />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
}

export default UserManagementExercise;