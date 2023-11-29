import {
  expandMoreIcon,
  downloadIcon,
  depositIcon,
  withdrawalIcon,
  receiptIcon,
} from "@/assets";
import API from "@/services/apiService";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

import Image from "next/image";
import FilterModal from "./filter/filter-drawer";
import { isWithinInterval, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export default function TransactionList({
  setFilterTransactionsData,
  filtertransactionsData,
  transactionsData,
}: {
  setFilterTransactionsData: React.Dispatch<
    React.SetStateAction<TransactioniInterface[] | undefined>
  >;
  filtertransactionsData: TransactioniInterface[] | undefined;
  transactionsData: TransactioniInterface[] | undefined;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedRange, setSelectedRange] = useState("All time");

  const [filters, setFilters] = useState<FilterValuesInterface>({
    type: [],
    startDate: "",
    endDate: "",
    status: [],
    daysRange: [],
  });

  // active choosen filters
  const activeFiltersCount = Object.values(filters).reduce(
    (count, filter) => count + (filter.length > 0 ? 1 : null),
    0
  );

  const filterData = (
    data: TransactioniInterface[] | undefined,
    filters: FilterValuesInterface
  ) => {
    const typesToFilter = filters.type.map((typeObj) =>
      typeObj.type.toLowerCase()
    );

    const statusToFilter = filters.status.map((typeObj) =>
      typeObj.status.toLowerCase()
    );

    return data?.filter((item) => {
      // Check if each property of the item matches the filter values

      const isTypeMatch =
        filters.type.length === 0 || typesToFilter.includes(item.type);

      const isStatusMatch =
        filters.status.length === 0 || statusToFilter.includes(item.status);

      let isDateRangeMatch = true;
      if (filters.startDate && filters.endDate) {
        const startDate = parseISO(filters.startDate);
        const endDate = parseISO(filters.endDate);
        const itemDate = parseISO(item.date);
        isDateRangeMatch = isWithinInterval(itemDate, {
          start: startDate,
          end: endDate,
        });
      }

      return isDateRangeMatch && isTypeMatch && isStatusMatch;
    });
  };

  const handleApplyFilter = () => {
    const filteredResult = filterData(transactionsData, filters);
    setFilterTransactionsData(filteredResult);

    onClose();
  };

  return (
    <Box>
      {/* filter drawer */}

      <FilterModal
        filters={filters}
        handleApplyFilter={handleApplyFilter}
        setFilters={setFilters}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        transactionsData={transactionsData}
        setFilterTransactionsData={setFilterTransactionsData}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      <Flex
        borderBottomWidth={"1px"}
        pb={"24px"}
        borderColor={"#EFF1F6"}
        justifyContent={"space-between"}
        mt={"96px"}
      >
        <Box>
          <Text fontWeight={700} fontSize={"24px"} color={"brand.300"}>
            {filtertransactionsData?.length}{" "}
            {filtertransactionsData?.length !== 1
              ? "Transactions"
              : "Transaction"}
          </Text>
          <Text fontWeight={"500"} fontSize={"14px"} color={"brand.100"}>
            Your transactions for {selectedRange}
          </Text>
        </Box>

        <Flex>
          <Button
            onClick={onOpen}
            borderRadius={"100px"}
            padding={"12px 20px 12px 30px"}
            height={"48px"}
            minWidth={"107px"}
            bg={"#EFF1F6"}
            display={"flex"}
            alignItems={"center"}
            mr={"12px"}
          >
            <Text
              mr={"4px"}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"brand.300"}
              display={"flex"}
            >
              Filter
              {activeFiltersCount > 0 && (
                <Badge
                  p={"4px 6.5px"}
                  ml="4px"
                  w={"20px"}
                  height={"20px"}
                  bg={"brand.300"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"#fff"}
                  fontSize={"12px"}
                  borderRadius={"100px"}
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Text>
            <Image alt="dowload" src={expandMoreIcon} />
          </Button>
          <Button
            borderRadius={"100px"}
            padding={"12px 20px 12px 30px"}
            height={"48px"}
            width={"139px"}
            bg={"#EFF1F6"}
            display={["none", "flex"]}
            alignItems={"center"}
          >
            <Text
              mr={"4px"}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"brand.300"}
            >
              Export list
            </Text>

            <Image alt="dowload" src={downloadIcon} />
          </Button>
        </Flex>
      </Flex>

      {/* empty state  */}

      {filtertransactionsData?.length === 0 && (
        <Box w={"369px"} mx="auto" mt={"65px"}>
          <Image src={receiptIcon} alt="receipt" />

          <Text
            mt={"20px"}
            fontSize={"28px"}
            fontWeight={"700"}
            color={"brand.300"}
          >
            No matching transaction found for the selected filter
          </Text>

          <Text
            mt={"10px"}
            fontSize={"16px"}
            fontWeight={"500"}
            color={"brand.100"}
          >
            Change your filters to see more results, or add a new product.
          </Text>

          <Button
            onClick={() => {
              setFilters({
                type: [],
                status: [],
                daysRange: [],
                endDate: "",
                startDate: "",
              });

              setFilterTransactionsData(transactionsData);
            }}
            mt={"32px"}
            p={"12px 24px"}
            fontWeight={"600"}
            fontSize={"16px"}
            bg={"#EFF1F6"}
            color={"brand.300"}
            borderRadius={"100px"}
          >
            Clear Filter
          </Button>
        </Box>
      )}

      {/* list */}

      <UnorderedList margin={0} mt={"33px"} pb={"20px"}>
        {filtertransactionsData?.map((list) => {
          return (
            <ListItem
              display={"flex"}
              mb={"24px"}
              w={"100%"}
              justifyContent={"space-between"}
              key={uuidv4()}
            >
              <Box
                display={"flex"}
                alignItems="center" // Adjust alignment as needed
              >
                {list.type === "deposit" ? (
                  <Image src={depositIcon} alt="deposit" />
                ) : list.type === "withdrawal" ? (
                  <Image src={withdrawalIcon} alt="withdrawal" />
                ) : (
                  <Image src={depositIcon} alt="deposit" />
                )}
                <Box ml={"14.5"}>
                  <Text
                    isTruncated
                    w={["106px", "100%"]}
                    color={"brand.300"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                    mb={"9px"}
                  >
                    {list.metadata?.product_name
                      ? list.metadata.product_name
                      : list.type === "withdrawal"
                      ? "Cash withdrawal"
                      : list.metadata?.type === "coffee"
                      ? "Buy me a coffee"
                      : list.type === "tipped"
                      ? "You were tipped"
                      : null}
                  </Text>

                  <Text
                    style={{
                      color: list.metadata?.name
                        ? "brand.100"
                        : list.type === "withdrawal" &&
                          list.status === "successful"
                        ? "#0EA163"
                        : list.type === "withdrawal" &&
                          list.status === "pending"
                        ? "#A77A07"
                        : list.status === "successful"
                        ? "#0EA163"
                        : "brand.100",
                    }}
                    fontSize={"14px"}
                    fontWeight={"500"}
                  >
                    {list.metadata?.name
                      ? list.metadata?.name
                      : list.type === "withdrawal"
                      ? list.status
                      : list.status}
                  </Text>
                </Box>
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-end"}
                justifyContent={"space-between"} // Adjust for spacing between inner elements
              >
                <Text fontWeight={"700"} fontSize={"16px"} color={"brand.300"}>
                  USD {list.amount}
                </Text>

                <Text color={"brand.300"} fontSize={"14px"} fontWeight={"500"}>
                  {new Date(list.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </Box>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
}
