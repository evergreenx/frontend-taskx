"use client";
import {
  invoicingIcon,
  linkinbioIcon,
  mediakitIcon,
  storeIcon,
} from "@/assets";
import { Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const sidenavLinks = [
  {
    url: linkinbioIcon,
    desc: "Link in Bio",
  },
  {
    url: storeIcon,
    desc: "Store",
  },
  {
    url: mediakitIcon,
    desc: "Media Kit",
  },

  {
    url: invoicingIcon,
    desc: "Invoicing",
  },
];

export default function SideNav() {
  return (
    <Box
      bg={"#fff"}
      w={"48px"}
      h={"192px"}
      p={"4px"}
      borderRadius={"100px"}
      boxShadow={
        "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)"
      }
      position={"fixed"}
      top={"19.375rem"}
    >
      <Box>
        {sidenavLinks.map((sidenavLink) => {
          return (
            <Tooltip
              borderRadius={"12px"}
              padding={"16px"}
              fontWeight={"500"}
              fontSize={"13px"}
              bg="brand.300"
              color="#fff"
              _focusVisible={{
                border: "none",
              }}
              hasArrow
              label={sidenavLink.desc}
              placement="right-end"
              key={uuidv4()}
              box-shadow="rgba(188, 196, 204, 0.12) 0px 8px 16px 4px"
            >
              <Box
                filter="grayscale(1)"
                borderRadius={"100px"}
                cursor={"pointer"}
                _hover={{
                  filter: "none",
                  background: "#EFF1F6",
                  
                }}
                p={"8px"}
                mb={"8px"}
              >
                <Image src={sidenavLink.url} alt={sidenavLink.url} />
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
