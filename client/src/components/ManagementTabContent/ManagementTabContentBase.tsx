import { DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Section,
  Spinner,
  Table,
  TextField
} from '@radix-ui/themes';
import DOMPurify from 'dompurify';
import debounce from "lodash.debounce";
import { type ChangeEvent } from 'react';
import { PagedData, Role, User } from '../../models';

type ManagementTabContentProps = {
  data: PagedData<User | Role>;
  currentPageIndex: number;
  updatePageIndex: (page: number) => void;
  setSearch: (search: string) => void;
}

const ManagementTabContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Section size="1">
      {children}
    </Section>
  )
};

ManagementTabContent.displayName = 'ManagementTabContent.Root';

interface ILayoutData<T> {
  columnTitle: string;
  rowDisplay: (rowData: T) => React.ReactNode;
}

interface IManagementTabTable<T> {
  tableData: PagedData<T>
  tableLayout: ILayoutData<T>[]
  updatePageIndex: (currentPage: number) => void;
  currentPageIndex: number;
  isRefetching: boolean;
  moreMenu: {
    text: string;
    onClick?: (model: T) => void;
  }[]

}

const LoadingOverlay: React.FC = () => {

  return (
    <Box position={'absolute'} width={'100%'} height={'100%'} style={{ zIndex: 1 }}>
      <Box style={{ backgroundColor: 'rgba(0,0,0, .5)', height: '100%' }}>
        <Flex style={{ backgroundColor: 'transparent', color: 'white', height: '100%' }} justify={'center'} align="center">
          <Spinner size='3' />
        </Flex>
      </Box>

    </Box>
  )
}

const ManagementTabTable = <T,>({ tableData, tableLayout, updatePageIndex, currentPageIndex, moreMenu, isRefetching }: IManagementTabTable<T>) => {
  const columnHeaders = tableLayout.map((layout) => layout.columnTitle);
  const rowDisplay = tableLayout.map((layout) => layout.rowDisplay);

  return (
    <Box>
      <Table.Root variant="surface" size="1" style={{ position: 'relative', overflow: 'hidden' }}>
        {isRefetching && <LoadingOverlay />}
        <Table.Header>
          <Table.Row>
            {columnHeaders.map((headerTitle: string) => (
              <Table.ColumnHeaderCell key={headerTitle}>
                {headerTitle}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell>

            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.data.map((tableEntry: T, entryIndex) => (
            <Table.Row key={`tableEntry-${entryIndex}`}>
              {rowDisplay.map((entryForColumn, index) => {
                const RowCell = index === 0 ? Table.RowHeaderCell : Table.Cell;
                return (
                  <RowCell key={`rowDisplay-entry-${entryIndex}:${index}`}>
                    {entryForColumn(tableEntry)}
                  </RowCell>
                )
              })}

              <Table.Cell justify="end">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="ghost" style={{ verticalAlign: "middle" }}>
                      <DotsHorizontalIcon />
                    </Button>

                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    {moreMenu.map(({ text, onClick }) => (
                      <DropdownMenu.Item key={text} disabled={onClick == null} onClick={() => onClick?.(tableEntry)}>{text}</DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          ))}

          {tableData.pages >= 2 && (
            <Table.Row align="end">
              <Table.Cell justify="end" colSpan={tableLayout.length + 1}>
                <Flex gap="2" justify="end">
                  <Button size="1" disabled={tableData.prev == null} onClick={() => updatePageIndex(currentPageIndex - 1)}>Previous</Button>
                  <Button size="1" disabled={tableData.next == null} onClick={() => updatePageIndex(currentPageIndex + 1)}>Next</Button>
                </Flex>

              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

ManagementTabTable.displayName = 'ManagementTabContent.Table';

type ManagementSearchBarProps = {
  setSearch: ManagementTabContentProps['setSearch'];
  placeholder: string;
  createAction: {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
  }
}

const ManagementSearchBar: React.FC<ManagementSearchBarProps> = ({ setSearch, placeholder, createAction }) => {
  const onSearchInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = DOMPurify.sanitize(e.target.value);
    setSearch(value);
  }, 200);

  return (
    <Flex gap="3">
      <Box pb="20px" flexGrow="1">
        <TextField.Root placeholder={placeholder} onChange={onSearchInput}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

      </Box>
      <Button onClick={createAction?.onClick}>
        <PlusIcon /> {createAction.text}
      </Button>
    </Flex>
  )
}

ManagementSearchBar.displayName = 'ManagementTabContent.Searchbar';

export {
  ManagementTabContent as Root,
  ManagementSearchBar as SearchBar,
  ManagementTabTable as Table
};

export type {
  IManagementTabTable as ITableProps, ManagementTabContentProps as RootProps,
  ManagementSearchBarProps as SearchBarProps
};

