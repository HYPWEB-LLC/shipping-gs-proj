import React, { useEffect, useState } from "react";
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
import { CircleDollarSign, ShoppingBag, UserPen } from "lucide-react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [adminName, setAdminName] = useState(""); // State for admin name

  const navigate = useNavigate();

  const EditProfile = () => {
    navigate("/EditProfile");
  };

  // Fetch admin name
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/AdminDetails');
        const data = await response.json();
        
        if (data && data.length > 0) {
          setAdminName(data[0].name); // Set the fetched name
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminName();
  }, []);

  // Fetch orders and calculate totals
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/OrdersDetails'); // Your API endpoint
        const data = await response.json();

        setOrders(data);

        // Calculate total revenue and total orders
        const revenue = data.reduce((acc, order) => acc + parseFloat(order.amount) || 0, 0);
        const orderCount = data.length;

        setTotalRevenue(revenue);
        setTotalOrders(orderCount);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilter("from", value || undefined); // Assuming "from" is the searchable column
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    toggleSortBy("date", value === "asc");
  };

  // Define table columns based on your provided structure
  const columns = React.useMemo(
    () => [
      { Header: "#", accessor: (row, i) => i + 1 }, // Index number for each row
      { Header: "From", accessor: "from" },
      { Header: "To", accessor: "to" },
      { Header: "Type", accessor: "type" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Status", accessor: "status" },
      { Header: "Tracking", accessor: "tracking" },
      { Header: "Date", accessor: "date", isSortable: true },
      { Header: "Action", accessor: "action", Cell: () => <Button>View</Button> }, // Action button
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
  } = useTable({ columns, data: orders }, useSortBy, usePagination);

  return (
    <div className="pb-10">
      {/* Header section */}
      <div className="flex px-4 pt-8 pb-10 rounded-b-lg items-center justify-between bg-blue-400 h-full">
        <h2 className="text-heading2-bold">Dashboard</h2>
        <div
          onClick={EditProfile}
          className="flex gap-3 cursor-pointer items-center text-body-medium"
        >
          <h1 className="text-[1.85rem]">$ 0.00</h1>
          <div className="flex">
            <UserPen />
            <p>{adminName || "Loading..."}</p> {/* Display admin name */}
          </div>
        </div>
      </div>
      <Divider className="bg-grey-200 mb-7 mt-5" />

      {/* Total Revenue & Orders */}
      <div className="px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <Heading size="md">Total Revenue</Heading>
              <CircleDollarSign className="max-sm:hidden" />
            </CardHeader>
            <CardBody>
              <Text className="text-body-bold" fontSize="4xl">
                {totalRevenue.toFixed(2)} {/* Show total revenue */}
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
                {totalOrders} {/* Show total number of orders */}
              </Text>
            </CardBody>
          </Card>
        </div>

        {/* Divider */}
        <Divider className="bg-grey-200 mt-10" />

        {/* Table Search and Sorting */}
        <p className="text-heading2-bold py-10 text-sm">Order History</p>
        <VStack spacing={4} align="stretch">
          <div className="flex items-center justify-between">
            <HStack spacing={2}>
              <Input
                placeholder="Search by From"
                value={searchInput}
                onChange={handleSearch}
                width="300px"
              />
              <Button onClick={() => setSearchInput("")}>Clear</Button>
            </HStack>

            {/* Sort Order Selection */}
            <HStack spacing={2}>
              <Text>Sort by Date:</Text>
              <Select
                value={sortOrder}
                onChange={handleSortChange}
                width="190px"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </HStack>
          </div>

          {/* Data Table */}
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
              value={pageSize || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || Number(value) > 0) {
                  setPageSize(value === "" ? 10 : Number(value)); // Default to 10 rows if empty
                }
              }}
              width="60px"
            />
          </HStack>
        </VStack>
      </div>
    </div>
  );
}

export default Dashboard;
