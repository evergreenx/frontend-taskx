import { Box } from "@chakra-ui/react";
import React from "react";
import WalletCard from "./wallet-card";

export default function RevenueInfo({
  data,
}: {
  data: WalletDetailsInterface | undefined;
}) {
  return (
    <Box>
      {data ? (
        <Box>
          {/* ledger balance */}
          <WalletCard
            title="Ledger Balance"
            amount={data.ledger_balance}
          />
          {/* total payout */}
          <WalletCard title="Total Payout" amount={data.total_payout} />
          {/* total revenue */}
          <WalletCard title="Total Revenue" amount={data.total_revenue} />
          {/* pending payout */}
          <WalletCard title="Pending Payout" amount={data.pending_payout} />
        </Box>
      ) : null}
    </Box>
  );
}
