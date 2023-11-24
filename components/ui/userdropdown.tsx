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
} from "@chakra-ui/react";

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

export default function userdropdown() {
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
        position={'relative'}
        top={'10px'}
        borderRadius={"20px"}
        width={"370px"}
        p={"4px"}
      >
        {menuOptions.map((menuOption: menuOptionsInterface) => {
          return (
            <MenuItem
              padding={"14px 0px 14px 14px"}
              mb={"10px"}
              key={menuIcon.name}
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
                <Text color={"#131316"} ml={"12px"} fontSize={"16px"}>
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
