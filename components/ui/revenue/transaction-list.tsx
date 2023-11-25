import {
  expandMoreIcon,
  downloadIcon,
  depositIcon,
  withdrawalIcon,
} from "@/assets";
import API from "@/services/apiService";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import Image from "next/image";

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

  if (isLoading) {
    return "loading transaction";
  }

  return (
    <Box>
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
            borderRadius={"100px"}
            padding={"12px 20px 12px 30px"}
            height={"48px"}
            width={"107px"}
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
            >
              Filter
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
                      ? "Cash withdrawal" : list.metadata?.type === 'coffee' && list.status === 'successful' ? 'Buy me a coffee'
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

              <Box
              alignSelf={'self-end'}
      
              >
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
