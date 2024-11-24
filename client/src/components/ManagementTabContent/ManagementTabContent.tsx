import { useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

type ManagementTabState = 'users' | 'roles';

const ManagementTabContent: React.FC<> = () => {
  

  
  return (
    <TextField.Root placeholder="Search the docs…">
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}

export default ManagementTabContent;