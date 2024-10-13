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
import { useNavigate } from "react-router-dom";

function FedexOrder() {
  const data = React.useMemo(
    () => [
      {
        no: 28,
        status: "John Doe",
        note: "john@example.com",
        createdAt: "2024-10-08",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 32,
        status: "Jane Smith",
        note: "jane@example.com",
        createdAt: "2024-10-07",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 22,
        status: "Sam Johnson",
        note: "sam@example.com",
        createdAt: "2024-10-06",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 45,
        status: "Michael Brown",
        note: "michael@example.com",
        createdAt: "2024-10-05",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 30,
        status: "Emily White",
        note: "emily@example.com",
        createdAt: "2024-10-04",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 35,
        status: "Chris Green",
        note: "chris@example.com",
        createdAt: "2024-10-03",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 29,
        status: "Jessica Blue",
        note: "jessica@example.com",
        createdAt: "2024-10-02",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
      {
        no: 40,
        status: "David Black",
        note: "david@example.com",
        createdAt: "2024-10-01",
        price: "Barati",
        orderId: 484886,
        action: "Boxer",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "No", accessor: "no" },
      { Header: "Status", accessor: "name" },
      { Header: "Status Note", accessor: "note" },
      { Header: "CreatedAt", accessor: "createdAt", isSortable: true },
      { Header: "Price", accessor: "price" },
      { Header: "OrderId", accessor: "orderId" },
      { Header: "Action", accessor: "action" },
      { Header: "Zip", accessor: "zip" }, // Keep this
      // Rename the second Action column to avoid duplication
      { Header: "Another Action", accessor: "anotherAction" }, 
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
  const navigate = useNavigate();

  const createAddress = () => {
    navigate("/create-fedex-Order");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilter("name", value || undefined); // Set filter for the 'name' column
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    toggleSortBy("no", value === "asc"); // Toggle sort order
  };

  return (
    <div className="px-8 py-2">
      <div className="flex pt-10 pb-5 items-center justify-between">
      <p className="text-heading2-bold text-sm">Fedex Order History</p>
        <Button colorScheme="blue" onClick={createAddress}>
        + Create Fedex Order
        </Button>
      </div>
      <Divider className="bg-grey-200 mb-8" />
      {/* Data Table Section */}
      <VStack spacing={4} align="stretch">
        <div className="flex items-center justify-between">
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
        </div>

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


export default FedexOrder;