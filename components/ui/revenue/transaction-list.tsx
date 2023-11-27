import {
  expandMoreIcon,
  downloadIcon,
  depositIcon,
  withdrawalIcon,
  receiptIcon,
} from "@/assets";
import API from "@/services/apiService";
import {
  Box,
  Button,
  Flex,
  Text,
  filter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

import Image from "next/image";
import FilterModal from "./filter/filter-drawer";
import { transactionDatax } from "./chart";

export default function TransactionList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactionsData, setTransactionsData] = useState<
    TransactioniInterface[] | undefined
  >(transactionDatax);

  const [filtertransactionsData, setFilterTransactionsData] =
    useState(transactionsData);

  useEffect(() => {
    if (transactionsData) {
      setFilterTransactionsData(transactionsData);
    }
  }, [transactionsData]);

  console.log(filtertransactionsData);

  console.log(transactionsData);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const response = await API.getTransactionlList();

  //       setTransactionsData(response);
  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTransactions();
  // }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState<FilterValuesInterface>({
    type: [],
    status: [],
    daysRange: [],
  });

  // active choosen filters
  const activeFiltersCount = Object.values(filters).reduce(
    (count, filter) => count + (filter.length > 0 ? 1 : null),
    0
  );

  //

  const filterTransactions = (
    transactions: TransactioniInterface[] | undefined,
    filters: FilterValuesInterface
  ): TransactioniInterface[] | undefined => {
    if (!transactions) return undefined;

    // Extract 'type' array from filters
    const typesToFilter = filters.type.map((typeObj) =>
      typeObj.type.toLowerCase()
    );

    console.log(typesToFilter);
    // Filter transactions based on the extracted 'type' array
    return transactions.filter((transaction) => {
      const lowerCaseType = transaction.type.toLowerCase();

      // Check if the transaction's type matches any value from the 'typesToFilter' array
      const typeFilterMatch = typesToFilter.includes(lowerCaseType);

      return typeFilterMatch;
    });
  };

  // const searchBy = (arr = [], searchKeys = [], value = '') => {
  //   return arr.filter(item =>
  //     searchKeys.length ? searchKeys.some(key =>
  //       (item[key] || "").toLowerCase().includes(value.toLowerCase())
  //     ) : true
  //   );
  // };

  // console.log(searchBy(filtertransactionsData, ["type"], "tipped"));

  // console.log(d , 'result')

  const handleApplyFilter = () => {
    const filteredTransactions = filterTransactions(
      filtertransactionsData,
      filters
    );

    setFilterTransactionsData(filteredTransactions);

    console.log(filteredTransactions);
    onClose();
  };

  // if (isLoading) {
  //   return "loading transaction";
  // }

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
      />

      <Flex
        borderBottomWidth={"1px"}
        pb={"24px"}
        borderColor={"#EFF1F6"}
        justifyContent={"space-between"}
        mt={"96px"}
      >
        <Box>
          <Text fontWeight={700} fontSize={"24px"} color={"#131316"}>
            {filtertransactionsData?.length}{" "}
            {filtertransactionsData?.length !== 1
              ? "Transactions"
              : "Transaction"}
          </Text>
          <Text fontWeight={"500"} fontSize={"14px"} color={"#56616B"}>
            Your transactions for the last 7 days
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
              color={"#131316"}
              display={"flex"}
            >
              Filter
              {activeFiltersCount > 0 && (
                <Badge
                  p={"4px 6.5px"}
                  ml="4px"
                  w={"20px"}
                  height={"20px"}
                  bg={"#131316"}
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
              color={"#131316"}
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
            color={"#131316"}
          >
            No matching transaction found for the selected filter
          </Text>

          <Text
            mt={"10px"}
            fontSize={"16px"}
            fontWeight={"500"}
            color={"#56616B"}
          >
            Change your filters to see more results, or add a new product.
          </Text>

          <Button
            onClick={() => {
              setFilters({
                type: [],
                status: [],
                daysRange: [],
              });

              setFilterTransactionsData(transactionsData);
            }}
            mt={"32px"}
            p={"12px 24px"}
            fontWeight={"600"}
            fontSize={"16px"}
            bg={"#EFF1F6"}
            color={"#131316"}
            borderRadius={"100px"}
          >
            Clear Filter
          </Button>
        </Box>
      )}

      {/* list */}

      <UnorderedList margin={0} mt={"33px"} pb={'20px'}>
        {filtertransactionsData?.map((list) => {
          return (
            <ListItem
              display={"flex"}
              mb={"24px"}
              w={"100%"}
              justifyContent={"space-between"}
              key={list.metadata?.name}
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
                    color={"#131316"}
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
                        ? "#56616B"
                        : list.type === "withdrawal" &&
                          list.status === "successful"
                        ? "#0EA163"
                        : list.type === "withdrawal" &&
                          list.status === "pending"
                        ? "#A77A07"
                        : list.status === "successful"
                        ? "#0EA163"
                        : "#56616B",
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
                <Text fontWeight={"700"} fontSize={"16px"} color={"#131316"}>
                  USD {list.amount}
                </Text>

                <Text color={"#131316"} fontSize={"14px"} fontWeight={"500"}>
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
