import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { infoIcon } from "@/assets";
import Image from "next/image";
import { Tooltip } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
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
        <Text color={"#56616B"} fontSize={"14px"} fontWeight={"500"}>
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
            bg="#131316"
            color="#fff"
            _focusVisible={{
              border: "none",
            }}
          >
            <PopoverArrow bg="#131316" />
            {label}
          </PopoverContent>
        </Popover>
      </Flex>

      <Text fontWeight={"bold"} color={"#131316"} fontSize={["24px", "36px"]}>
        USD {amount.toFixed(2)}
      </Text>
    </Box>
  );
}
