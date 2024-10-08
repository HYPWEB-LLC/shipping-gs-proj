// Dashboard.jsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Divider,
  VStack,
  HStack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
} from "@chakra-ui/react";
import { CircleDollarSign, ShoppingBag } from "lucide-react";
import { useTable, useSortBy, usePagination } from "react-table";

function Dashboard() {
  const data = React.useMemo(
    () => [
      {
        name: "John Doe",
        age: 28,
        email: "john@example.com",
        date: "2024-10-08",
      },
      {
        name: "Jane Smith",
        age: 32,
        email: "jane@example.com",
        date: "2024-10-07",
      },
      {
        name: "Sam Johnson",
        age: 22,
        email: "sam@example.com",
        date: "2024-10-06",
      },
      {
        name: "Michael Brown",
        age: 45,
        email: "michael@example.com",
        date: "2024-10-05",
      },
      {
        name: "Emily White",
        age: 30,
        email: "emily@example.com",
        date: "2024-10-04",
      },
      {
        name: "Chris Green",
        age: 35,
        email: "chris@example.com",
        date: "2024-10-03",
      },
      {
        name: "Jessica Blue",
        age: 29,
        email: "jessica@example.com",
        date: "2024-10-02",
      },
      {
        name: "David Black",
        age: 40,
        email: "david@example.com",
        date: "2024-10-01",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Age", accessor: "age" },
      { Header: "Email", accessor: "email" },
      { Header: "Date", accessor: "date", isSortable: true },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize, sortBy },
    setPageSize,
    setFilter,
    gotoPage,
    toggleSortBy,
  } = useTable({ columns, data }, useSortBy, usePagination);

  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilter("name", value || undefined); // Set filter for the 'name' column
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    toggleSortBy("date", value === "asc"); // Toggle sort order
  };

  return (
    <div className="px-8 py-10">
      <div className="flex">
        <h2 className="text-heading2-bold">Dashboard</h2>
      </div>
      <Divider className="bg-grey-200 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <Heading size="md">Total Revenue</Heading>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardBody>
            <Text className="text-body-bold" fontSize="4xl">
              $0
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <Heading size="md">Total Orders</Heading>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardBody>
            <Text className="text-body-bold" fontSize="4xl">
              0
            </Text>
          </CardBody>
        </Card>
      </div>

      {/* Divider between Dashboard and Data Table */}
      <Divider className="bg-grey-200 mt-10" />

      <p className="text-heading2-bold py-10 text-sm">Order History</p>
      {/* Data Table Section */}
      <VStack spacing={4} align="stretch">
        <HStack spacing={2}>
          <Input
            placeholder="Search by name"
            value={searchInput}
            onChange={handleSearch}
            width="300px"
          />
          <Button onClick={() => setSearchInput("")}>Clear</Button>
        </HStack>

        {/* Sort Order Selection */}
        <HStack spacing={2}>
          <Text>Sort by Date:</Text>
          <Select value={sortOrder} onChange={handleSortChange} width="190px">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </HStack>

        <Table {...getTableProps()} variant="simple">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>

        {/* Pagination Controls */}
        <HStack spacing={4}>
          <Button onClick={() => gotoPage(0)} isDisabled={!canPreviousPage}>
            {"<<"}
          </Button>
          <Button
            onClick={() => gotoPage(pageIndex - 1)}
            isDisabled={!canPreviousPage}
          >
            {"<"}
          </Button>
          <Text>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Text>
          <Button
            onClick={() => gotoPage(pageIndex + 1)}
            isDisabled={!canNextPage}
          >
            {">"}
          </Button>
          <Button
            onClick={() => gotoPage(pageOptions.length - 1)}
            isDisabled={!canNextPage}
          >
            {">>"}
          </Button>
        </HStack>

        <HStack spacing={2}>
          <Text>Rows per page:</Text>
          <Input
            type="number"
            value={pageSize || ""} // Default to empty string if pageSize is 0
            onChange={(e) => {
              const value = e.target.value;
              // Only set the page size if the input is a valid number
              if (value === "" || Number(value) > 0) {
                setPageSize(value === "" ? 10 : Number(value)); // Default to 10 rows if empty
              }
            }}
            width="60px"
          />
        </HStack>
      </VStack>
    </div>
  );
}

export default Dashboard;
