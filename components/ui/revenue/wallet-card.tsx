import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { infoIcon } from "@/assets";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,

  PopoverArrow,

} from "@chakra-ui/react";

export default function WalletCard({
  title,
  amount,
  label,
}: {
  title: string;
  amount: number;
  label: string;
}) {
  return (
    <Box w={["100%", "271px"]} mb={"32px"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text color={"brand.100"} fontSize={"14px"} fontWeight={"500"}>
          {title}
        </Text>

        <Popover>
          <PopoverTrigger>
            <Image src={infoIcon} alt="info" />
          </PopoverTrigger>

          <PopoverContent
            borderRadius={"12px"}
            padding={"16px"}
            fontWeight={"500"}
            fontSize={"13px"}
            bg="brand.300"
            color="#fff"
            _focusVisible={{
              border: "none",
            }}
          >
            <PopoverArrow bg="brand.300" />
            {label}
          </PopoverContent>
        </Popover>
      </Flex>

      <Text fontWeight={"bold"} color={"brand.300"} fontSize={["24px", "36px"]}>
        USD {amount.toFixed(2)}
      </Text>
    </Box>
  );
}
