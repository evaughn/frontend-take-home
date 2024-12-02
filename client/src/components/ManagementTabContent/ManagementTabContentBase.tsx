import { DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import
{
  Box,
  Button,
  DropdownMenu,
  Flex,
  Section, Spinner, Table,
  TextField
} from '@radix-ui/themes';
import DOMPurify from 'dompurify';
import { type ChangeEvent } from 'react';
import { PagedData, Role, User } from '../../models';

type ManagementTabContentProps = {
  data: PagedData<User | Role>;
  currentPageIndex: number;
  updatePageIndex: (page: number) => void;
  setSearch: (search: string) => void;
}

const ManagementTabContent: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
  return (
    <Section size="1">
      {children}
    </Section>
  )
};

ManagementTabContent.displayName = 'ManagementTabContent.Root';

interface ILayoutData<T>
{
  columnTitle: string;
  rowDisplay: (rowData: T) => React.ReactNode;
}

interface IManagementTabTable<T>
{
  tableData: PagedData<T>
  tableLayout: ILayoutData<T>[]
  updatePageIndex: (currentPage: number) => void;
  currentPageIndex: number;
  isRefetching: boolean;
  moreMenu: {
    disabled: boolean;
    text: string;
    onClick?: (model: T) => void;
  }[]

}

const ManagementTabTable = <T,>({ tableData, tableLayout, updatePageIndex, currentPageIndex, moreMenu, isRefetching }: IManagementTabTable<T>) =>
{
  const columnHeaders = tableLayout.map((layout) => layout.columnTitle);
  const rowDisplay = tableLayout.map((layout) => layout.rowDisplay);


  return (
    <>
      <Box>
        {isRefetching && <Spinner loading={isRefetching} />}
        {!isRefetching && <Table.Root variant="surface" size="1">
          <Table.Header>
            <Table.Row>
              {columnHeaders.map((headerTitle: string) => (
                <Table.ColumnHeaderCell>
                  {headerTitle}
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell>

              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableData.data.map((tableEntry: T) => (
              <Table.Row>
                {rowDisplay.map((entryForColumn, index) =>
                {
                  const RowCell = index === 0 ? Table.RowHeaderCell : Table.Cell;
                  return (
                    <RowCell>
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
                      {moreMenu.map(({ disabled, text, onClick }) => (
                        <DropdownMenu.Item disabled={disabled} onClick={() => onClick?.(tableEntry)}>{text}</DropdownMenu.Item>
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
        </Table.Root>}
      </Box>
    </>
  )
}

ManagementTabTable.displayName = 'ManagementTabContent.Table';

type ManagementSearchBarProps = {
  setSearch: ManagementTabContentProps['setSearch'];
  placeholder: string;
  createAction: {
    text: string;
    onClick?: () => void;
    disabled: boolean;
  }
}

const ManagementSearchBar: React.FC<ManagementSearchBarProps> = ({ setSearch, placeholder, createAction }) =>
{
  const onSearchInput = ((e: ChangeEvent<HTMLInputElement>) =>
  {
    e.preventDefault();
    const value = DOMPurify.sanitize(e.target.value);
    setSearch(value);
  });

  return (
    <Flex gap="3">
      <Box pb="20px" flexGrow="1">
        <TextField.Root placeholder={placeholder} onChange={onSearchInput}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

      </Box>
      <Button disabled={createAction.disabled} onClick={createAction?.onClick}>
        <PlusIcon /> {createAction.text}
      </Button>
    </Flex>
  )
}

ManagementSearchBar.displayName = 'ManagementTabContent.Searchbar';

export
{
  ManagementTabContent as Root,
  ManagementSearchBar as SearchBar,
  ManagementTabTable as Table
};

export type {
  IManagementTabTable as ITableProps, ManagementTabContentProps as RootProps,
  ManagementSearchBarProps as SearchBarProps
};

