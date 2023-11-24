interface UserDataInterface {
  first_name: string;
  last_name: string;
  email: string;
}

interface LinksInterface {
  name: string;
  iconPath: string;
  path: string;
}

interface WalletDetailsInterface {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

declare global {
  UserDataInterface, LinksInterface;
}
