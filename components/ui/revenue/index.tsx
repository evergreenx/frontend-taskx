"use client";
import React, { useEffect, useState } from "react";
import AvailableBalance from "./available-balance";
import RevenueInfo from "./revenue-info";
import API from "@/services/apiService";
import { Flex } from "@chakra-ui/react";

export default function RevenueContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [walletDetails, setWalletDetails] =
    useState<WalletDetailsInterface | undefined>(undefined);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const response = await API.getWalletDetails();

        setWalletDetails(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletDetails();
  }, []);

  if (isLoading) {
    return "loading";
  }

  return (
    <Flex
 flexDirection={['column' , 'row']}
    justifyContent={'space-between'}>
      <AvailableBalance balance={walletDetails?.balance} />

      <RevenueInfo data={walletDetails} />
    </Flex>
  );
}
