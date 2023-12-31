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
            label="Represents the current balance as per the ledger records"
          />
          {/* total payout */}
          <WalletCard
          label="Shows the total payout made from the wallet"
          title="Total Payout" amount={data.total_payout} />
          {/* total revenue */}
          <WalletCard 
          label="Presents the overall revenue generated by the wallet"
          title="Total Revenue" amount={data.total_revenue} />
          {/* pending payout */}
          <WalletCard
          label="Indicates any pending payout to be received in the wallet"
          title="Pending Payout" amount={data.pending_payout} />
        </Box>
      ) : null}
    </Box>
  );
}
