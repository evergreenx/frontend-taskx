"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  LogoIcon,
  analyticsIcon,
  appsIcon,
  appwhiteIcon,
  bookinglg,
  chatIcon,
  crmIcon,
  homeIcon,
  invoicingIconlg,
  linkinbioIconlg,
  mediakitIconlg,
  menuIcon,
  notificationIcon,
  revenueIcon,
  storeIconlg,
} from "@/assets";

import { v4 as uuidv4 } from "uuid";

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
    path: "/Analytics",
  },

  {
    name: "Revenue",
    iconPath: revenueIcon,
    path: "/revenue",
  },
  {
    name: "CRM",
    iconPath: crmIcon,
    path: "/CRM",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataInterface | null>(null);

  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  console.log(pathname);

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
        <UnorderedList display={["none", "flex"]}>
          {links.map((link) => {
            return (
              <>
                <Link color="" key={uuidv4()} href={link.path}>
                  <ListItem
                    className={
                      pathname === link.path
                        ? "active-class-name"
                        : "non-active-class-name"
                    }
                    _hover={{
                      background:
                        pathname === link.path ? "#131316" : "#EFF1F6",
                    }}
                    borderRadius={"100px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyItems={"center"}
                    color={pathname === link.path ? "#fff" : "brand.100"}
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

                {/* show apps */}
              </>
            );
          })}
        </UnorderedList>

        <Menu>
          <MenuButton
            as={Box}
            p={0}
            m={0}
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
            _hover={{
              background: "#EFF1F6",
            }}
            borderRadius={"100px"}
            _active={{
              background: selectedApp ? "brand.300" : "#EFF1F6",
            }}
            // bg={"red"}
          >
            <Flex
              borderRadius={"100px"}
              display={"flex"}
              color={selectedApp ? "#fff" : "brand.100"}
              textTransform={"capitalize"}
              fontWeight={"600"}
              fontSize={"16px"}
              w={"100%"}
              // mr={"20px"}

              bg={selectedApp ? "brand.300" : "transparent"}
            >
              <Flex alignItems={"center"} p={"8px 14px"}>
                <Box mr={"4px"}>
                  {selectedApp ? (
                    <Image src={appwhiteIcon} alt={"app"} />
                  ) : (
                    <Image src={appsIcon} alt={"app"} />
                  )}
                </Box>

                <Text>Apps</Text>
              </Flex>

              {selectedApp && (
                <Flex
                  borderLeft={"1px solid #262628"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  p={"8px 14px"}
                >
                  <Text mr={"4px"}>{selectedApp}</Text>

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_4407_31561"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#C4C4C4" />
                    </mask>
                    <g mask="url(#mask0_4407_31561)">
                      <path
                        d="M9.99966 13.0211C9.87914 13.0211 9.76697 13.0019 9.66314 12.9634C9.55929 12.925 9.46057 12.8589 9.36699 12.7653L4.87276 8.27112C4.73429 8.13267 4.66346 7.95864 4.66026 7.74902C4.65704 7.53941 4.72788 7.36217 4.87276 7.2173C5.01763 7.07243 5.19326 7 5.39966 7C5.60606 7 5.78169 7.07243 5.92656 7.2173L9.99966 11.2904L14.0728 7.2173C14.2112 7.07885 14.3852 7.00802 14.5949 7.0048C14.8045 7.0016 14.9817 7.07243 15.1266 7.2173C15.2714 7.36217 15.3439 7.53781 15.3439 7.74422C15.3439 7.95062 15.2714 8.12626 15.1266 8.27112L10.6323 12.7653C10.5388 12.8589 10.44 12.925 10.3362 12.9634C10.2324 13.0019 10.1202 13.0211 9.99966 13.0211Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </Flex>
              )}
            </Flex>
          </MenuButton>

          <MenuList
            w={["100%", "400px"]}
            position={"relative"}
            top={"15px"}
            borderRadius={"1.25rem"}
            border={" 0.125rem solid #fff"}
            boxShadow="rgba(219, 222, 229, 0.08) 0px 16px 32px 12px, rgba(129, 139, 165, 0.08) 0px 12px 24px 6px"
            // backdropFilter={'blur(8px)'}
            backdropBlur="8px"
            role="group"
            p={"8px"}
          >
            <AppNavigation setSelectedApp={setSelectedApp} />
          </MenuList>
        </Menu>
      </Box>

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Box
          display={["none", "flex"]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box p={"10px"} cursor={"pointer"}>
            <Image src={notificationIcon} alt="chaticon" />
          </Box>

          <Box cursor={"pointer"} p={"10px"}>
            <Image src={chatIcon} alt="chaticon" />
          </Box>
        </Box>

        <UserDropDown data={userData} />
      </Flex>
    </Box>
  );
}

const menuOptions = [
  {
    title: "Link in Bio",
    icon: linkinbioIconlg,
    subtitle: "Manage your Link in Bio",
  },

  {
    title: "Store",
    icon: storeIconlg,
    subtitle: "Manage your Store activities",
  },
  {
    title: "Media Kit",
    icon: mediakitIconlg,
    subtitle: "Manage your Store activities",
  },

  {
    title: "Invoice",
    icon: invoicingIconlg,
    subtitle: "Manage your Invoices",
  },

  {
    title: "Bookings",
    icon: bookinglg,
    subtitle: "Manage your Bookings",
  },
];

const AppNavigation = ({
  setSelectedApp,
}: {
  setSelectedApp: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <>
      {menuOptions.map((menuOption, indx) => {
        return (
          <MenuItem
            padding={"16px"}
            role="group"
            onClick={() => {
              setSelectedApp(menuOption.title);
            }}
            mb={"8px"}
            onMouseEnter={() => setHoveredIndex(indx)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={indx}
            _hover={{
              background: "none",
              transition: "background-color 0.3s ease",
              borderRadius: "16px",

              boxShadow: "rgba(188, 196, 204, 0.12) 0px 12px 24px 8px",
              border: "2px solid rgb(239, 241, 246)",
            }}
            _focus={{
              background: "none",
            }}
            _active={{
              background: "none",
            }}
          >
            <Flex
              w="100%"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"12px"}
                  border={"1px solid #EFF1F6"}
                  boxShadow={" 0px 12px 24px 8px rgba(188, 196, 204, 0.12)"}
                  h={"3rem"}
                  w={"3rem"}
                >
                  <Image src={menuOption.icon} alt={menuIcon.name} />
                </Box>

                <Box ml={"12px"}>
                  <Text
                    fontWeight={"600"}
                    color={"brand.300"}
                    fontSize={"16px"}
                  >
                    {menuOption.title}
                  </Text>

                  <Text
                    fontWeight={"500"}
                    color={"brand.100"}
                    fontSize={"14px"}
                  >
                    {menuOption.subtitle}
                  </Text>
                </Box>
              </Flex>

              {hoveredIndex === indx && (
                <Box>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_4407_40223"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_4407_40223)">
                      <path
                        d="M9.05 16.95C8.93333 16.85 8.875 16.7333 8.875 16.6C8.875 16.4667 8.93333 16.35 9.05 16.25L13.3 12L9.05 7.75C8.93333 7.65 8.875 7.53333 8.875 7.4C8.875 7.26667 8.93333 7.15 9.05 7.05C9.15 6.93333 9.26667 6.875 9.4 6.875C9.53333 6.875 9.65 6.93333 9.75 7.05L14.15 11.425C14.2333 11.525 14.2917 11.6207 14.325 11.712C14.3583 11.804 14.375 11.9 14.375 12C14.375 12.1 14.3583 12.1957 14.325 12.287C14.2917 12.379 14.2333 12.475 14.15 12.575L9.75 16.95C9.65 17.0667 9.53333 17.125 9.4 17.125C9.26667 17.125 9.15 17.0667 9.05 16.95Z"
                        fill="#131316"
                      />
                    </g>
                  </svg>
                </Box>
              )}
            </Flex>
          </MenuItem>
        );
      })}
    </>
  );
};
