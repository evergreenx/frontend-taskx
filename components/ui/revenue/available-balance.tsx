import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function AvailableBalance({
  balance,
}: {
  balance: number | undefined;
}) {
  return (
    <Box
    mb={['32px' , '0px']}
    >
      <Text color={"#56616B"} fontSize={"14px"} fontWeight={"500"}>
        Available Balance
      </Text>

      <Text fontWeight={"bold"} color={"#131316"} fontSize={"36px"}>
        USD {balance ? balance : "No balance "}
      </Text>
    </Box>
  );
}
