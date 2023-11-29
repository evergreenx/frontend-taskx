"use client";
import { Box, Button } from "@chakra-ui/react";

import { redirect } from 'next/navigation'

export default function Home() {

  if (true) {
    redirect('/revenue')
  }
  return (
    <Box>
     
    </Box>
  );
}
