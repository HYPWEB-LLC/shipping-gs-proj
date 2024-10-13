import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  SimpleGrid,
  VStack,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";

// Sample saved addresses
const savedAddresses = [
  { id: 1, name: "John Doe", address: "123 Main St, Cityville, State, 12345" },
  {
    id: 2,
    name: "Jane Smith",
    address: "456 Elm St, Townsville, State, 67890",
  },
];

const OrderForm = () => {
  // State to toggle between Quick Order and Normal Order
  const [isQuickOrder, setIsQuickOrder] = useState(true);

  // Toggle button handler
  const handleToggle = (orderType) => {
    setIsQuickOrder(orderType === "quick");
  };

  return (
    <Box p={6} maxW="1200px" mx="auto">
      {/* Toggle Buttons */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          onClick={() => handleToggle("quick")}
          colorScheme={isQuickOrder ? "blue" : "gray"}
          variant="solid"
          mr={4}
        >
          Quick Order
        </Button>
        <Button
          onClick={() => handleToggle("normal")}
          colorScheme={!isQuickOrder ? "blue" : "gray"}
          variant="solid"
        >
          Normal Order
        </Button>
      </Box>

      {/* Forms */}
      {isQuickOrder ? <QuickOrderForm /> : <NormalOrderForm />}
    </Box>
  );
};

// Quick Order Form Component
const QuickOrderForm = () => {
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  // Toast for feedback
  const toast = useToast();

  // Submit handler for Quick Order
  const handleSubmit = () => {
    // Simulate API call
    console.log("Quick Order Data:", { type, weight, fromAddress, toAddress });
    toast({
      title: "Quick Order Created",
      description: "Your quick order has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <SimpleGrid columns={[1, null, 2]} spacing={6} mb={4}>
        <VStack>
          <Text fontSize="lg">Type</Text>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Select type"
          >
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </Select>
        </VStack>
        <VStack>
          <Text fontSize="lg">Weight</Text>
          <Input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
          />
        </VStack>
      </SimpleGrid>

      {/* From and To Address Sections */}
      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        <AddressSection
          title="From Address"
          address={fromAddress}
          setAddress={setFromAddress}
        />
        <AddressSection
          title="To Address"
          address={toAddress}
          setAddress={setToAddress}
        />
      </SimpleGrid>

      {/* Create Quick Order Button */}
      <Flex justify="center" mt={6}>
        <Button colorScheme="blue" size="lg" onClick={handleSubmit}>
          Create Quick Order $0
        </Button>
      </Flex>
    </Box>
  );
};

// Normal Order Form Component
const NormalOrderForm = () => {
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");

  // From Address States
  const [fromName, setFromName] = useState("");
  const [fromCompany, setFromCompany] = useState("");
  const [fromStreet, setFromStreet] = useState("");
  const [fromStreet2, setFromStreet2] = useState("");
  const [fromZipCode, setFromZipCode] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromState, setFromState] = useState("");
  const [fromCountry, setFromCountry] = useState("");

  // To Address States
  const [toName, setToName] = useState("");
  const [toCompany, setToCompany] = useState("");
  const [toStreet, setToStreet] = useState("");
  const [toStreet2, setToStreet2] = useState("");
  const [toZipCode, setToZipCode] = useState("");
  const [toCity, setToCity] = useState("");
  const [toState, setToState] = useState("");
  const [toCountry, setToCountry] = useState("");

  // Toast for feedback
  const toast = useToast();

  // Submit handler for Normal Order
  const handleSubmit = () => {
    // Simulate API call
    console.log("Normal Order Data:", {
      type,
      weight,
      fromAddress: {
        fromName,
        fromCompany,
        fromStreet,
        fromStreet2,
        fromZipCode,
        fromCity,
        fromState,
        fromCountry,
      },
      toAddress: {
        toName,
        toCompany,
        toStreet,
        toStreet2,
        toZipCode,
        toCity,
        toState,
        toCountry,
      },
    });
    toast({
      title: "Normal Order Created",
      description: "Your normal order has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <SimpleGrid columns={[1, null, 2]} spacing={6} mb={4}>
        <VStack>
          <Text fontSize="lg">Type</Text>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Select type"
          >
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </Select>
        </VStack>
        <VStack>
          <Text fontSize="lg">Weight</Text>
          <Input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
          />
        </VStack>
      </SimpleGrid>

      {/* From and To Address Sections */}
      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        <AddressForm
          title="From"
          name={fromName}
          setName={setFromName}
          company={fromCompany}
          setCompany={setFromCompany}
          street={fromStreet}
          setStreet={setFromStreet}
          street2={fromStreet2}
          setStreet2={setFromStreet2}
          zipCode={fromZipCode}
          setZipCode={setFromZipCode}
          city={fromCity}
          setCity={setFromCity}
          state={fromState}
          setState={setFromState}
          country={fromCountry}
          setCountry={setFromCountry}
        />
        <AddressForm
          title="To"
          name={toName}
          setName={setToName}
          company={toCompany}
          setCompany={setToCompany}
          street={toStreet}
          setStreet={setToStreet}
          street2={toStreet2}
          setStreet2={setToStreet2}
          zipCode={toZipCode}
          setZipCode={setToZipCode}
          city={toCity}
          setCity={setToCity}
          state={toState}
          setState={setToState}
          country={toCountry}
          setCountry={setToCountry}
        />
      </SimpleGrid>

      {/* Create Normal Order Button */}
      <Flex justify="center" mt={6}>
        <Button colorScheme="blue" size="lg" onClick={handleSubmit}>
          Create Normal Order $0
        </Button>
      </Flex>
    </Box>
  );
};

// Reusable Address Section for Quick Order
const AddressSection = ({ title, address, setAddress }) => (
  <VStack
    spacing={4}
    p={4}
    bg="gray.800"
    borderRadius="md"
    boxShadow="md"
    color="white"
  >
    <Text fontSize="lg" fontWeight="bold">
      {title} Address
    </Text>
    <Select
      placeholder="Select saved address"
      onChange={(e) => setAddress(e.target.value)}
    >
      {savedAddresses.map((address) => (
        <option
          key={address.id}
          value={address.address}
          style={{ color: "black" }}
        >
          {address.name} - {address.address}
        </option>
      ))}
    </Select>
    <Box p={2} bg="gray.700" borderRadius="md" w="100%">
      <Text>Selected Address:</Text>
      <Text>{address}</Text>
    </Box>
  </VStack>
);

// Reusable Address Form for Normal Order
const AddressForm = ({
  title,
  name,
  setName,
  company,
  setCompany,
  street,
  setStreet,
  street2,
  setStreet2,
  zipCode,
  setZipCode,
  city,
  setCity,
  state,
  setState,
  country,
  setCountry,
}) => (
  <VStack
    spacing={4}
    p={4}
    bg="gray.800"
    borderRadius="md"
    boxShadow="md"
    color="white"
  >
    <Text fontSize="lg" fontWeight="bold">
      {title} Address
    </Text>
    <Input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
    />
    <Input
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      placeholder="Company"
    />
    <Input
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      placeholder="Street"
    />
    <Input
      value={street2}
      onChange={(e) => setStreet2(e.target.value)}
      placeholder="Street 2 (optional)"
    />
    <Input
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
      placeholder="ZIP Code"
    />
    <Input
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="City"
    />
    <Select
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder="Select state"
    >
      <option value="state1">State 1</option>
      <option value="state2">State 2</option>
    </Select>
    <Select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      placeholder="Country"
    >
      <option value="us">United States</option>
      <option value="ca">Canada</option>
    </Select>
  </VStack>
);

export default OrderForm;


// 1. Import Axios
// Ensure you have Axios imported at the top of your component:

// javascript
// Copy code
// import axios from "axios"; // Add this line
// 2. Create API Call Functions
// Add the functions to handle form submission for both normal and quick orders.

// Normal Order Submission
// Modify the Normal Order Form to include an handleSubmit function:

// javascript
// Copy code
// const handleNormalOrderSubmit = async (data) => {
//   try {
//     const response = await axios.post("YOUR_API_ENDPOINT/normal", data); // Replace with your endpoint
//     console.log("Normal order response:", response.data);
//     toast({
//       title: "Normal Order Submitted",
//       description: "Your normal order has been submitted successfully.",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   } catch (error) {
//     console.error("Error submitting normal order:", error);
//     toast({
//       title: "Error",
//       description: "There was an error submitting your order.",
//       status: "error",
//       duration: 3000,
//       isClosable: true,
//     });
//   }
// };
// Quick Order Submission
// Add a similar function for the Quick Order Form:

// javascript
// Copy code
// const handleQuickOrderSubmit = async (data) => {
//   try {
//     const response = await axios.post("YOUR_API_ENDPOINT/quick", data); // Replace with your endpoint
//     console.log("Quick order response:", response.data);
//     toast({
//       title: "Quick Order Submitted",
//       description: "Your quick order has been submitted successfully.",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   } catch (error) {
//     console.error("Error submitting quick order:", error);
//     toast({
//       title: "Error",
//       description: "There was an error submitting your order.",
//       status: "error",
//       duration: 3000,
//       isClosable: true,
//     });
//   }
// };
// 3. Call the Submission Functions
// Update the submit buttons in both forms to call these functions.

// Normal Order Form Submission Button
// In the NormalOrderForm component, add:

// javascript
// Copy code
// <Button colorScheme="blue" onClick={() => handleNormalOrderSubmit(normalOrderData)}>
//   Create Order $0
// </Button>
// Quick Order Form Submission Button
// In the QuickOrderForm component, add:

// javascript
// Copy code
// <Button colorScheme="blue" onClick={() => handleQuickOrderSubmit(quickOrderData)}>
//   Create Order $0
// </Button>
// 4. Prepare Form Data
// Ensure you gather all necessary data before sending the requests. For example, in each form's submission handler, you might collect the relevant fields like this:

// javascript
// Copy code
// const normalOrderData = {
//   type: selectedType,
//   weight: weight,
//   fromAddress: {
//     name: fromName,
//     company: fromCompany,
//     street: fromStreet,
//     street2: fromStreet2,
//     zipCode: fromZipCode,
//     city: fromCity,
//     state: fromState,
//     country: fromCountry,
//   },
//   toAddress: {
//     name: toName,
//     company: toCompany,
//     street: toStreet,
//     street2: toStreet2,
//     zipCode: toZipCode,
//     city: toCity,
//     state: toState,
//     country: toCountry,
//   },
// };

// // Similar for quickOrderData
// Summary of Changes
// Import Axios: import axios from "axios";
// Create API Call Functions: Add functions for normal and quick order submissions.
// Call Submission Functions: Attach these functions to the respective button's onClick event.
// Prepare Form Data: Collect the data from form fields before making the API call.
// Make sure to replace "YOUR_API_ENDPOINT/normal" and "YOUR_API_ENDPOINT/quick" with your actual API endpoint URLs for submitting the orders.