"use client";
import React, { useEffect, useState } from "react";
import AvailableBalance from "./available-balance";
import RevenueInfo from "./revenue-info";
import API from "@/services/apiService";
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { blurInVariant } from "@/variant";
import Transaction from "./transaction";
import { Text } from "@chakra-ui/react";

export default function RevenueContainer() {
  const [isLoadingWalletData, setIsLoadingWalletData] = useState<boolean>(true);
  const [isLoadingTransaction, setIsLoadingTransaction] =
    useState<boolean>(true);

  const [transactionsData, setTransactionsData] = useState<
    TransactioniInterface[] | undefined
  >();
  const [walletDetails, setWalletDetails] = useState<
    WalletDetailsInterface | undefined
  >(undefined);

  const [filtertransactionsData, setFilterTransactionsData] =
    useState(transactionsData);
  // fetch wallet details

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const response = await API.getWalletDetails();

        setWalletDetails(response);
      } catch (error) {
      } finally {
        setIsLoadingWalletData(false);
      }
    };

    fetchWalletDetails();
  }, []);

  useEffect(() => {
    if (transactionsData) {
      setFilterTransactionsData(transactionsData);
    }
  }, [transactionsData]);

  // fetch transaction

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.getTransactionlList();

        setTransactionsData(response);
      } catch (error) {
      } finally {
        setIsLoadingTransaction(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      {isLoadingWalletData ? (
        <Text>
loading wallets data

        </Text>
      ) : (
        <Flex
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={blurInVariant}
          flexDirection={["column", "row"]}
          justifyContent={"space-between"}
        >
          <AvailableBalance
            data={filtertransactionsData}
            balance={walletDetails?.balance}
          />

          <RevenueInfo data={walletDetails} />
        </Flex>
      )}

      {isLoadingWalletData ? (

        <Text>

loading your transaction

        </Text>
      ) : (
        <Transaction
          setFilterTransactionsData={setFilterTransactionsData}
          filtertransactionsData={filtertransactionsData}
          transactionsData={transactionsData}
        />
      )}
    </>
  );
}
