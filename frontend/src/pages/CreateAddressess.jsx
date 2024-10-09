import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAddressess = () => {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    street2: "",
    zip: "",
    city: "",
    state: "",
    country: "United States",
  });

  const navigate = useNavigate()

  const backToAddressHistory = () => {
    navigate("/Addresses")
  }

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-backend-api.com/addresses",
        formData
      );
      toast({
        title: "Address Created.",
        description: "The address has been successfully added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue submitting the form.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.800" p={6} rounded="md" color="white">
      <Heading as="h2" size="lg" mb={4}>
        Add Address
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Street</FormLabel>
            <Input
              type="text"
              name="street"
              placeholder="Enter Street"
              value={formData.street}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Street 2 (optional)</FormLabel>
            <Input
              type="text"
              name="street2"
              placeholder="Enter Street 2"
              value={formData.street2}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>ZIP Code</FormLabel>
            <Input
              type="text"
              name="zip"
              placeholder="Enter ZIP Code"
              value={formData.zip}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Select
              name="state"
              placeholder="Select state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
              {/* Add more states as needed */}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              name="country"
              placeholder="Enter Country"
              value={formData.country}
              readOnly
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full">
            Create
          </Button>
          <Button colorScheme="blue" onClick={backToAddressHistory} width="full">
            Create
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateAddressess;