import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";

import { v4 as uuidv4 } from "uuid";

import "react-day-picker/dist/style.css";

import MultiSelect from "./custom-multi-select";

import DatePicker from "./datepicker";
const transactionType: TransactionTypeInterface[] = [
  { id: 1, name: "Store Transactions", type: "store" },

  { id: 0, name: "Deposit", type: "deposit" },

  { id: 2, name: "Get Tipped ", type: "tipped" },
  { id: 3, name: "Withdrawals", type: "withdrawal" },
  { id: 4, name: "Chargebacks", type: "chargeback" },
  { id: 5, name: "Cashbacks", type: "cashback" },
  { id: 6, name: "Refer & Earn", type: "refer" },
];

const transactionStatus: TransactionStatusInterface[] = [
  { id: 1, status: "Successful" },
  { id: 2, status: "Pending" },
  { id: 3, status: "Failed" },
];

const daysRange = [
  "Today",
  "Last 7 days",
  "This month",
  "Last 3 months",
  "This year",
  "All time",
];

export default function FilterModal({
  isOpen,
  onOpen,
  onClose,
  filters,
  setFilters,
  handleApplyFilter,
  transactionsData,
  setFilterTransactionsData,
  setSelectedRange,
  selectedRange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: FilterValuesInterface;
  setFilters: React.SetStateAction<FilterValuesInterface|any>;
  transactionsData: TransactioniInterface[] | undefined;
  handleApplyFilter: () => void;
  setFilterTransactionsData: React.Dispatch<
    React.SetStateAction<TransactioniInterface[] | undefined>
  >;
  setSelectedRange: React.Dispatch<React.SetStateAction<string>>;
  selectedRange: string;
}) {
  const [resetFilters, setResetFilters] = useState<boolean>(false);

  const handleResetComplete = () => {
    setResetFilters(false); // Set back to false after reset is done
  };

  // State to track selected date range

  const handleRangeSelection = (range: string) => {
    setSelectedRange(range === selectedRange ? "" : range); // Toggle selection on click
  };

  const handleFilter = (
    selectedValues: string | string[],
    filterType: keyof typeof filters
  ) => {
    // Update filters state based on filter type
    setFilters({ ...filters, [filterType]: selectedValues });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay
        style={{
          background: "rgba(219, 222, 229, 0.60)",
        }}
      />

      <DrawerContent
        backdropBlur={"8px"}
        boxShadow={
          "0px 8px 16px 4px rgba(188, 196, 204, 0.10), 0px 12px 24px 0px rgba(219, 222, 229, 0.10), 0px 16px 32px 0px rgba(219, 222, 229, 0.10)"
        }
        p={"22px"}
        borderRadius={"24px"}
        minHeight={"200px"}
        maxW={["95%", "456px"]}
        mx={["auto", "0"]}
        mr={["10px", "20px"]}
        ml={["10px", "0"]}
        my={"20px"}
      >
        <DrawerCloseButton />
        <DrawerHeader p={0} fontWeight={"700"} color={"brand.300"}>
          <Text pb={"20px"}>Filter</Text>
        </DrawerHeader>

        <DrawerBody p={"0"}>
          {/* date range */}
          <Box
            cursor={""}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"nowrap"}
            overflowX={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
            }}
          >
            {daysRange.map((range) => {
              return (
                <Box
                  onClick={() => handleRangeSelection(range)} // Handle click event
                  style={{ cursor: "pointer" }}
                  fontSize={"14px"}
                  // w={"116px"}
                  fontWeight={"600"}
                  display={"flex"}
                  alignItems={"center"}
                  h={"36px"}
                  p={"10px 18px"}
                  mr={"12px"}
                  borderRadius={"100px"}
                  borderWidth={"1px"}
                  borderColor={"#EFF1F6"}
                  // bg={"#fff"}
                  key={uuidv4()}
                  mb={"24px"}
                  whiteSpace={"nowrap"}
                  bg={selectedRange === range ? "#131316" : "#fff"}
                  color={selectedRange === range ? "#fff" : "#131316"} // Change text color based on selection
                >
                  <span>{range}</span>
                </Box>
              );
            })}
          </Box>

          {/* data range picker */}

          <Box mx={"auto"} w={["100%", "412px"]} mb={"24px"}>
            <Text
              mb={"12px"}
              color={"brand.300"}
              fontWeight={"600"}
              fontSize={"16px"}
            >
              Date Range
            </Text>

            <Flex justifyContent={"space-between"}>
              <DatePicker
                resetFilters={resetFilters}
                filterValues={filters.startDate}
                onSelectionChange={(selectedValues) =>
                  handleFilter(selectedValues, "startDate")
                }
                selectedStartDate={filters.startDate}
                selectedEndDate={filters.endDate}
                onResetComplete={handleResetComplete}
              />

              <DatePicker
                resetFilters={resetFilters}
                filterValues={filters.endDate}
                onSelectionChange={(selectedValues) =>
                  handleFilter(selectedValues, "endDate")
                }
                selectedStartDate={filters.startDate}
                selectedEndDate={filters.endDate}
                onResetComplete={handleResetComplete}
              />
            </Flex>
          </Box>

          {/* transaction type dropdown */}
          <Box mx={"auto"} w={["100%", "412px"]} mb={"24px"}>
            <Text
              mb={"12px"}
              color={"brand.300"}
              fontWeight={"600"}
              fontSize={"16px"}
            >
              Transaction Type
            </Text>
            <MultiSelect
              filterValues={filters.type}
              options={transactionType}
              label="transaction type"
              displayProperty="name"
              resetFilters={resetFilters}
              onSelectionChange={(selectedValues) =>
                handleFilter(selectedValues, "type")
              }
              onResetComplete={handleResetComplete}
            />
          </Box>
          {/* Transaction Status dropdown */}
          <Box mx={"auto"} w={["100%", "412px"]} mb={"24px"}>
            <Text
              mb={"12px"}
              color={"brand.300"}
              fontWeight={"600"}
              fontSize={"16px"}
            >
              Transaction Status
            </Text>
            <MultiSelect
              options={transactionStatus}
              filterValues={filters.status}
              label="transaction status"
              displayProperty="status"
              resetFilters={resetFilters}
              onSelectionChange={(selectedValues) =>
                handleFilter(selectedValues, "status")
              }
              onResetComplete={handleResetComplete}
            />
          </Box>
        </DrawerBody>

        <DrawerFooter p={0} display={"flex"} justifyContent={"space-between"}>
          <Button
            borderWidth={"1px"}
            borderRadius={"100px"}
            fontSize={"16px"}
            borderColor={"#EFF1F6"}
            p={"12px 24px"}
            type="submit"
            w={"198px"}
            h={"48px"}
            bg={"#fff"}
            onClick={() => {
              setResetFilters(true);

              setFilters({
                type: [],
                status: [],
                daysRange: [],
              });

              setFilterTransactionsData(transactionsData);
            }}
          >
            Clear
          </Button>
          <Button
            ml={"12px"}
            // isDisabled={filters.type.length === 0}
            onClick={handleApplyFilter}
            fontSize={"16px"}
            borderRadius={"100px"}
            p={"12px 24px"}
            type="submit"
            w={"198px"}
            h={"48px"}
            bg={"brand.300"}
            color={"#fff"}
            _hover={{
              background: "brand.300",
            }}
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
