"use client";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  LogoIcon,
  analyticsIcon,
  appsIcon,
  chatIcon,
  crmIcon,
  homeIcon,
  menuIcon,
  notificationIcon,
  revenueIcon,
} from "@/assets";

import { v4 as uuidv4 } from 'uuid';

import { ListItem, UnorderedList } from "@chakra-ui/react";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderAvatar from "./avatar";
import UserDropDown from "./userdropdown";
import { dropVariant } from "@/variant";
import API from "@/services/apiService";

const links: LinksInterface[] = [
  {
    name: "home",
    iconPath: homeIcon,
    path: "/",
  },

  {
    name: "Analytics",
    iconPath: analyticsIcon,
    path: "/",
  },

  {
    name: "Revenue",
    iconPath: revenueIcon,
    path: "/revenue",
  },
  {
    name: "CRM",
    iconPath: crmIcon,
    path: "/",
  },

  {
    name: "apps",
    iconPath: appsIcon,
    path: "/",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataInterface | null>(null);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await API.getUserData();

        setUserData(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchuser();
  }, []);

  return (
    <Box
      bg={"#fff"}
      as={motion.div}
      p={"14px 24px"}
      borderWidth={"2px"}
      borderColor={"#FFFFFF"}
      borderRadius={"100px"}
      boxShadow={"xs"}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropVariant}
      // height={"64px"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignContent={"center"}
    >
      <Box>
        <Image src={LogoIcon} alt="logo" />
      </Box>

      <Box display={"flex"}>
        <UnorderedList display={['none' , 'flex']}>
          {links.map((link) => {
            return (
              <Link color="" key={uuidv4()} href={link.path}>
                <ListItem
                  className={
                    pathname === link.path
                      ? "active-class-name"
                      : "non-active-class-name"
                  }
                  _hover={{
                    background: "#EFF1F6",
                  }}
                  borderRadius={"100px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyItems={"center"}
                  color={"brand.100"}
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  fontSize={"16px"}
                  mr={"20px"}
                  p={"8px 14px 8px 18px"}
                >
                  <Box>
                    <Image src={link.iconPath} alt={link.name} />
                  </Box>

                  <Text ml={"4px"}>{link.name}</Text>
                </ListItem>
              </Link>
            );
          })}
        </UnorderedList>
      </Box>

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box p={"10px"} cursor={"pointer"}>
            <Image src={notificationIcon} alt="chaticon" />
          </Box>

          <Box cursor={"pointer"} p={"10px"}>
            <Image src={chatIcon} alt="chaticon" />
          </Box>
        </Flex>

        <UserDropDown data={userData} />
      </Flex>
    </Box>
  );
}
