import React from "react";
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
  Input,
  SlideFade,
  Box,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import MultiSelect from "./dropdown";

export default function FilterModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
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

  const handleFilter = (selectedValues: any) => {
    // Perform filtering logic using selected values
    console.log("Selected Values:", selectedValues);
    // Example: Update state or perform filtering with selectedValues
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
        p={"12px"}
        borderRadius={"24px"}
        maxW={["100%", "456px"]}
        mr={["0", "20px"]}
        ml={["10px", "0"]}
        my={"20px"}
      >
        <DrawerCloseButton />
        <DrawerHeader
        
        p={0}
        fontWeight={"700"} color={"#131316"}>
          Filter
        </DrawerHeader>

        <DrawerBody p={"0"}>
          {/* transaction type dropdown */}
          <Box mx={"auto"} w={["100%","412px"]} mb={"24px"}>

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
              onSelectionChange={handleFilter}
            />
          </Box>

          <Box mx={"auto"} w={["100%","412px"]} mb={"24px"}>
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
              onSelectionChange={handleFilter}
            />
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button type="submit" form="my-form">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
