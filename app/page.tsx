'use client'
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  if (true) {
    return router.push("/revenue");
  }
  return <Box></Box>;
}
