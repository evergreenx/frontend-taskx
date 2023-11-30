import React from "react";
import { Box, Wrap, WrapItem, Text } from "@chakra-ui/react";

export default function HeaderAvatar({ name }: {name: string}) {
  return (
    <Wrap mr={"8px"}>
      <WrapItem>
        <Box
          p={"12px 8px"}
          bgGradient="linear(, #5C6670, #131316)"
          w={"32px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"14px"}
          h={"32px"}
          borderRadius={"100px"}
        >
          <Text
            bgClip="text"
            fontWeight={"600"}
            bgGradient="linear(to-l, #FFF , #F2F3F5 )"
          >
            {(name)}
          </Text>
        </Box>
      </WrapItem>
    </Wrap>
  );
}
