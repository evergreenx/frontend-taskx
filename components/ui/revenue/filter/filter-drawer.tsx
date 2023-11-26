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
} from "@chakra-ui/react";

import MultiSelect from "./dropdown";
const transactionType: TransactionTypeInterface[] = [
  { id: 1, name: "Store Transactions" },
  { id: 2, name: "Get Tipped " },
  { id: 3, name: "Withdrawals" },
  { id: 4, name: "Chargebacks" },
  { id: 5, name: "Cashbacks" },
  { id: 6, name: "Refer & Earn" },
];

const transactionStatus: TransactionStatusInterface[] = [
  { id: 1, status: "successful" },
  { id: 2, status: "pending" },
  { id: 3, status: "failed" },
];

const daysRange = [
  "Today",
  "Last 7 days",
  "This month",
  "last 3 months",
  "This year",
  "All time",
];

export default function FilterModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [resetFilters, setResetFilters] = useState<boolean>(false);

  const handleResetComplete = () => {
    setResetFilters(false); // Set back to false after reset is done
  };

  const [filters, setFilters] = useState<FilterValuesInterface>({
    type: [],
    status: [],
    daysRange: [],
  });
  const handleFilter = (
    selectedValues: any[],
    filterType: keyof FilterValuesInterface
  ) => {
    // Update filters state based on filter type
    setFilters({ ...filters, [filterType]: selectedValues });
    console.log("Selected Values:", selectedValues);
  };

  console.log(filters);
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
        maxW={["100%", "456px"]}
        mr={["0", "20px"]}
        ml={["10px", "0"]}
        my={"20px"}
      >
        <DrawerCloseButton />
        <DrawerHeader p={0} fontWeight={"700"} color={"#131316"}>
          <Text pb={"20px"}>Filter</Text>
        </DrawerHeader>
        {/* date range */}

        <DrawerBody p={"0"}>
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
                // background: scrollbarColor,
                borderRadius: "24px",
              },
            }}
          >
            {daysRange.map((i) => {
              return (
                <Box
                  // minW={'73px'}
                  fontSize={"14px"}
                  w={"116px"}
                  fontWeight={"600"}
                  display={"flex"}
                  alignItems={"center"}
                  h={"36px"}
                  p={"10px 18px"}
                  mr={"12px"}
                  borderRadius={"100px"}
                  borderWidth={"1px"}
                  borderColor={"#EFF1F6"}
                  bg={"#fff"}
                  key={i}
                  whiteSpace={"nowrap"}
                >
                  <span>{i}</span>
                </Box>
              );
            })}
          </Box>

          {/* transaction type dropdown */}
          <Box mx={"auto"} w={["100%", "412px"]} mb={"24px"}>
            <Text
              mb={"12px"}
              color={"#131316"}
              fontWeight={"600"}
              fontSize={"16px"}
            >
              Transaction Type
            </Text>
            <MultiSelect
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
              color={"#131316"}
              fontWeight={"600"}
              fontSize={"16px"}
            >
              Transaction Status
            </Text>
            <MultiSelect
              options={transactionStatus}
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
            bg={"#fff"}
            onClick={() => {
              setResetFilters(true);

              setFilters({
                type: [],
                status: [],
                daysRange: [],
              });
            }}
          >
            Clear
          </Button>
          <Button
            fontSize={"16px"}
            borderRadius={"100px"}
            p={"12px 24px"}
            type="submit"
            w={"198px"}
            bg={"#131316"}
            color={"#fff"}
            _hover={{
              background: "#131316",
            }}
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
