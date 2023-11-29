import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  background,
  Text,
  Box,
} from "@chakra-ui/react";

import { v4 as uuidv4 } from 'uuid';

import Image from "next/image";

import HeaderAvatar from "./avatar";
import {
  integrationsIcon,
  menuIcon,
  purchaseIcon,
  referIcon,
  reportBugIcon,
  settingIcon,
  signoutIcon,
  switchIcon,
} from "@/assets";

interface menuOptionsInterface {
  name: string;
  icon: string;
}
const menuOptions = [
  {
    name: "Settings",
    icon: settingIcon,
  },

  {
    name: "Purchase History",
    icon: purchaseIcon,
  },
  {
    name: "Refer and Earn",
    icon: referIcon,
  },

  {
    name: "integrations",
    icon: integrationsIcon,
  },

  {
    name: "Report Bug",
    icon: reportBugIcon,
  },

  {
    name: "Switch Account",
    icon: switchIcon,
  },

  {
    name: "Sign Out",
    icon: signoutIcon,
  },
];

export default function userdropdown({
  data,
}: {
  data: UserDataInterface | null;
}) {
  return (
    <Menu>
      <MenuButton
        bg={"transparent"}
        _hover={{
          background: "none",
        }}
        _active={{
          background: "none",
        }}
        as={Button}
        p={0}
      >
        <Flex
          h={"40px"}
          p={"4px 12px 4px 5px"}
          borderRadius={"100px"}
          bg={"#EFF1F6"}
        >
          <HeaderAvatar />

          <Image src={menuIcon} alt="chaticon" />
        </Flex>
      </MenuButton>
      <MenuList
        borderWidth={"none"}
        boxShadow={
          "0px 12px 24px 6px rgba(129, 139, 165, 0.08), 0px 16px 32px 12px rgba(219, 222, 229, 0.08)"
        }
        backdropBlur={"800px"}
        position={"relative"}
        top={"15px"}
        borderRadius={"20px"}
        width={"370px"}
        p={"4px"}
      >
        {data ? (
          <Flex padding={"24px 16px 14px 16px"} alignItems={"center"}>
            <Box
              mr={"12px"}
              p={"12px 8px"}
              bgGradient="linear(, #5C6670, #131316)"
              w={"40px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"16x"}
              h={"40px"}
              borderRadius={"100px"}
            >
              <Text
                bgClip="text"
                fontWeight={"600"}
                bgGradient="linear(to-l, #FFF , #F2F3F5 )"
              >
                OJ
              </Text>
            </Box>

            <Box>
              <Text fontSize={"24px"} fontWeight={600}>
                {data?.first_name + " " + data?.last_name}
              </Text>

              <Text fontSize={"14px"} fontWeight={500}>
                {data.email}
              </Text>
            </Box>
          </Flex>
        ) : null}

        {menuOptions.map((menuOption: menuOptionsInterface) => {
          return (
            <MenuItem
              padding={"14px 0px 14px 14px"}
              mb={"10px"}
              key={uuidv4()}
              _hover={{
                background: "none",
              }}
              _focus={{
                background: "none",
              }}
              _active={{
                background: "none",
              }}
            >
              <Flex>
                <Image src={menuOption.icon} alt={menuIcon.name} />
                <Text
                  fontWeight={"600"}
                  color={"brand.300"}
                  ml={"12px"}
                  fontSize={"16px"}
                >
                  {menuOption.name}
                </Text>
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
