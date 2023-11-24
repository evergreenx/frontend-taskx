import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function WalletCard({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  return (
    <Box
    mb={'32px'}
    >
      <Text color={"#56616B"} fontSize={"14px"} fontWeight={"500"}>
        {title}
      </Text>

      <Text fontWeight={"bold"} color={"#131316"} fontSize={"36px"}>
        USD { amount.toFixed(2)}
      </Text>
    </Box>
  );
}
