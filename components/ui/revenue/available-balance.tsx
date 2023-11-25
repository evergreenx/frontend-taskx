import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import Chart from "./chart";

export default function AvailableBalance({
  balance,
}: {
  balance: number | undefined;
}) {
  return balance ? (
    <Box>
      <Box display={"flex"} alignItems={"center"} mb={["32px", "0px"]}>
        <Box>
          <Text color={"#56616B"} fontSize={"14px"} fontWeight={"500"}>
            Available Balance
          </Text>

          <Text
            fontWeight={"bold"}
            mt={"8px"}
            color={"#131316"}
            fontSize={["24px", "36px"]}
          >
            USD {balance ? balance : null}
          </Text>
        </Box>

        <Button
          w={["167px"]}
          h={["100%", "52px"]}
          ml={"64px"}
          p={"14px 28px"}
          borderRadius={"100px"}
          fontSize={"16px"}
          fontWeight={"600"}
          color={"#fff"}
          bg={"#131316"}
        >
          Withdraw
        </Button>
      </Box>

      <Chart />
    </Box>
  ) : null;
}
