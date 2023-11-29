import { Box, Button, Text, background } from "@chakra-ui/react";
import React from "react";
import Chart from "./chart";

export default function AvailableBalance({
  balance,
  data
}: {
  balance: number | undefined;
  data : any
}) {
  return balance ? (
    <Box>
      <Box display={"flex"} alignItems={"center"} mb={["32px", "0px"]}>
        <Box>
          <Text color={"brand.100"} fontSize={"14px"} fontWeight={"500"}>
            Available Balance
          </Text>

          <Text
            fontWeight={"bold"}
            mt={"8px"}
            color={"brand.300"}
            fontSize={["24px", "36px"]}
          >
            USD {balance ? balance : null}
          </Text>
        </Box>

        <Button
          w={["167px"]}
          h={["100%", "52px"]}
          _hover={{ background: "brand.300" }}
          ml={"64px"}
          p={"14px 28px"}
          borderRadius={"100px"}
          fontSize={"16px"}
          fontWeight={"600"}
          color={"#fff"}
          bg={"brand.300"}
        >
          Withdraw
        </Button>
      </Box>

      <Chart data={data} />
    </Box>
  ) : null;
}
