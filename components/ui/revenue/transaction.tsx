import { downloadIcon, expandMoreIcon } from "@/assets";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import TransactionList from "./transaction-list";
import { blurInVariant } from "@/variant";
import { motion } from "framer-motion";

export default function Transaction() {
  return (
    <Box
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={blurInVariant}
    >
      {/* transaction list */}

      <TransactionList />
    </Box>
  );
}
