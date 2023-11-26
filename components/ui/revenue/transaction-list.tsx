import {
  expandMoreIcon,
  downloadIcon,
  depositIcon,
  withdrawalIcon,
} from "@/assets";
import API from "@/services/apiService";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

import Image from "next/image";
import FilterModal from "./filter/filter-drawer";

export default function TransactionList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactionsData, setTransactionsData] = useState<
    TransactioniInterface[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.getTransactionlList();

        setTransactionsData(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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

  if (isLoading) {
    return "loading transaction";
  }

  return (
    <Box>
      {/* filter drawer */}
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
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
            {transactionsData?.length}{" "}
            {transactionsData?.length !== 1 ? "Transactions" : "Transaction"}
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

      {/* list */}

      <UnorderedList margin={0} mt={"33px"}>
        {transactionsData?.map((list) => {
          return (
            <ListItem
              display={"flex"}
              mb={"24px"}
              justifyContent={"space-between"}
              key={list.metadata?.name}
            >
              <Flex>
                {/* render depositIcon if type of transaction is deposit , if type is withdrawal render withdrawal icon  */}

                {list.type === "deposit" ? (
                  <Image src={depositIcon} alt="deposit" />
                ) : list.type === "withdrawal" ? (
                  <Image src={withdrawalIcon} alt="withdrawal" />
                ) : null}
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
                      : list.metadata?.type === "coffee" &&
                        list.status === "successful"
                      ? "Buy me a coffee"
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
                        : "#56616B",
                    }}
                    fontSize={"14px"}
                    fontWeight={"500"}
                  >
                    {list.metadata?.name
                      ? list.metadata?.name
                      : list.type === "withdrawal"
                      ? list.status
                      : null}
                  </Text>
                </Box>
              </Flex>

              <Box alignSelf={"self-end"}>
                <Text fontWeight={"700"} fontSize={"16px"} color={"#131316"}>
                  {" "}
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
